// onboardingService.js - Client Service for Student Onboarding & Google Form Integration

const API_BASE = '/api';
const GOOGLE_FORM_RESPONSE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdsgY7XjHLixFD5TT4AcYVTPZzDf2OYQwLk36ieqaeM3xE6Rg/formResponse';

/**
 * Upload image to Cloudinary via backend /api/upload
 */
export async function uploadImageToCloudinary(imageFileOrBase64) {
  try {
    let base64Data = imageFileOrBase64;

    // If a File object is passed, convert to base64
    if (imageFileOrBase64 instanceof File) {
      base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageFileOrBase64);
      });
    }

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Data, folder: 'sams_onboarding_proofs' })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Upload failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.url; // Returns lightweight Cloudinary CDN URL
  } catch (err) {
    console.error('Image upload failed:', err);
    throw err;
  }
}

// Field mapping to Google Form entry IDs
const GOOGLE_FORM_ENTRIES = {
  name: 'entry.2005620554',
  email: 'entry.1045781291',
  address: 'entry.1065046570',
  phone: 'entry.1166974658',
  fatherName: 'entry.839337160',
  motherName: 'entry.2124628375',
  nationality: 'entry.1874688714',
  purposeOfJoining: 'entry.1365989925',
  bankDetails: 'entry.2101736501'
};

/**
 * Submit to Google Form in the background
 */
async function submitToGoogleForm(formData) {
  try {
    const params = new URLSearchParams();
    params.append(GOOGLE_FORM_ENTRIES.name, formData.name || '');
    params.append(GOOGLE_FORM_ENTRIES.email, formData.email || '');
    params.append(GOOGLE_FORM_ENTRIES.address, formData.address || '');
    params.append(GOOGLE_FORM_ENTRIES.phone, formData.phone || '');
    params.append(GOOGLE_FORM_ENTRIES.fatherName, formData.fatherName || '');
    params.append(GOOGLE_FORM_ENTRIES.motherName, formData.motherName || '');
    params.append(GOOGLE_FORM_ENTRIES.nationality, formData.nationality || 'Indian');
    params.append(GOOGLE_FORM_ENTRIES.purposeOfJoining, formData.purposeOfJoining || '');
    params.append(GOOGLE_FORM_ENTRIES.bankDetails, formData.bankDetails || '');
    params.append('fvv', '1');
    params.append('pageHistory', '0');

    // Submit with no-cors so browser doesn't block cross-origin post to Google Forms
    await fetch(GOOGLE_FORM_RESPONSE_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
  } catch (err) {
    console.warn('Google Form background sync warning:', err);
    // Non-blocking, continue with local backend DB sync
  }
}

/**
 * Submit onboarding registration to backend & Google Form
 */
export async function submitOnboardingForm(formData) {
  // 1. Submit to Google Form in background
  submitToGoogleForm(formData);

  // 2. Submit to MongoDB Atlas backend
  try {
    const res = await fetch(`${API_BASE}/onboarding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || `HTTP error ${res.status}`);
    }

    const json = await res.json();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('onboarding_updated'));
    }
    return json.data;
  } catch (err) {
    console.error('Failed to submit onboarding to backend:', err);
    throw err;
  }
}

/**
 * Get all onboarding submissions from backend
 */
export async function getOnboardingApplications(status = 'All') {
  try {
    const url = status && status !== 'All' 
      ? `${API_BASE}/onboarding?status=${encodeURIComponent(status)}` 
      : `${API_BASE}/onboarding`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Failed to fetch onboarding applications:', err);
    return [];
  }
}

/**
 * Update application status or admin notes
 */
export async function updateApplicationStatus(id, status, adminNotes) {
  try {
    const res = await fetch(`${API_BASE}/onboarding`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, adminNotes })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('onboarding_updated'));
    }
    return { data: json.data, emailResult: json.emailResult };
  } catch (err) {
    console.error('Failed to update onboarding status:', err);
    throw err;
  }
}

/**
 * Manually trigger resending the selection email to applicant
 */
export async function resendSelectionEmail(id) {
  try {
    const res = await fetch(`${API_BASE}/onboarding`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action: 'resend_email' })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('onboarding_updated'));
    }
    return { data: json.data, emailResult: json.emailResult };
  } catch (err) {
    console.error('Failed to resend selection email:', err);
    throw err;
  }
}

/**
 * Delete application
 */
export async function deleteApplication(id) {
  try {
    const res = await fetch(`${API_BASE}/onboarding?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('onboarding_updated'));
    }
    return true;
  } catch (err) {
    console.error('Failed to delete onboarding application:', err);
    throw err;
  }
}

/**
 * Export applications list to CSV file
 */
export function exportOnboardingToCSV(applications = []) {
  if (!applications || applications.length === 0) return;

  const headers = [
    'Application No',
    'Student Name',
    'Email',
    'Phone / WhatsApp',
    'Address',
    'Father Name',
    'Mother Name',
    'Nationality Type',
    'Country',
    'ID Proof Type',
    'ID Proof Number',
    'ID Proof URL',
    'Purpose of Joining',
    'Fee (INR)',
    'Bank / UPI Reference',
    'Payment Proof Image URL',
    'Status',
    'Email Notification',
    'Admin Notes',
    'Submitted Date'
  ];

  const rows = applications.map((app) => [
    `"${app.applicationNumber || app.id || ''}"`,
    `"${(app.name || '').replace(/"/g, '""')}"`,
    `"${(app.email || '').replace(/"/g, '""')}"`,
    `"${(app.phone || '').replace(/"/g, '""')}"`,
    `"${(app.address || '').replace(/"/g, '""')}"`,
    `"${(app.fatherName || '').replace(/"/g, '""')}"`,
    `"${(app.motherName || '').replace(/"/g, '""')}"`,
    `"${(app.applicantType || 'Indian').replace(/"/g, '""')}"`,
    `"${(app.country || 'India').replace(/"/g, '""')}"`,
    `"${(app.idProofType || '').replace(/"/g, '""')}"`,
    `"${(app.idProofNumber || '').replace(/"/g, '""')}"`,
    `"${(app.idProofImageUrl || '').replace(/"/g, '""')}"`,
    `"${(app.purposeOfJoining || '').replace(/"/g, '""')}"`,
    `"${app.amountPaid || 500}"`,
    `"${(app.bankDetails || '').replace(/"/g, '""')}"`,
    `"${(app.proofImageUrl || '').replace(/"/g, '""')}"`,
    `"${app.status || 'Pending'}"`,
    `"${app.emailNotificationSent ? (app.emailStatus || 'Sent') : 'Not Sent'}"`,
    `"${(app.adminNotes || '').replace(/"/g, '""')}"`,
    `"${app.submittedAt ? new Date(app.submittedAt).toLocaleString() : ''}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Sams_Culinary_Onboarding_Applications_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
