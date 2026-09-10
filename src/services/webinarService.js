// webinarService.js - Production API Client for Vercel Serverless & Database Backend

const API_BASE = '/api';

// Helper to calculate dynamic webinar status based on current time
export function getWebinarStatus(webinar) {
  if (!webinar) return 'Upcoming';

  let startMs = 0;
  if (webinar.schedule?.startTime) {
    const t = new Date(webinar.schedule.startTime).getTime();
    if (!isNaN(t)) startMs = t;
  }
  if (!startMs && webinar.startDate) {
    const time = webinar.startTime || '11:00';
    const t = new Date(`${webinar.startDate}T${time}:00`).getTime();
    if (!isNaN(t)) startMs = t;
  }

  if (!startMs) return webinar.status === 'completed' ? 'Completed' : 'Upcoming';

  const durationMinutes = webinar.schedule?.durationMinutes || webinar.durationMinutes || 60;
  const durationMs = durationMinutes * 60 * 1000;
  const endMs = startMs + durationMs;
  const nowMs = Date.now();

  if (nowMs < startMs) return 'Upcoming';
  if (nowMs >= startMs && nowMs <= endMs) return 'Live';
  return 'Completed';
}

// Fetch all webinars from backend DB
export async function getWebinars() {
  try {
    const res = await fetch(`${API_BASE}/webinars`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.error('Failed to fetch webinars from backend:', e);
    return [];
  }
}

// Fetch all registrations from backend DB
export async function getRegistrations() {
  try {
    const res = await fetch(`${API_BASE}/registrations`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.error('Failed to fetch registrations from backend:', e);
    return [];
  }
}

// Create a new webinar in DB
export async function createWebinar(webinarData) {
  try {
    const res = await fetch(`${API_BASE}/webinars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webinarData)
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    window.dispatchEvent(new Event('webinars_updated'));
    return json.data;
  } catch (e) {
    console.error('Failed to create webinar:', e);
    throw e;
  }
}

// Update an existing webinar in DB
export async function updateWebinar(id, updatedFields) {
  try {
    const res = await fetch(`${API_BASE}/webinars`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updatedFields })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    window.dispatchEvent(new Event('webinars_updated'));
    return json.data;
  } catch (e) {
    console.error('Failed to update webinar:', e);
    throw e;
  }
}

// Delete a webinar from DB
export async function deleteWebinar(id) {
  try {
    const res = await fetch(`${API_BASE}/webinars?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    window.dispatchEvent(new Event('webinars_updated'));
    return json.success;
  } catch (e) {
    console.error('Failed to delete webinar:', e);
    throw e;
  }
}

// Register a student for a webinar in DB
export async function registerForWebinar({ webinarId, userName, userEmail, paymentStatus = 'free', amountPaid = 0, couponUsed = '' }) {
  try {
    const res = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ webinarId, userName, userEmail, paymentStatus, amountPaid, couponUsed })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    window.dispatchEvent(new Event('registrations_updated'));
    window.dispatchEvent(new Event('webinars_updated'));
    return {
      success: json.success,
      registration: json.data,
      isAlreadyRegistered: !!json.isAlreadyRegistered
    };
  } catch (e) {
    console.error('Failed to register for webinar:', e);
    throw e;
  }
}

// Get registrations for a specific webinar
export async function getRegistrationsForWebinar(webinarId) {
  try {
    const res = await fetch(`${API_BASE}/registrations?webinarId=${encodeURIComponent(webinarId)}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.error('Failed to fetch webinar registrations:', e);
    return [];
  }
}

// Check if user email is registered for a webinar
export async function isUserRegistered(webinarId, email) {
  if (!email) return false;
  const regs = await getRegistrationsForWebinar(webinarId);
  return regs.some((r) => r.userEmail.toLowerCase() === email.toLowerCase());
}

// ICS File Generator (Client-side)
export function generateICSFile(webinar) {
  if (!webinar || !webinar.schedule) return;
  const startTime = new Date(webinar.schedule.startTime);
  const endTime = new Date(startTime.getTime() + (webinar.schedule.durationMinutes || 60) * 60 * 1000);

  const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sam Culinary Art Classes//Webinar Hub//EN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:webinar-${webinar.id}@samsculinary.com`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startTime)}`,
    `DTEND:${formatDate(endTime)}`,
    `SUMMARY:${webinar.title || 'Culinary Webinar'}`,
    `DESCRIPTION:${webinar.tagline || webinar.description || ''}\\n\\nGoogle Meet Link: ${webinar.meetingUrl || 'N/A'}\\nCommunity Group: ${webinar.groupJoinUrl || 'N/A'}`,
    `LOCATION:${webinar.meetingUrl || 'Online'}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${(webinar.title || 'Webinar').replace(/[^a-zA-Z0-9]/g, '_')}_invite.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Reset database to empty
export async function resetToDefaults() {
  try {
    const res = await fetch(`${API_BASE}/webinars?action=reset`, { method: 'POST' });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    window.dispatchEvent(new Event('webinars_updated'));
    window.dispatchEvent(new Event('registrations_updated'));
  } catch (e) {
    console.error('Failed to reset backend database:', e);
  }
}
