import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import crypto from 'node:crypto';
import firebaseConfig from '../firebase-applet-config.json';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

export default async function handler(req: any, res: any) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
}
