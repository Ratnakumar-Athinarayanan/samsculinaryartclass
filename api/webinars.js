import { readDb, writeDb } from './_db.js';

export default async function handler(req, res) {
  // CORS & JSON Content Type headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const db = await readDb();

    // GET /api/webinars
    if (req.method === 'GET') {
      return res.status(200).json({ success: true, data: db.webinars || [] });
    }

    // POST /api/webinars
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

      // Reset request check
      if (req.query?.action === 'reset' || body.action === 'reset') {
        db.webinars = [];
        db.registrations = [];
        await writeDb(db);
        return res.status(200).json({ success: true, message: 'Database reset to empty state', data: [] });
      }

      const newWebinar = {
        ...body,
        id: body.id || `web-${Date.now()}`,
        enrolledCount: body.enrolledCount || 0,
        status: body.status || 'published',
        createdAt: new Date().toISOString()
      };

      db.webinars = [newWebinar, ...(db.webinars || [])];
      await writeDb(db);

      return res.status(201).json({ success: true, data: newWebinar });
    }

    // PUT /api/webinars
    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { id, ...updatedFields } = body;

      if (!id) {
        return res.status(400).json({ success: false, error: 'Webinar ID is required for update' });
      }

      const index = db.webinars.findIndex((w) => w.id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Webinar not found' });
      }

      db.webinars[index] = { ...db.webinars[index], ...updatedFields };
      await writeDb(db);

      return res.status(200).json({ success: true, data: db.webinars[index] });
    }

    // DELETE /api/webinars
    if (req.method === 'DELETE') {
      const id = req.query?.id || (typeof req.body === 'object' ? req.body?.id : null);

      if (!id) {
        return res.status(400).json({ success: false, error: 'Webinar ID is required for deletion' });
      }

      db.webinars = db.webinars.filter((w) => w.id !== id);
      db.registrations = db.registrations.filter((r) => r.webinarId !== id);
      await writeDb(db);

      return res.status(200).json({ success: true, message: 'Webinar deleted successfully' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('API /api/webinars error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
