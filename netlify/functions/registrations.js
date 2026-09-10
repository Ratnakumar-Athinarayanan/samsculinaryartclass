import { readDb, writeDb } from '../../api/_db.js';

export async function handler(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

    // GET /api/registrations
    if (event.httpMethod === 'GET') {
      const queryParams = event.queryStringParameters || {};
      const webinarId = queryParams.webinarId;
      let result = db.registrations || [];

      if (webinarId) {
        result = result.filter((r) => r.webinarId === webinarId);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: result })
      };
    }

    // POST /api/registrations
    if (event.httpMethod === 'POST') {
      const body = parseBody(event);
      const { webinarId, userName, userEmail, paymentStatus = 'free', amountPaid = 0, couponUsed = '' } = body;

      if (!webinarId || !userName || !userEmail) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Webinar ID, User Name, and Email are required' })
        };
      }

      // Check for existing registration
      const existing = (db.registrations || []).find(
        (r) => r.webinarId === webinarId && r.userEmail.toLowerCase() === userEmail.toLowerCase()
      );

      if (existing) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            isAlreadyRegistered: true,
            data: existing
          })
        };
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
      const webIndex = (db.webinars || []).findIndex((w) => w.id === webinarId);
      if (webIndex !== -1) {
        db.webinars[webIndex].enrolledCount = (db.webinars[webIndex].enrolledCount || 0) + 1;
      }

      await writeDb(db);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          isAlreadyRegistered: false,
          data: newRegistration
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  } catch (err) {
    console.error('Netlify Function registrations error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
}
