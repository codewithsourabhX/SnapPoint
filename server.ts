import express from 'express';
import path from 'path';
import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

dotenv.config();

// Load Firebase config
const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
const firebaseConfig = JSON.parse(readFileSync(firebaseConfigPath, 'utf-8'));
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
      const cpxSecret = process.env.CPX_SECURE_HASH || 'DkZJVrX46eJvFPUFItSOPrpxSdh3kpBr' || secure_hash;
      if (cpxSecret) {
        const hashHyphen = crypto.createHash('md5').update(`${trans_id}-${cpxSecret}`).digest('hex').toLowerCase();
        const hashNoHyphen = crypto.createHash('md5').update(`${trans_id}${cpxSecret}`).digest('hex').toLowerCase();
        const receivedHash = String(hash).toLowerCase();

        if (receivedHash && receivedHash !== hashHyphen && receivedHash !== hashNoHyphen) {
          console.error(`[CPX Postback] Hash mismatch for transaction ${trans_id}`);
          return res.status(400).json({
            status: 'error',
            error: 'Invalid secure hash'
          });
        }
      }

      // Check for duplicate transaction
      const txRef = doc(db, 'cpx_transactions', String(trans_id));
      const txSnap = await getDoc(txRef);

      if (txSnap.exists()) {
        const existingData = txSnap.data();
        if (existingData.status === status) {
          return res.status(200).json({
            status: 'success',
            message: 'Transaction already processed',
            trans_id
          });
        }
      }

      // Fetch user profile from Firestore
      const userRef = doc(db, 'users', String(user_id));
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        return res.status(404).json({
          status: 'error',
          error: `User with ID ${user_id} not found`
        });
      }

      const userData = userSnap.data();
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
      await updateDoc(userRef, {
        points: newPoints,
        balanceInRupees: newBalanceInRupees,
        completedSurveysCount: newSurveysCount
      });

      // Save transaction record to Firestore
      await setDoc(txRef, {
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
