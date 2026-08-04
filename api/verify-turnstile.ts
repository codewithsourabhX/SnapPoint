export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { token } = req.body || {};
    if (!token) {
      return res.status(400).json({ success: false, error: 'Missing turnstile token' });
    }

    const clientIpRaw = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket?.remoteAddress || '';
    const clientIp = Array.isArray(clientIpRaw)
      ? clientIpRaw[0]
      : String(clientIpRaw).split(',')[0].trim();

    const secret = process.env.TURNSTILE_SECRET;
    if (!secret) {
      console.error('[Turnstile] Missing TURNSTILE_SECRET environment variable');
      return res.status(500).json({ success: false, error: 'Server misconfiguration: missing TURNSTILE_SECRET' });
    }

    const siteverifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret,
        response: String(token),
        remoteip: clientIp,
      }),
    });

    if (!siteverifyRes.ok) {
      console.error(`[Turnstile] siteverify returned HTTP ${siteverifyRes.status}`);
      return res.status(403).json({ success: false, error: `siteverify failed with status ${siteverifyRes.status}` });
    }

    const result = await siteverifyRes.json();

    if (!result.success) {
      console.warn('[Turnstile] Verification failed:', result['error-codes']);
      return res.status(403).json({
        success: false,
        error: 'Bot verification failed',
        'error-codes': result['error-codes'] || []
      });
    }

    return res.status(200).json({ success: true, message: 'Turnstile verification successful' });
  } catch (err: any) {
    console.error('[Turnstile Verification Error]:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal server error' });
  }
}
