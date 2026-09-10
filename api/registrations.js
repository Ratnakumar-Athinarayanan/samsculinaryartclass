import { readDb, writeDb } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const db = await readDb();

    // GET /api/registrations
    if (req.method === 'GET') {
      const webinarId = req.query?.webinarId;
      let result = db.registrations || [];

      if (webinarId) {
        result = result.filter((r) => r.webinarId === webinarId);
      }

      return res.status(200).json({ success: true, data: result });
    }

    // POST /api/registrations
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { webinarId, userName, userEmail, paymentStatus = 'free', amountPaid = 0, couponUsed = '' } = body;

      if (!webinarId || !userName || !userEmail) {
        return res.status(400).json({ success: false, error: 'Webinar ID, User Name, and Email are required' });
      }

      // Check for existing registration
      const existing = (db.registrations || []).find(
        (r) => r.webinarId === webinarId && r.userEmail.toLowerCase() === userEmail.toLowerCase()
      );

      if (existing) {
        return res.status(200).json({
          success: true,
          isAlreadyRegistered: true,
          data: existing
        });
      }

      const newRegistration = {
        id: `reg-${Date.now()}`,
        webinarId,
        userId: `usr-${Date.now()}`,
        userName,
        userEmail,
        paymentStatus,
        amountPaid: Number(amountPaid) || 0,
        registeredAt: new Date().toISOString(),
        couponUsed
      };

      db.registrations = [newRegistration, ...(db.registrations || [])];

      // Update enrolled count in webinar object
      const webIndex = db.webinars.findIndex((w) => w.id === webinarId);
      if (webIndex !== -1) {
        db.webinars[webIndex].enrolledCount = (db.webinars[webIndex].enrolledCount || 0) + 1;
      }

      await writeDb(db);

      return res.status(201).json({
        success: true,
        isAlreadyRegistered: false,
        data: newRegistration
      });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('API /api/registrations error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
