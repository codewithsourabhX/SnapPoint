import express from 'express';
import path from 'path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { adminDb } from './api/firebaseAdmin';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CPX Research API proxy endpoint to fetch surveys securely
  app.get('/api/surveys', async (req, res) => {
    try {
      const userId = req.query.userId || req.query.user_id;
      if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter' });
      }

      const appId = '34860';
      const secureHash = process.env.CPX_SECURE_HASH || 'zGofW04jwqEK6SwZP5t9HXvxTCX23nB0';
      
      // Calculate md5 hash: md5(userId + '-' + secureHash)
      const md5Hash = crypto.createHash('md5').update(`${userId}-${secureHash}`).digest('hex').toLowerCase();
      
      const ip = req.query.ip_user || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
      const userAgent = req.headers['user-agent'] || '';

      const url = `https://live-api.cpx-research.com/api/get-surveys.php?app_id=${appId}&ext_user_id=${userId}&output_method=api&ip_user=${ip}&user_agent=${encodeURIComponent(userAgent)}&limit=12&secure_hash=${md5Hash}`;

      const response = await fetch(url);
      const data = await response.json();

      res.status(200).json(data);
    } catch (err: any) {
      console.error('[Get Surveys Error]:', err);
      res.status(500).json({ error: err.message || 'Failed to fetch surveys' });
    }
  });

  // CPX Research Postback Endpoint
  app.all('/api/cpx/postback', async (req, res) => {
    try {
      const params = { ...req.query, ...req.body };

      const status = params.status !== undefined ? Number(params.status) : null;
      const trans_id = params.trans_id || params.transId;
      const user_id = params.user_id || params.userId;
      const subid_1 = params.subid_1 || params.subid1 || '';
      const subid_2 = params.subid_2 || params.subid2 || '';
      const amount_local = params.amount_local || params.amountLocal || '0';
      const amount_usd = params.amount_usd || params.amountUsd || '0';
      const type = params.type || '';
      const hash = params.hash || '';
      const ip_click = params.ip_click || params.ipClick || params.ip || '';
      const secure_hash = params.secure_hash || params.secureHash || '';

      // Validate required parameters
      if (!trans_id || !user_id || status === null || isNaN(status)) {
        return res.status(400).json({
          status: 'error',
          error: 'Missing or invalid required parameters: trans_id, user_id, status'
        });
      }

      // Verify secure hash if secret or secure_hash is configured
      const cpxSecret = process.env.CPX_SECURE_HASH || 'zGofW04jwqEK6SwZP5t9HXvxTCX23nB0' || secure_hash;
      if (cpxSecret) {
        const hashHyphen = crypto.createHash('md5').update(`${trans_id}-${cpxSecret}`).digest('hex').toLowerCase();
        const hashNoHyphen = crypto.createHash('md5').update(`${trans_id}${cpxSecret}`).digest('hex').toLowerCase();
        const receivedHash = String(hash || '').toLowerCase();

        if (!receivedHash || (receivedHash !== hashHyphen && receivedHash !== hashNoHyphen)) {
          console.error(`[CPX Postback] Hash mismatch or missing for transaction ${trans_id}`);
          return res.status(400).json({
            status: 'error',
            error: 'Invalid or missing secure hash'
          });
        }
      }

      // Check for duplicate transaction
      const txRef = adminDb.collection('cpx_transactions').doc(String(trans_id));
      const txSnap = await txRef.get();

      if (txSnap.exists) {
        const existingData = txSnap.data();
        if (existingData && existingData.status === status) {
          return res.status(200).json({
            status: 'success',
            message: 'Transaction already processed',
            trans_id
          });
        }
      }

      // Fetch user profile from Firestore
      const userRef = adminDb.collection('users').doc(String(user_id));
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        return res.status(404).json({
          status: 'error',
          error: `User with ID ${user_id} not found`
        });
      }

      const userData = userSnap.data() || {};
      const currentPoints = Number(userData.points) || 0;
      const currentSurveys = Number(userData.completedSurveysCount) || 0;
      const pointsToChange = Math.round(Number(amount_local) || 0);

      let newPoints = currentPoints;
      let newSurveysCount = currentSurveys;

      if (status === 1) {
        // Credit points
        newPoints = currentPoints + pointsToChange;
        newSurveysCount = currentSurveys + 1;
      } else if (status === 2) {
        // Reverse points
        newPoints = Math.max(0, currentPoints - pointsToChange);
      } else {
        return res.status(400).json({
          status: 'error',
          error: `Unsupported CPX status code: ${status}`
        });
      }

      const newBalanceInRupees = Math.floor(newPoints / 10);

      // Update user points and survey count
      await userRef.update({
        points: newPoints,
        balanceInRupees: newBalanceInRupees,
        completedSurveysCount: newSurveysCount
      });

      // Save transaction record to Firestore
      await txRef.set({
        transId: String(trans_id),
        userId: String(user_id),
        status,
        subid1: String(subid_1),
        subid2: String(subid_2),
        amountLocal: Number(amount_local) || 0,
        amountUsd: Number(amount_usd) || 0,
        type: String(type),
        hash: String(hash),
        ipClick: String(ip_click),
        processedAt: new Date().toISOString()
      });

      return res.status(200).json({
        status: 'success',
        message: 'Postback processed successfully',
        trans_id,
        user_id,
        cpx_status: status,
        credited_points: status === 1 ? pointsToChange : -pointsToChange,
        new_balance: newPoints
      });
    } catch (err: any) {
      console.error('[CPX Postback Error]:', err);
      return res.status(500).json({
        status: 'error',
        error: err.message || 'Internal server error processing CPX postback'
      });
    }
  });

  // TheoremReach Reward Callback Endpoint
  app.all('/api/theoremreach/reward', async (req, res) => {
    // Log every callback
    console.log(`[Express - TheoremReach Callback] Method: ${req.method}, Query: ${JSON.stringify(req.query)}, Body: ${JSON.stringify(req.body)}`);

    try {
      const params = { ...req.query, ...req.body };
      
      const cleanStr = (val: any) => String(val || '').trim();
      
      const user_id = cleanStr(params.user_id || params.userId);
      const value = cleanStr(params.reward || params.value || params.amount);
      const token = cleanStr(params.tx_id || params.txId || params.token || params.transaction_id);
      const signature = cleanStr(params.hash || params.signature || params.sig || params.enc);
      const status = cleanStr(params.status || '1'); // 1 = complete, 2 = reversal/chargeback

      if (!user_id || !value || !token || !signature) {
        console.error(`[Express - TheoremReach Callback] Missing required parameters. user_id: "${user_id}", value: "${value}", token: "${token}", signature: "${signature}"`);
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const secretKey = process.env.THEOREMREACH_SECRET_KEY || 'dfe5ad99f4f82a0665df0ebd9f03f6f8a96ed6a4';

      // Verify signature
      // Template: {secret_key}.{user_id}.{int(value)}.{token}
      const valueInt = Math.floor(parseFloat(value));
      const template = `${secretKey}.${user_id}.${valueInt}.${token}`;
      const calculatedSig = crypto.createHash('md5').update(template).digest('hex');

      if (calculatedSig.toLowerCase() !== signature.toLowerCase()) {
        console.error(`[Express - TheoremReach Callback] Signature mismatch. Calculated: ${calculatedSig}, Received: ${signature}`);
        return res.status(401).json({ error: 'Invalid signature' });
      }

      // Prevent duplicate rewards using transaction ID (token)
      const txRef = adminDb.collection('theoremreach_transactions').doc(String(token));
      const txSnap = await txRef.get();

      if (txSnap.exists) {
        const existingData = txSnap.data();
        if (existingData && existingData.status === status) {
          console.log(`[Express - TheoremReach Callback] Duplicate transaction detected: ${token} with status: ${status}`);
          return res.status(200).json({ status: 'success', message: 'Transaction already processed', token });
        }
      }

      // Fetch user profile from Firestore
      const userRef = adminDb.collection('users').doc(String(user_id));
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userData = userSnap.data() || {};
      const currentPoints = Number(userData.points) || 0;
      const currentSurveys = Number(userData.completedSurveysCount) || 0;
      const pointsToChange = Math.round(Number(value) || 0);

      let newPoints = currentPoints;
      let newSurveysCount = currentSurveys;

      if (status === '2') {
        // Reversal/chargeback
        newPoints = Math.max(0, currentPoints - pointsToChange);
      } else {
        // Reward credit
        newPoints = currentPoints + pointsToChange;
        newSurveysCount = currentSurveys + 1;
      }

      const newBalanceInRupees = Math.floor(newPoints / 10);

      // Update user points and survey count
      await userRef.update({
        points: newPoints,
        balanceInRupees: newBalanceInRupees,
        completedSurveysCount: newSurveysCount
      });

      // Save transaction record to Firestore
      await txRef.set({
        transId: String(token),
        userId: String(user_id),
        amountPoints: pointsToChange,
        status,
        processedAt: new Date().toISOString()
      });

      console.log(`[Express - TheoremReach Callback] Success. Processed status ${status} with ${pointsToChange} points for user ${user_id}`);

      return res.status(200).json({
        status: 'success',
        message: 'Reward processed successfully',
        token,
        user_id,
        credited_points: status === '2' ? -pointsToChange : pointsToChange
      });
    } catch (err: any) {
      console.error('[Express - TheoremReach Callback Error]:', err);
      return res.status(500).json({
        error: err.message || 'Internal server error'
      });
    }
  });

  // Cloudflare Turnstile Siteverify Endpoint
  app.post('/api/verify-turnstile', async (req, res) => {
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
  });

  // Serve frontend in development or production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
