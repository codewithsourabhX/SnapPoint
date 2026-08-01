import crypto from 'node:crypto';
import { adminDb } from '../firebaseAdmin.js';

export default async function handler(req: any, res: any) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Log every callback as required
  console.log(`[TheoremReach Callback] Method: ${req.method}, Query: ${JSON.stringify(req.query)}, Body: ${JSON.stringify(req.body)}`);

  try {
    const params = { ...req.query, ...req.body };
    const user_id = params.user_id;
    const value = params.value;
    const token = params.token;
    const signature = params.signature;

    if (!user_id || !value || !token || !signature) {
      console.error('[TheoremReach Callback] Missing required parameters');
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const secretKey = process.env.THEOREMREACH_SECRET_KEY || 'dfe5ad99f4f82a0665df0ebd9f03f6f8a96ed6a4';

    // Verify signature
    // Template: {secret_key}.{user_id}.{int(value)}.{token}
    const valueInt = Math.floor(parseFloat(value));
    const template = `${secretKey}.${user_id}.${valueInt}.${token}`;
    const calculatedSig = crypto.createHash('md5').update(template).digest('hex');

    if (calculatedSig.toLowerCase() !== String(signature).toLowerCase()) {
      console.error(`[TheoremReach Callback] Signature mismatch. Calculated: ${calculatedSig}, Received: ${signature}`);
      return res.status(401).json({ error: 'Invalid signature (Unauthorized)' });
    }

    // Prevent duplicate rewards using transaction ID (token)
    const txRef = adminDb.collection('theoremreach_transactions').doc(String(token));
    const txSnap = await txRef.get();

    if (txSnap.exists) {
      console.log(`[TheoremReach Callback] Duplicate transaction detected: ${token}`);
      return res.status(200).json({ status: 'success', message: 'Transaction already processed', token });
    }

    // Fetch user profile from Firestore
    const userRef = adminDb.collection('users').doc(String(user_id));
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      console.error(`[TheoremReach Callback] User with ID ${user_id} not found`);
      return res.status(404).json({ error: `User not found` });
    }

    const userData = userSnap.data() || {};
    const currentPoints = Number(userData.points) || 0;
    const currentSurveys = Number(userData.completedSurveysCount) || 0;
    const pointsToChange = Math.round(Number(value) || 0);

    const newPoints = currentPoints + pointsToChange;
    const newSurveysCount = currentSurveys + 1;
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
      processedAt: new Date().toISOString()
    });

    console.log(`[TheoremReach Callback] Success. Credited ${pointsToChange} points to user ${user_id}`);

    return res.status(200).json({
      status: 'success',
      message: 'Reward processed successfully',
      token,
      user_id,
      credited_points: pointsToChange
    });
  } catch (err: any) {
    console.error('[TheoremReach Callback Error]:', err);
    return res.status(500).json({
      error: err.message || 'Internal server error processing TheoremReach callback'
    });
  }
}
