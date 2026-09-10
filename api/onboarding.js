import { readDb, writeDb } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const db = await readDb();
    const onboardingList = db.onboarding || [];

    // GET /api/onboarding
    if (req.method === 'GET') {
      const status = req.query?.status;
      let result = onboardingList;
      if (status && status !== 'All') {
        result = result.filter((item) => item.status?.toLowerCase() === status.toLowerCase());
      }
      return res.status(200).json({ success: true, data: result });
    }

    // POST /api/onboarding - Submit new onboarding form
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const {
        name,
        email,
        phone,
        address,
        fatherName,
        motherName,
        nationality = 'Indian',
        purposeOfJoining,
        bankDetails = '',
        amountPaid = 500,
        proofImageUrl = ''
      } = body;

      if (!name || !email || !phone || !address || !fatherName || !motherName || !purposeOfJoining || !bankDetails) {
        return res.status(400).json({
          success: false,
          error: 'Missing required onboarding fields (Name, Email, Phone, Address, Parents Names, Purpose, Bank Reference Details).'
        });
      }

      const newApplication = {
        id: `onboard-${Date.now()}`,
        applicationNumber: `SAMS-ONB-${Math.floor(100000 + Math.random() * 900000)}`,
        name: String(name || '').trim(),
        email: String(email || '').trim().toLowerCase(),
        phone: String(phone || '').trim(),
        address: String(address || '').trim(),
        fatherName: String(fatherName || '').trim(),
        motherName: String(motherName || '').trim(),
        nationality: String(nationality || 'Indian').trim(),
        purposeOfJoining: String(purposeOfJoining || '').trim(),
        bankDetails: String(bankDetails || '').trim(),
        amountPaid: Number(amountPaid) || 500,
        proofImageUrl: String(proofImageUrl || '').trim(),
        currency: 'INR',
        status: 'Pending Verification', // 'Pending Verification' | 'Verified / Enrolled' | 'Follow-up'
        adminNotes: '',
        submittedAt: new Date().toISOString()
      };

      db.onboarding = [newApplication, ...(db.onboarding || [])];
      await writeDb(db);

      return res.status(201).json({
        success: true,
        message: 'Onboarding application registered successfully',
        data: newApplication
      });
    }

    // PUT /api/onboarding - Update application status/admin notes
    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { id, status, adminNotes } = body;

      if (!id) {
        return res.status(400).json({ success: false, error: 'Application ID is required' });
      }

      const index = onboardingList.findIndex((item) => item.id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      if (status !== undefined) onboardingList[index].status = status;
      if (adminNotes !== undefined) onboardingList[index].adminNotes = adminNotes;
      onboardingList[index].updatedAt = new Date().toISOString();

      db.onboarding = onboardingList;
      await writeDb(db);

      return res.status(200).json({ success: true, data: onboardingList[index] });
    }

    // DELETE /api/onboarding - Delete application
    if (req.method === 'DELETE') {
      const id = req.query?.id || (typeof req.body === 'object' ? req.body?.id : null);

      if (!id) {
        return res.status(400).json({ success: false, error: 'Application ID is required for deletion' });
      }

      db.onboarding = onboardingList.filter((item) => item.id !== id);
      await writeDb(db);

      return res.status(200).json({ success: true, message: 'Application deleted successfully' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('API /api/onboarding error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
