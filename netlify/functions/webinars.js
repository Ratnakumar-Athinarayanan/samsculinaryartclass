import { readDb, writeDb } from '../../api/_db.js';

export async function handler(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const db = await readDb();

    // Helper to safely parse Netlify request body (handling base64 encoded event bodies)
    const parseBody = (evt) => {
      if (!evt.body) return {};
      let str = evt.body;
      if (evt.isBase64Encoded) {
        try {
          str = Buffer.from(evt.body, 'base64').toString('utf-8');
        } catch (err) {
          console.error('Base64 decode error:', err);
        }
      }
      try {
        return typeof str === 'string' ? JSON.parse(str) : str || {};
      } catch (err) {
        console.error('JSON parse error in Netlify body:', err);
        return {};
      }
    };

    // GET /api/webinars
    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: db.webinars || [] })
      };
    }

    // POST /api/webinars
    if (event.httpMethod === 'POST') {
      const body = parseBody(event);
      const queryParams = event.queryStringParameters || {};

      if (queryParams.action === 'reset' || body.action === 'reset') {
        db.webinars = [];
        db.registrations = [];
        await writeDb(db);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, message: 'Database reset to empty state', data: [] })
        };
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

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ success: true, data: newWebinar })
      };
    }

    // PUT /api/webinars
    if (event.httpMethod === 'PUT') {
      const body = parseBody(event);
      const { id, ...updatedFields } = body;

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Webinar ID is required for update' })
        };
      }

      const index = (db.webinars || []).findIndex((w) => w.id === id);
      if (index === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ success: false, error: 'Webinar not found' })
        };
      }

      db.webinars[index] = { ...db.webinars[index], ...updatedFields };
      await writeDb(db);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: db.webinars[index] })
      };
    }

    // DELETE /api/webinars
    if (event.httpMethod === 'DELETE') {
      const queryParams = event.queryStringParameters || {};
      const body = parseBody(event);
      const id = queryParams.id || body.id;

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Webinar ID is required for deletion' })
        };
      }

      db.webinars = (db.webinars || []).filter((w) => w.id !== id);
      db.registrations = (db.registrations || []).filter((r) => r.webinarId !== id);
      await writeDb(db);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Webinar deleted successfully' })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  } catch (err) {
    console.error('Netlify Function webinars error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
}
