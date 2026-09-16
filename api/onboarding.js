import { readDb, writeDb } from './_db.js';
import { sendApplicationSelectedEmail } from './_email.js';
import { deleteFromCloudinary } from './_cloudinary.js';

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
        applicantType = 'Indian', // 'Indian' | 'NRI'
        country = 'India',
        idProofType = '', // 'Aadhar' | 'Driving License' | 'Student ID' | 'Passport' | 'Citizenship' | 'VISA'
        idProofNumber = '',
        idProofImageUrl = '',
        idProofBytes = 0,
        purposeOfJoining,
        bankDetails = '',
        amountPaid = 500,
        proofImageUrl = ''
      } = body;

      if (!name || !email || !phone || !address || !fatherName || !motherName || !purposeOfJoining || !bankDetails) {
        return res.status(400).json({
          success: false,
          error: 'Required fields missing (name, email, phone, address, parents, purpose, bank reference)'
        });
      }

      // Generate human-friendly reference ID
      const timestamp = Date.now();
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const appNumber = `SAMS-ONB-${randomSuffix}`;

      const newApplication = {
        id: `onboard-${timestamp}`,
        applicationNumber: appNumber,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        address: address.trim(),
        fatherName: fatherName.trim(),
        motherName: motherName.trim(),
        nationality: applicantType === 'NRI' ? `NRI - ${country}` : 'Indian',
        applicantType,
        country: applicantType === 'NRI' ? country : 'India',
        idProofType: idProofType || (applicantType === 'NRI' ? 'Passport' : 'Aadhar'),
        idProofNumber: idProofNumber ? idProofNumber.trim() : '',
        idProofImageUrl: idProofImageUrl || '',
        idProofBytes: idProofBytes || 0,
        purposeOfJoining: purposeOfJoining.trim(),
        bankDetails: bankDetails.trim(),
        amountPaid: Number(amountPaid) || 500,
        proofImageUrl: proofImageUrl || '',
        currency: 'INR',
        status: 'Pending Verification', // 'Pending Verification' | 'Verified / Enrolled' | 'Follow-up'
        adminNotes: '',
        emailNotificationSent: false,
        emailSentAt: null,
        emailStatus: 'Pending',
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

    // PUT /api/onboarding - Update application status/admin notes & send selection email
    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { id, status, adminNotes, action, sendEmail } = body;

      if (!id) {
        return res.status(400).json({ success: false, error: 'Application ID is required' });
      }

      const index = onboardingList.findIndex((item) => item.id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Application not found' });
      }

      const prevRecord = onboardingList[index];
      const prevStatus = prevRecord.status;

      if (status !== undefined) onboardingList[index].status = status;
      if (adminNotes !== undefined) onboardingList[index].adminNotes = adminNotes;
      onboardingList[index].updatedAt = new Date().toISOString();

      let emailResult = null;
      const isMarkingVerified = status === 'Verified / Enrolled' && prevStatus !== 'Verified / Enrolled';
      const isExplicitResend = action === 'resend_email' || sendEmail === true;

      // When changed to 'Verified / Enrolled' or explicitly requested, dispatch selection email
      if (isMarkingVerified || isExplicitResend) {
        try {
          emailResult = await sendApplicationSelectedEmail(onboardingList[index]);
          if (emailResult.simulated) {
            onboardingList[index].emailNotificationSent = false;
            onboardingList[index].emailSentAt = null;
            onboardingList[index].emailStatus = 'Missing SMTP in .env';
          } else {
            onboardingList[index].emailNotificationSent = true;
            onboardingList[index].emailSentAt = new Date().toISOString();
            onboardingList[index].emailStatus = 'Sent';
          }
        } catch (emailErr) {
          console.error('Failed to dispatch selection email:', emailErr);
          emailResult = { success: false, error: emailErr.message };
          onboardingList[index].emailNotificationSent = false;
          onboardingList[index].emailStatus = `Failed: ${emailErr.message}`;
        }
      }

      db.onboarding = onboardingList;
      await writeDb(db);

      return res.status(200).json({
        success: true,
        data: onboardingList[index],
        emailResult: emailResult || null
      });
    }

    // DELETE /api/onboarding - Delete application & permanently remove images from Cloudinary
    if (req.method === 'DELETE') {
      const id = req.query?.id || (typeof req.body === 'object' ? req.body?.id : null);

      if (!id) {
        return res.status(400).json({ success: false, error: 'Application ID is required for deletion' });
      }

      const targetApplicant = onboardingList.find((item) => item.id === id);
      if (targetApplicant) {
        const imagesToDestroy = [];
        if (targetApplicant.idProofImageUrl) imagesToDestroy.push(targetApplicant.idProofImageUrl);
        if (targetApplicant.proofImageUrl) imagesToDestroy.push(targetApplicant.proofImageUrl);

        // Delete from Cloudinary in parallel
        await Promise.allSettled(
          imagesToDestroy.map(async (imgUrl) => {
            try {
              await deleteFromCloudinary(imgUrl);
            } catch (delErr) {
              console.error('Failed to delete image from Cloudinary:', imgUrl, delErr);
            }
          })
        );
      }

      db.onboarding = onboardingList.filter((item) => item.id !== id);
      await writeDb(db);

      return res.status(200).json({
        success: true,
        message: 'Application and associated Cloudinary images deleted successfully'
      });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('API /api/onboarding error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
