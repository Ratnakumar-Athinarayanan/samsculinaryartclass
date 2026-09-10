import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { message, Modal, DatePicker, Pagination, ConfigProvider, theme as antdTheme } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UsergroupAddOutlined, 
  CopyOutlined, 
  EyeOutlined, 
  VideoCameraOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  DollarOutlined, 
  TagOutlined, 
  FireFilled, 
  LinkOutlined, 
  DownloadOutlined, 
  MailOutlined, 
  CheckCircleOutlined, 
  CloseOutlined, 
  ReloadOutlined,
  SendOutlined,
  SearchOutlined,
  LockOutlined,
  LogoutOutlined,
  UploadOutlined,
  LoadingOutlined,
  PictureOutlined,
  ArrowRightOutlined,
  FormOutlined,
  WhatsAppOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  TeamOutlined,
  GlobalOutlined,
  HomeOutlined,
  CreditCardOutlined,
  CheckOutlined
} from '@ant-design/icons';
import useSEO from '../hooks/useSEO';
import TiltCard from '../components/TiltCard';
import { TUTORS } from '../data/tutors';
import { 
  getWebinars, 
  createWebinar, 
  updateWebinar, 
  deleteWebinar, 
  getRegistrationsForWebinar, 
  getRegistrations,
  generateICSFile,
  getWebinarStatus
} from '../services/webinarService';
import {
  getOnboardingApplications,
  updateApplicationStatus,
  deleteApplication,
  exportOnboardingToCSV
} from '../services/onboardingService';

export default function AdminWebinars() {
  const formRef = useRef(null);
  useSEO({
    title: "Admin Control Center - Sam's Culinary Art Classes",
    description: "Manage live webinars, student onboarding registrations, Google Meet links, homepage advertisement banners, and attendee rosters.",
    keywords: "admin webinars, student onboarding admin, culinary control center, manage live cooking classes"
  });

  // Main Section Tab: 'onboarding' | 'webinars'
  const [adminSection, setAdminSection] = useState('onboarding');

  // Webinars State
  const [webinars, setWebinars] = useState([]);
  const [selectedTab, setSelectedTab] = useState('All'); // 'All' | 'Upcoming' | 'Live' | 'Completed'

  // Onboarding Applications State
  const [onboardingList, setOnboardingList] = useState([]);
  const [onboardingTab, setOnboardingTab] = useState('All'); // 'All' | 'Pending Verification' | 'Verified / Enrolled' | 'Follow-up'
  const [onboardingSearch, setOnboardingSearch] = useState('');
  const [dateRange, setDateRange] = useState(null); // [dayjs, dayjs] for From/To filter
  const [onboardingPage, setOnboardingPage] = useState(1);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isDeletingOnboardingId, setIsDeletingOnboardingId] = useState(null);
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(false);

  // Responsive Theme Detection (Light vs Dark Mode)
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  );

  useEffect(() => {
    const checkDark = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Admin Authentication Gate State
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('sams_admin_auth') === 'true');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    if ((cleanEmail === 'admin@samsculinary.com' || cleanEmail === 'samsculinaryartclass@gmail.com' || cleanEmail === 'vahijeeva@gmail.com') && (cleanPass === 'admin123' || cleanPass === 'admin' || cleanPass === 'sams2026')) {
      sessionStorage.setItem('sams_admin_auth', 'true');
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Admin Email or Password. Please try again.');
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('sams_admin_auth');
    setIsLoggedIn(false);
  };

  // Webinar Modal & Loading State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWebinar, setEditingWebinar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Webinar Form State
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    category: 'South Indian',
    instructorName: 'Mrs. M. Vahitha Jeevanandam',
    instructorRole: 'MCA, M.Phil., Dip. in Clinical Nutrition and Dietetics • Founder',
    instructorBio: '',
    instructorAvatar: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200&auto=format&fit=crop',
    bannerUrl: '',
    isFeaturedAd: true,
    pricingType: 'free',
    price: 0,
    listPrice: 0,
    currency: 'INR',
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '11:00',
    endTime: '12:30',
    timezone: 'IST (UTC+5:30)',
    durationMinutes: 90,
    meetingUrl: 'https://meet.google.com/sam-culinary-demo',
    status: 'published'
  });

  const loadWebinars = async () => {
    const webs = await getWebinars();
    setWebinars(webs);
  };

  const loadOnboarding = async () => {
    setIsLoadingOnboarding(true);
    try {
      const apps = await getOnboardingApplications();
      setOnboardingList(apps);
    } finally {
      setIsLoadingOnboarding(false);
    }
  };

  useEffect(() => {
    loadWebinars();
    loadOnboarding();

    window.addEventListener('webinars_updated', loadWebinars);
    window.addEventListener('onboarding_updated', loadOnboarding);

    return () => {
      window.removeEventListener('webinars_updated', loadWebinars);
      window.removeEventListener('onboarding_updated', loadOnboarding);
    };
  }, []);

  // Reset pagination when search, status tab or date range changes
  useEffect(() => {
    setOnboardingPage(1);
  }, [onboardingTab, onboardingSearch, dateRange]);

  // Scroll window and modal to top when applicant is selected
  useEffect(() => {
    if (selectedApplicant) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const timer = setTimeout(() => {
        const modalElements = document.querySelectorAll('.ant-modal-body, .ant-modal-content, .ant-modal-wrap, .ant-modal');
        modalElements.forEach((el) => {
          if (el) el.scrollTop = 0;
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedApplicant]);

  // Tutor Selection Handler
  const handleTutorSelect = (tutorName) => {
    const selected = TUTORS.find((t) => t.name === tutorName) || TUTORS[0];
    setFormData((prev) => ({
      ...prev,
      instructorName: selected.name,
      instructorRole: selected.role,
      instructorBio: selected.bio,
      instructorAvatar: selected.avatar
    }));
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        message.warning('Image file size is too large. Please choose an image under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, bannerUrl: reader.result }));
        message.success('Local image uploaded and preview updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Form for Create Webinar
  const handleOpenCreate = () => {
    const defaultTutor = TUTORS[0];
    setEditingWebinar(null);
    setFormData({
      title: '',
      tagline: '',
      description: '',
      category: 'South Indian',
      instructorName: defaultTutor.name,
      instructorRole: defaultTutor.role,
      instructorBio: defaultTutor.bio,
      instructorAvatar: defaultTutor.avatar,
      bannerUrl: '',
      isFeaturedAd: true,
      pricingType: 'free',
      price: 0,
      listPrice: 0,
      currency: 'INR',
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      startTime: '11:00',
      endTime: '12:30',
      timezone: 'IST (UTC+5:30)',
      durationMinutes: 90,
      meetingUrl: 'https://meet.google.com/sam-culinary-demo',
      status: 'published'
    });
    setIsFormOpen(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  // Open Form for Edit Webinar
  const handleOpenEdit = (webinar) => {
    setEditingWebinar(webinar);
    const startIso = webinar.schedule?.startTime || (webinar.startDate ? `${webinar.startDate}T${webinar.startTime || '11:00'}:00` : new Date().toISOString());
    const dateObj = new Date(startIso);
    const dateStr = !isNaN(dateObj) ? dateObj.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const timeStr = !isNaN(dateObj) ? dateObj.toTimeString().slice(0, 5) : '11:00';

    let endTimeStr = webinar.schedule?.endTime || webinar.endTime;
    if (!endTimeStr && webinar.schedule?.startTime && webinar.schedule?.durationMinutes) {
      const endDate = new Date(new Date(webinar.schedule.startTime).getTime() + webinar.schedule.durationMinutes * 60000);
      endTimeStr = endDate.toTimeString().slice(0, 5);
    }
    if (!endTimeStr) endTimeStr = '12:30';

    const defaultTutor = TUTORS[0];

    setFormData({
      title: webinar.title || '',
      tagline: webinar.tagline || '',
      description: webinar.description || '',
      category: webinar.category || 'South Indian',
      instructorName: webinar.instructor?.name || defaultTutor.name,
      instructorRole: webinar.instructor?.role || defaultTutor.role,
      instructorBio: webinar.instructor?.bio || defaultTutor.bio,
      instructorAvatar: webinar.instructor?.avatar || defaultTutor.avatar,
      bannerUrl: webinar.bannerUrl || '',
      isFeaturedAd: !!webinar.isFeaturedAd,
      startDate: dateStr,
      startTime: timeStr,
      endTime: endTimeStr,
      timezone: webinar.schedule?.timezone || webinar.timezone || 'IST (UTC+5:30)',
      durationMinutes: webinar.schedule?.durationMinutes || 90,
      meetingUrl: webinar.meetingUrl || 'https://meet.google.com',
      status: webinar.status || 'published'
    });
    setIsFormOpen(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  // Handle Webinar Form Save
  const handleSaveForm = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const combinedStartIso = new Date(`${formData.startDate}T${formData.startTime}:00`).toISOString();
      const startParts = formData.startTime.split(':');
      const endParts = formData.endTime.split(':');
      const startMin = parseInt(startParts[0], 10) * 60 + parseInt(startParts[1] || '0', 10);
      const endMin = parseInt(endParts[0], 10) * 60 + parseInt(endParts[1] || '0', 10);
      let calculatedDuration = endMin - startMin;
      if (calculatedDuration <= 0) calculatedDuration = 60;

      const payload = {
        title: formData.title,
        tagline: formData.tagline,
        description: formData.description,
        category: formData.category,
        bannerUrl: formData.bannerUrl || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop',
        isFeaturedAd: formData.isFeaturedAd,
        startDate: formData.startDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        durationMinutes: calculatedDuration,
        meetingUrl: formData.meetingUrl,
        status: formData.status,
        instructor: {
          name: formData.instructorName,
          role: formData.instructorRole,
          bio: formData.instructorBio,
          avatar: formData.instructorAvatar
        },
        schedule: {
          startTime: combinedStartIso,
          endTime: formData.endTime,
          durationMinutes: calculatedDuration,
          timezone: formData.timezone
        }
      };

      if (editingWebinar) {
        await updateWebinar(editingWebinar.id, payload);
        message.success('Webinar updated successfully!');
      } else {
        await createWebinar(payload);
        message.success('New live webinar published successfully!');
      }

      setIsFormOpen(false);
      await loadWebinars();
    } catch (err) {
      message.error(err.message || 'Failed to save webinar configuration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Webinar
  const handleDeleteWebinar = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this webinar?')) {
      setDeletingId(id);
      try {
        await deleteWebinar(id);
        message.success('Webinar deleted successfully.');
        await loadWebinars();
      } catch (err) {
        message.error('Failed to delete webinar.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Copy Meeting Link
  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    message.success('Meeting link copied to clipboard!');
  };

  // Toggle Homepage Ad Banner
  const handleToggleAd = async (webinar) => {
    try {
      const newStatus = !webinar.isFeaturedAd;
      await updateWebinar(webinar.id, { isFeaturedAd: newStatus });
      message.success(`Webinar ${newStatus ? 'featured on' : 'removed from'} main homepage banner!`);
      await loadWebinars();
    } catch (err) {
      message.error('Failed to update banner status.');
    }
  };

  // Handle Onboarding Status Update
  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      await updateApplicationStatus(applicantId, newStatus);
      message.success(`Application marked as "${newStatus}"`);
      await loadOnboarding();
      if (selectedApplicant && selectedApplicant.id === applicantId) {
        setSelectedApplicant((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      message.error('Failed to update application status.');
    }
  };

  // Handle Delete Onboarding Application
  const handleDeleteOnboarding = async (id) => {
    if (window.confirm('Are you sure you want to delete this student onboarding record?')) {
      setIsDeletingOnboardingId(id);
      try {
        await deleteApplication(id);
        message.success('Onboarding application deleted.');
        if (selectedApplicant && selectedApplicant.id === id) {
          setSelectedApplicant(null);
        }
        await loadOnboarding();
      } catch (err) {
        message.error('Failed to delete application.');
      } finally {
        setIsDeletingOnboardingId(null);
      }
    }
  };

  // Filter Webinars
  const filteredWebinars = webinars.filter((w) => {
    const status = getWebinarStatus(w);
    if (selectedTab === 'Upcoming') return status === 'Upcoming';
    if (selectedTab === 'Live') return status === 'Live';
    if (selectedTab === 'Completed') return status === 'Completed';
    return true;
  });

  // Onboarding records filtered by Date Range & Search query (contextually scoped dataset)
  const scopedOnboarding = onboardingList.filter((app) => {
    // Search Query Filter
    if (onboardingSearch.trim()) {
      const q = onboardingSearch.toLowerCase();
      const matchName = (app.name || '').toLowerCase().includes(q);
      const matchEmail = (app.email || '').toLowerCase().includes(q);
      const matchPhone = (app.phone || '').toLowerCase().includes(q);
      const matchAppNo = (app.applicationNumber || '').toLowerCase().includes(q);
      const matchNat = (app.nationality || '').toLowerCase().includes(q);
      const matchPurp = (app.purposeOfJoining || '').toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchAppNo && !matchNat && !matchPurp) {
        return false;
      }
    }
    // Date Range Filter (From - To)
    if (dateRange && dateRange[0] && dateRange[1]) {
      const rawDate = app.submittedAt || (app.id && app.id.startsWith('onboard-') ? parseInt(app.id.replace('onboard-', ''), 10) : 0);
      const appDate = new Date(rawDate);
      const fromDate = dateRange[0].startOf('day').toDate();
      const toDate = dateRange[1].endOf('day').toDate();
      if (appDate < fromDate || appDate > toDate) {
        return false;
      }
    }
    return true;
  });

  // Filter Onboarding Applications (including status tab)
  const filteredOnboarding = scopedOnboarding.filter((app) => {
    const currentStatus = app.status || 'Pending Verification';
    if (onboardingTab !== 'All' && currentStatus !== onboardingTab) {
      return false;
    }
    return true;
  });

  // Pagination (10 records per page)
  const pageSize = 10;
  const paginatedOnboarding = filteredOnboarding.slice(
    (onboardingPage - 1) * pageSize,
    onboardingPage * pageSize
  );

  // Calculations & Counts for KPIs dynamically based on active filters
  const totalWebinars = webinars.length;
  const liveCount = webinars.filter((w) => getWebinarStatus(w) === 'Live').length;

  const activeDatasetForKpis = onboardingTab === 'All' ? scopedOnboarding : filteredOnboarding;
  const totalOnboardingCount = activeDatasetForKpis.length;
  const pendingOnboardingCount = activeDatasetForKpis.filter((a) => (a.status || 'Pending Verification') === 'Pending Verification').length;
  const verifiedOnboardingCount = activeDatasetForKpis.filter((a) => a.status === 'Verified / Enrolled').length;
  const totalOnboardingFees = activeDatasetForKpis.reduce((acc, a) => acc + (Number(a.amountPaid) || 500), 0);

  if (!isLoggedIn) {
    return (
      <div className="admin-webinars-page section-padding" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: '440px' }}>
          <TiltCard className="glass-panel" maxTilt={6} style={{ padding: '36px 28px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(232, 167, 16, 0.15)',
              border: '2px solid var(--mango-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: '28px',
              color: 'var(--mango-yellow)'
            }}>
              <LockOutlined />
            </div>

            <h2 className="gradient-title-green" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
              Admin Portal Access
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Please enter admin credentials to access the Webinar &amp; Onboarding Control Center.
            </p>

            {loginError && (
              <div style={{
                background: 'rgba(232, 167, 16, 0.12)',
                border: '1px solid rgba(232, 167, 16, 0.35)',
                color: 'var(--mango-yellow)',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginBottom: '18px'
              }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div className="form-group">
                <label>Admin Email</label>
                <input
                  type="email"
                  required
                  placeholder="admin@samsculinary.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn-primary btn-mango" style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}>
                <LockOutlined />
                <span>Unlock Control Center</span>
              </button>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <HomeOutlined />
                  <span>Return to Main Website</span>
                </Link>
              </div>
            </form>
          </TiltCard>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-webinars-page section-padding">
      <div className="container">
        
        {/* Top Header Title Bar */}
        <div className="admin-header-row" style={{ marginBottom: '20px' }}>
          <div>
            <div className="admin-badge">
              <LockOutlined style={{ color: 'var(--mango-yellow)' }} />
              <span>ACADEMY CONTROL CENTER</span>
            </div>
            <h1 className="section-title gradient-title-green" style={{ fontSize: '2.2rem', marginBottom: '4px' }}>
              Sam&apos;s Administration Hub
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Manage student onboarding registrations, live webinars, Google Meet links, and attendee rosters.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/" className="btn-outline" style={{ borderColor: 'var(--border-medium)', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
              <HomeOutlined />
              <span>View Website</span>
            </Link>

            {adminSection === 'webinars' ? (
              <button onClick={handleOpenCreate} className="btn-primary btn-mango">
                <PlusOutlined />
                <span>Create Webinar</span>
              </button>
            ) : (
              <button onClick={() => exportOnboardingToCSV(filteredOnboarding)} className="btn-primary" style={{ background: '#1D6F42', borderColor: '#1D6F42' }}>
                <FileExcelOutlined />
                <span>Export CSV ({filteredOnboarding.length})</span>
              </button>
            )}
            <button onClick={handleAdminLogout} className="btn-outline" style={{ borderColor: 'var(--border-medium)' }}>
              <LogoutOutlined />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Major Section Switcher Tabs */}
        <div className="admin-major-tabs-nav">
          <button
            type="button"
            onClick={() => setAdminSection('onboarding')}
            className={`admin-major-tab-btn ${adminSection === 'onboarding' ? 'active' : ''}`}
          >
            <FormOutlined className="tab-icon" />
            <span>Student Onboarding Responses</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminSection('webinars')}
            className={`admin-major-tab-btn ${adminSection === 'webinars' ? 'active' : ''}`}
          >
            <VideoCameraOutlined className="tab-icon" />
            <span>Live Webinars Hub</span>
          </button>
        </div>

        {/* SECTION 1: WEBINARS MANAGEMENT */}
        {adminSection === 'webinars' && (
          <div className="webinars-admin-pane animate-fade-in">
            {/* In-Line Form Panel */}
            {isFormOpen && (
              <div ref={formRef} className="admin-form-panel glass-panel" style={{ padding: '28px', margin: '0 0 32px 0', border: '1px solid var(--mango-yellow)', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--mango-yellow)' }}>
                    {editingWebinar ? 'Edit Webinar Configuration' : 'Create New Live Webinar'}
                  </h3>
                  <button onClick={() => setIsFormOpen(false)} className="btn-outline" style={{ padding: '4px 14px' }}>
                    <CloseOutlined /> Cancel &amp; Close
                  </button>
                </div>

                <form onSubmit={handleSaveForm} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div className="form-group">
                      <label>Webinar Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Masterclass: South Indian Biryani & Salan"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="form-input"
                      >
                        <option value="South Indian">South Indian</option>
                        <option value="North Indian">North Indian</option>
                        <option value="Baking & Pastry">Baking &amp; Pastry</option>
                        <option value="International">International</option>
                        <option value="Desserts & Sweets">Desserts &amp; Sweets</option>
                        <option value="Preservation & Pickles">Preservation &amp; Pickles</option>
                        <option value="Health & Diabetic">Health &amp; Diabetic</option>
                        <option value="Smart Cooking">Smart Cooking</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Tagline / Catchphrase</label>
                    <input
                      type="text"
                      placeholder="e.g. Learn secret dum techniques and salan balance directly from Master Chef."
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  {/* Instructor Selector */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div className="form-group">
                      <label>Select Instructor / Tutor</label>
                      <select
                        value={formData.instructorName}
                        onChange={(e) => handleTutorSelect(e.target.value)}
                        className="form-input"
                      >
                        {TUTORS.map((t) => (
                          <option key={t.name} value={t.name}>{t.name} ({t.role})</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img src={formData.instructorAvatar} alt="Tutor avatar preview" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--mango-yellow)' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{formData.instructorName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formData.instructorRole}</div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div className="form-group">
                      <label>Webinar Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Start Time (24h) *</label>
                      <input
                        type="time"
                        required
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>End Time (24h) *</label>
                      <input
                        type="time"
                        required
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Meeting URL */}
                  <div className="form-group">
                    <label>Google Meet / Live Stream Link *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://meet.google.com/abc-defg-hij"
                      value={formData.meetingUrl}
                      onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  {/* Banner Image */}
                  <div className="form-group">
                    <label>Banner Image (URL or Local Upload)</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.bannerUrl}
                        onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                        className="form-input"
                        style={{ flex: 1, minWidth: '220px' }}
                      />
                      <label className="btn-outline" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', margin: 0, padding: '10px 16px' }}>
                        <UploadOutlined />
                        <span>Upload File</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  {/* Featured Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(232, 167, 16, 0.08)', borderRadius: '10px', border: '1px solid rgba(232, 167, 16, 0.2)' }}>
                    <input
                      type="checkbox"
                      id="featAd"
                      checked={formData.isFeaturedAd}
                      onChange={(e) => setFormData({ ...formData, isFeaturedAd: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--mango-yellow)', cursor: 'pointer' }}
                    />
                    <label htmlFor="featAd" style={{ margin: 0, cursor: 'pointer', fontWeight: '600' }}>
                      Show this webinar in the Homepage Featured Hero Banner
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                    <button type="button" onClick={() => setIsFormOpen(false)} className="btn-outline">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="btn-primary btn-mango">
                      {isSubmitting ? <LoadingOutlined spin /> : <CheckCircleOutlined />}
                      <span>{editingWebinar ? 'Update Webinar' : 'Publish Webinar'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Metrics Grid */}
            <div className="admin-metrics-grid" style={{ margin: '0 0 28px 0' }}>
              <TiltCard className="metric-card glass-panel" maxTilt={8}>
                <div className="metric-icon" style={{ background: 'rgba(25, 65, 33, 0.1)', color: 'var(--green-primary)' }}>
                  <VideoCameraOutlined />
                </div>
                <div>
                  <span className="metric-val">{totalWebinars}</span>
                  <span className="metric-lbl">Total Webinars</span>
                </div>
              </TiltCard>

              <TiltCard className="metric-card glass-panel" maxTilt={8}>
                <div className="metric-icon" style={{ background: 'rgba(232, 167, 16, 0.15)', color: 'var(--mango-yellow)' }}>
                  <FireFilled />
                </div>
                <div>
                  <span className="metric-val">{liveCount}</span>
                  <span className="metric-lbl">Live Now Sessions</span>
                </div>
              </TiltCard>
            </div>

            {/* Webinars Table */}
            <div className="admin-table-container glass-panel" style={{ padding: '24px' }}>
              <div className="admin-tabs-row" style={{ marginBottom: '20px' }}>
                {['All', 'Upcoming', 'Live', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`admin-tab-btn ${selectedTab === tab ? 'active' : ''}`}
                  >
                    {tab}
                    <span className="tab-count-badge">
                      {webinars.filter((w) => {
                        const status = getWebinarStatus(w);
                        if (tab === 'Upcoming') return status === 'Upcoming';
                        if (tab === 'Live') return status === 'Live';
                        if (tab === 'Completed') return status === 'Completed';
                        return true;
                      }).length}
                    </span>
                  </button>
                ))}
              </div>

              {filteredWebinars.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  <VideoCameraOutlined style={{ fontSize: '36px', opacity: 0.5 }} />
                  <p style={{ marginTop: '12px' }}>No webinars found in "{selectedTab}" view.</p>
                </div>
              ) : (
                <div className="admin-table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Webinar Info</th>
                        <th>Category</th>
                        <th>Schedule &amp; Time</th>
                        <th>Ad Banner</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredWebinars.map((webinar) => (
                        <tr key={webinar.id}>
                          <td>
                            <div className="table-webinar-info">
                              <img src={webinar.bannerUrl || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop'} alt={webinar.title} className="table-webinar-thumb" />
                              <div>
                                <h5 className="table-webinar-title">{webinar.title}</h5>
                                <span className="table-instructor-name">by {webinar.instructor?.name || 'Chef Instructor'}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge badge-category-sm">{webinar.category || 'Culinary'}</span>
                          </td>
                          <td>
                            <div style={{ fontSize: '0.85rem' }}>
                              <div>
                                <CalendarOutlined style={{ marginRight: '4px' }} />
                                {webinar.schedule?.startTime ? new Date(webinar.schedule.startTime).toLocaleDateString() : (webinar.startDate || 'TBA')}
                              </div>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                                <ClockCircleOutlined style={{ marginRight: '4px' }} />
                                {webinar.schedule?.startTime ? new Date(webinar.schedule.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (webinar.startTime || '11:00 AM')}
                              </div>
                            </div>
                          </td>
                          <td>
                            <button
                              onClick={() => handleToggleAd(webinar)}
                              className={`btn-toggle-ad ${webinar.isFeaturedAd ? 'active' : ''}`}
                              title="Toggle homepage advertisement banner"
                            >
                              <FireFilled />
                              <span>{webinar.isFeaturedAd ? 'Featured' : 'Standard'}</span>
                            </button>
                          </td>
                          <td>
                            <span style={{ 
                              fontWeight: '700', 
                              fontSize: '0.88rem',
                              color: getWebinarStatus(webinar) === 'Live' ? 'var(--mango-yellow)' : getWebinarStatus(webinar) === 'Upcoming' ? 'var(--green-primary)' : 'var(--text-muted)' 
                            }}>
                              {getWebinarStatus(webinar)}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions-cell">
                              <button onClick={() => handleOpenEdit(webinar)} className="action-btn" title="Edit Webinar">
                                <EditOutlined />
                              </button>
                              <button onClick={() => handleCopyLink(webinar.meetingUrl)} className="action-btn" title="Copy Google Meet Link">
                                <CopyOutlined />
                              </button>
                              <a href={webinar.meetingUrl} target="_blank" rel="noopener noreferrer" className="action-btn" title="Test Launch Meeting Link">
                                <LinkOutlined />
                              </a>
                              <button onClick={() => handleDeleteWebinar(webinar.id)} disabled={deletingId === webinar.id} className="action-btn btn-danger" title="Delete Webinar">
                                {deletingId === webinar.id ? <LoadingOutlined spin /> : <DeleteOutlined />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 2: STUDENT ONBOARDING RESPONSES */}
        {adminSection === 'onboarding' && (
          <div className="onboarding-admin-pane animate-fade-in">
            {/* Summary Metrics */}
            <div className="admin-metrics-grid" style={{ margin: '0 0 28px 0', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <TiltCard className="metric-card glass-panel" maxTilt={8}>
                <div className="metric-icon" style={{ background: 'rgba(232, 167, 16, 0.15)', color: 'var(--mango-yellow)' }}>
                  <FormOutlined />
                </div>
                <div>
                  <span className="metric-val">{totalOnboardingCount}</span>
                  <span className="metric-lbl">Total Applications</span>
                </div>
              </TiltCard>

              <TiltCard className="metric-card glass-panel" maxTilt={8}>
                <div className="metric-icon" style={{ background: 'rgba(255, 77, 79, 0.15)', color: '#ff4d4f' }}>
                  <ClockCircleOutlined />
                </div>
                <div>
                  <span className="metric-val">{pendingOnboardingCount}</span>
                  <span className="metric-lbl">Pending Verification</span>
                </div>
              </TiltCard>

              <TiltCard className="metric-card glass-panel" maxTilt={8}>
                <div className="metric-icon" style={{ background: 'rgba(52, 199, 89, 0.15)', color: 'var(--green-primary)' }}>
                  <CheckCircleOutlined />
                </div>
                <div>
                  <span className="metric-val">{verifiedOnboardingCount}</span>
                  <span className="metric-lbl">Verified / Enrolled</span>
                </div>
              </TiltCard>

              <TiltCard className="metric-card glass-panel" maxTilt={8}>
                <div className="metric-icon" style={{ background: 'rgba(232, 167, 16, 0.15)', color: 'var(--mango-yellow)' }}>
                  <DollarOutlined />
                </div>
                <div>
                  <span className="metric-val">₹{totalOnboardingFees}</span>
                  <span className="metric-lbl">Total Reg. Fees (₹500/ea)</span>
                </div>
              </TiltCard>
            </div>

            {/* Applications Table Card */}
            <div className="admin-table-container glass-panel" style={{ padding: '24px' }}>
              {/* Header Search & Filter Bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                {/* Row 1: Status Tabs */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div className="admin-tabs-row" style={{ margin: 0 }}>
                    {['All', 'Pending Verification', 'Verified / Enrolled', 'Follow-up'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setOnboardingTab(tab)}
                        className={`admin-tab-btn ${onboardingTab === tab ? 'active' : ''}`}
                      >
                        {tab}
                        <span className="tab-count-badge">
                          {tab === 'All'
                            ? scopedOnboarding.length
                            : scopedOnboarding.filter((a) => (a.status || 'Pending Verification') === tab).length}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Showing <strong>{filteredOnboarding.length}</strong> of <strong>{onboardingList.length}</strong> total submissions
                  </div>
                </div>

                {/* Row 2: Search Bar, Date Range Filter & Actions - Full Width Single Row */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'nowrap', width: '100%', overflowX: 'auto', paddingBottom: '4px' }}>
                  
                  {/* Ant Design Date Range Filter (From / To) - Wide enough so dates never clip */}
                  <ConfigProvider
                    theme={{
                      algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                      token: {
                        colorPrimary: '#e8a710',
                        colorBgContainer: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                        colorBorder: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : '#cbd5e1',
                        colorText: isDarkMode ? '#ffffff' : '#1a241c',
                        colorTextPlaceholder: isDarkMode ? 'rgba(255, 255, 255, 0.45)' : '#64748b',
                        borderRadius: 8,
                        controlHeight: 38
                      }
                    }}
                  >
                    <DatePicker.RangePicker
                      value={dateRange}
                      onChange={(dates) => { setDateRange(dates); setOnboardingPage(1); }}
                      placeholder={['From Date', 'To Date']}
                      format="YYYY-MM-DD"
                      allowClear
                      style={{
                        height: '38px',
                        background: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#ffffff',
                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : '#cbd5e1',
                        color: isDarkMode ? '#ffffff' : '#1a241c',
                        width: '260px',
                        minWidth: '250px',
                        flexShrink: 0
                      }}
                    />
                  </ConfigProvider>

                  {/* Status Dropdown Filter */}
                  <select
                    value={onboardingTab}
                    onChange={(e) => { setOnboardingTab(e.target.value); setOnboardingPage(1); }}
                    className="form-input"
                    style={{
                      height: '38px',
                      padding: '0 12px',
                      borderRadius: '8px',
                      background: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#ffffff',
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : '#cbd5e1',
                      color: isDarkMode ? '#ffffff' : '#1a241c',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      width: 'auto',
                      minWidth: '160px',
                      maxWidth: '190px',
                      flexShrink: 0,
                      fontWeight: '600'
                    }}
                  >
                    <option value="All" style={{ background: isDarkMode ? '#141c16' : '#ffffff', color: isDarkMode ? '#ffffff' : '#1a241c' }}>All Statuses ({scopedOnboarding.length})</option>
                    <option value="Pending Verification" style={{ background: isDarkMode ? '#141c16' : '#ffffff', color: isDarkMode ? '#ffffff' : '#dc2626' }}>
                      Pending ({scopedOnboarding.filter(a => (a.status || 'Pending Verification') === 'Pending Verification').length})
                    </option>
                    <option value="Verified / Enrolled" style={{ background: isDarkMode ? '#141c16' : '#ffffff', color: isDarkMode ? '#ffffff' : '#16a34a' }}>
                      Verified ({scopedOnboarding.filter(a => a.status === 'Verified / Enrolled').length})
                    </option>
                    <option value="Follow-up" style={{ background: isDarkMode ? '#141c16' : '#ffffff', color: isDarkMode ? '#ffffff' : '#d97706' }}>
                      Follow-up ({scopedOnboarding.filter(a => a.status === 'Follow-up').length})
                    </option>
                  </select>

                  {/* Search Input - Extends full remaining row width */}
                  <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '180px' }}>
                    <SearchOutlined style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Search student, phone, email, app no..."
                      value={onboardingSearch}
                      onChange={(e) => setOnboardingSearch(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '34px', fontSize: '0.88rem', height: '38px', width: '100%' }}
                    />
                  </div>

                  <button onClick={loadOnboarding} className="btn-outline" title="Refresh Application Data" style={{ padding: '8px 12px', height: '38px', flexShrink: 0 }}>
                    <ReloadOutlined spin={isLoadingOnboarding} />
                  </button>

                  <a href="/onboarding" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', height: '38px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                    <EyeOutlined />
                    <span>View Form</span>
                  </a>
                </div>
              </div>

              {/* Table List */}
              {filteredOnboarding.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
                  <FormOutlined style={{ fontSize: '42px', opacity: 0.4, color: 'var(--mango-yellow)' }} />
                  <h4 style={{ marginTop: '14px', fontSize: '1.1rem' }}>No onboarding applications found</h4>
                  <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '6px auto 16px' }}>
                    {onboardingSearch ? 'No submissions match your search filter.' : 'Student submissions from the onboarding page will appear here automatically.'}
                  </p>
                  <a href="/onboarding" target="_blank" rel="noopener noreferrer" className="btn-primary btn-mango">
                    Open Onboarding Page
                  </a>
                </div>
              ) : (
                <>
                  <div className="admin-table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Application No</th>
                          <th>Date</th>
                          <th>Student Name</th>
                          <th>Contact Details</th>
                          <th>Payment / Proof</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedOnboarding.map((app) => (
                          <tr key={app.id}>
                            {/* App Number */}
                            <td>
                              <strong style={{ color: isDarkMode ? 'var(--mango-yellow)' : '#b45309', fontSize: '0.92rem', letterSpacing: '0.3px' }}>
                                {app.applicationNumber || app.id}
                              </strong>
                            </td>

                            {/* Date (Separate Column) */}
                            <td>
                              <div style={{ fontSize: '0.84rem', color: isDarkMode ? 'var(--text-muted)' : '#475569', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', fontWeight: '500' }}>
                                <CalendarOutlined style={{ color: isDarkMode ? 'var(--mango-yellow)' : '#d97706' }} />
                                <span>{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A'}</span>
                              </div>
                            </td>

                            {/* Student Name */}
                            <td>
                              <strong style={{ fontSize: '0.95rem', color: isDarkMode ? 'var(--text-white)' : 'var(--text-dark)' }}>{app.name}</strong>
                            </td>

                            {/* Contact Details */}
                            <td>
                              <div style={{ fontSize: '0.85rem' }}>
                                <a
                                  href={`https://wa.me/${(app.phone || '').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(app.name)}!%20Greetings%20from%20Sam's%20Culinary%20Art%20Classes.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: isDarkMode ? '#25D366' : '#15803d', textDecoration: 'none', fontWeight: '700' }}
                                  title="Chat on WhatsApp"
                                >
                                  <WhatsAppOutlined />
                                  <span>{app.phone}</span>
                                </a>
                                <div style={{ fontSize: '0.78rem', color: isDarkMode ? 'var(--text-muted)' : '#64748b', marginTop: '2px' }}>
                                  <MailOutlined style={{ marginRight: '4px' }} />
                                  <a href={`mailto:${app.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{app.email}</a>
                                </div>
                              </div>
                            </td>

                            {/* Payment / Proof */}
                            <td>
                              <div style={{ fontSize: '0.85rem' }}>
                                <strong style={{ color: isDarkMode ? '#22c55e' : '#15803d', fontWeight: '800', fontSize: '0.95rem' }}>₹{app.amountPaid || 500}</strong>
                                {app.proofImageUrl ? (
                                  <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <a href={app.proofImageUrl} target="_blank" rel="noopener noreferrer" title="Click to view full payment screenshot">
                                      <img
                                        src={app.proofImageUrl}
                                        alt="Payment proof thumb"
                                        style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '6px', border: isDarkMode ? '1px solid var(--mango-yellow)' : '1.5px solid #d97706', cursor: 'pointer' }}
                                      />
                                    </a>
                                    <span style={{ fontSize: '0.72rem', color: isDarkMode ? 'var(--mango-yellow)' : '#b45309', fontWeight: '600' }}>Proof attached</span>
                                  </div>
                                ) : (
                                  <div style={{ fontSize: '0.72rem', color: isDarkMode ? 'var(--text-muted)' : '#64748b', marginTop: '2px' }}>
                                    {app.bankDetails ? `Ref: ${app.bankDetails}` : 'No image'}
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* Status Dropdown */}
                            <td>
                              <select
                                value={app.status || 'Pending Verification'}
                                onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                style={{
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.82rem',
                                  fontWeight: '700',
                                  border: '1.5px solid',
                                  cursor: 'pointer',
                                  background: isDarkMode
                                    ? (app.status === 'Verified / Enrolled' ? 'rgba(34, 197, 94, 0.15)' : app.status === 'Follow-up' ? 'rgba(232, 167, 16, 0.15)' : 'rgba(255, 77, 79, 0.15)')
                                    : (app.status === 'Verified / Enrolled' ? '#f0fdf4' : app.status === 'Follow-up' ? '#fffbeb' : '#fef2f2'),
                                  color: isDarkMode
                                    ? (app.status === 'Verified / Enrolled' ? '#22c55e' : app.status === 'Follow-up' ? 'var(--mango-yellow)' : '#ff7875')
                                    : (app.status === 'Verified / Enrolled' ? '#16a34a' : app.status === 'Follow-up' ? '#d97706' : '#dc2626'),
                                  borderColor: isDarkMode
                                    ? (app.status === 'Verified / Enrolled' ? '#22c55e' : app.status === 'Follow-up' ? 'var(--mango-yellow)' : '#ff7875')
                                    : (app.status === 'Verified / Enrolled' ? '#86efac' : app.status === 'Follow-up' ? '#fde68a' : '#fca5a5')
                                }}
                              >
                                <option value="Pending Verification" style={{ background: isDarkMode ? '#141c16' : '#ffffff', color: isDarkMode ? '#ffffff' : '#dc2626' }}>Pending</option>
                                <option value="Verified / Enrolled" style={{ background: isDarkMode ? '#141c16' : '#ffffff', color: isDarkMode ? '#ffffff' : '#16a34a' }}>Verified / Enrolled</option>
                                <option value="Follow-up" style={{ background: isDarkMode ? '#141c16' : '#ffffff', color: isDarkMode ? '#ffffff' : '#d97706' }}>Follow-up</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td>
                              <div className="table-actions-cell">
                                <button onClick={() => setSelectedApplicant(app)} className="action-btn" title="View Full Application Details">
                                  <EyeOutlined />
                                </button>
                                <a
                                  href={`https://wa.me/${(app.phone || '').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(app.name)}!%20Regarding%20your%20admission%20application%20(${app.applicationNumber})%20at%20Sam's%20Culinary%20Art%20Class.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="action-btn"
                                  style={{ color: '#25D366' }}
                                  title="Direct WhatsApp Student"
                                >
                                  <WhatsAppOutlined />
                                </a>
                                <button
                                  onClick={() => handleDeleteOnboarding(app.id)}
                                  disabled={isDeletingOnboardingId === app.id}
                                  className="action-btn btn-danger"
                                  title="Delete Record"
                                >
                                  {isDeletingOnboardingId === app.id ? <LoadingOutlined spin /> : <DeleteOutlined />}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                {filteredOnboarding.length > pageSize && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <ConfigProvider
                      theme={{
                        algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                        token: {
                          colorPrimary: '#e8a710',
                          colorBgContainer: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                          colorText: isDarkMode ? '#ffffff' : '#1a241c'
                        }
                      }}
                    >
                      <Pagination
                        current={onboardingPage}
                        pageSize={pageSize}
                        total={filteredOnboarding.length}
                        onChange={(page) => {
                          setOnboardingPage(page);
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        showSizeChanger={false}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} applications`}
                      />
                    </ConfigProvider>
                  </div>
                )}
              </>
            )}
            </div>
          </div>
        )}

      </div>

      {/* APPLICANT FULL DETAILS ANTD MODAL */}
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: '#e8a710',
            colorBgElevated: isDarkMode ? '#141c16' : '#ffffff',
            colorBorderSecondary: isDarkMode ? 'rgba(232, 167, 16, 0.3)' : 'rgba(25, 65, 33, 0.15)',
            colorText: isDarkMode ? '#ffffff' : '#1a241c',
            borderRadiusLG: 16
          }
        }}
      >
        <Modal
          open={!!selectedApplicant}
          onCancel={() => setSelectedApplicant(null)}
          footer={null}
          centered
          width={720}
          title={
            selectedApplicant && (
              <div style={{ paddingRight: '24px', paddingBottom: '4px' }}>
                <span className="badge badge-success" style={{ fontSize: '0.75rem', marginBottom: '6px' }}>
                  {selectedApplicant.status || 'Pending Verification'}
                </span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '1.4rem', color: isDarkMode ? 'var(--mango-yellow)' : '#194121' }}>
                  {selectedApplicant.name}
                </h3>
              </div>
            )
          }
        >
          {selectedApplicant && (
            <div style={{ paddingTop: '8px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', fontSize: '0.9rem', marginBottom: '20px' }}>
                <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: isDarkMode ? 0.7 : 0.85, color: isDarkMode ? 'inherit' : '#64748b', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Application Number</span>
                  <strong style={{ color: isDarkMode ? 'var(--mango-yellow)' : '#b45309', fontSize: '1rem' }}>{selectedApplicant.applicationNumber || selectedApplicant.id}</strong>
                </div>

                <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: isDarkMode ? 0.7 : 0.85, color: isDarkMode ? 'inherit' : '#64748b', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Submission Date</span>
                  <strong style={{ color: isDarkMode ? '#ffffff' : '#1a241c' }}>{selectedApplicant.submittedAt ? new Date(selectedApplicant.submittedAt).toLocaleString() : 'N/A'}</strong>
                </div>

                <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: isDarkMode ? 0.7 : 0.85, color: isDarkMode ? 'inherit' : '#64748b', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Phone / WhatsApp</span>
                  <strong style={{ color: isDarkMode ? '#25D366' : '#15803d' }}>{selectedApplicant.phone}</strong>
                </div>

                <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: isDarkMode ? 0.7 : 0.85, color: isDarkMode ? 'inherit' : '#64748b', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Email</span>
                  <strong style={{ color: isDarkMode ? '#ffffff' : '#1a241c' }}>{selectedApplicant.email}</strong>
                </div>

                <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: isDarkMode ? 0.7 : 0.85, color: isDarkMode ? 'inherit' : '#64748b', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Father&apos;s Name</span>
                  <strong style={{ color: isDarkMode ? '#ffffff' : '#1a241c' }}>{selectedApplicant.fatherName || 'N/A'}</strong>
                </div>

                <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: isDarkMode ? 0.7 : 0.85, color: isDarkMode ? 'inherit' : '#64748b', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Mother&apos;s Name</span>
                  <strong style={{ color: isDarkMode ? '#ffffff' : '#1a241c' }}>{selectedApplicant.motherName || 'N/A'}</strong>
                </div>

                <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: isDarkMode ? 0.7 : 0.85, color: isDarkMode ? 'inherit' : '#64748b', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Nationality</span>
                  <strong style={{ color: isDarkMode ? '#ffffff' : '#1a241c' }}>{selectedApplicant.nationality || 'Indian'}</strong>
                </div>

                <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: isDarkMode ? 0.7 : 0.85, color: isDarkMode ? 'inherit' : '#64748b', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Registration Fee</span>
                  <strong style={{ color: isDarkMode ? '#22c55e' : '#15803d', fontSize: '1.05rem', fontWeight: '700' }}>₹{selectedApplicant.amountPaid || 500}</strong>
                </div>

                <div style={{ gridColumn: '1 / -1', background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: isDarkMode ? 0.7 : 0.85, color: isDarkMode ? 'inherit' : '#64748b', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Residential Address</span>
                  <p style={{ margin: '4px 0 0 0', lineHeight: '1.5', color: isDarkMode ? '#ffffff' : '#1a241c' }}>{selectedApplicant.address}</p>
                </div>

                <div style={{ gridColumn: '1 / -1', background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: isDarkMode ? 0.7 : 0.85, color: isDarkMode ? 'inherit' : '#64748b', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>Purpose of Joining</span>
                  <p style={{ margin: '4px 0 0 0', lineHeight: '1.5', color: isDarkMode ? '#ffffff' : '#1a241c' }}>{selectedApplicant.purposeOfJoining}</p>
                </div>

                {selectedApplicant.bankDetails && (
                  <div style={{ gridColumn: '1 / -1', background: isDarkMode ? 'rgba(232, 167, 16, 0.08)' : '#fffbeb', border: isDarkMode ? '1px solid rgba(232, 167, 16, 0.25)' : '1.5px solid #fde68a', padding: '12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: isDarkMode ? 'var(--mango-yellow)' : '#b45309', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Bank / Payment Reference</span>
                    <p style={{ margin: '4px 0 0 0', fontWeight: '700', color: isDarkMode ? 'var(--mango-yellow)' : '#92400e' }}>{selectedApplicant.bankDetails}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: isDarkMode ? '1px solid var(--border-color)' : '1px solid #e2e8f0', paddingTop: '16px', marginTop: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedApplicant.id, 'Verified / Enrolled')}
                    className="btn-primary"
                    style={{ background: 'var(--green-primary)', borderColor: 'var(--green-primary)', padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    <CheckOutlined /> Mark Verified
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedApplicant.id, 'Follow-up')}
                    className="btn-outline"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    Mark Follow-up
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={`https://wa.me/${(selectedApplicant.phone || '').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(selectedApplicant.name)}!%20Regarding%20your%20admission%20application%20(${selectedApplicant.applicationNumber})%20at%20Sam's%20Culinary%20Art%20Class.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ background: '#25D366', borderColor: '#25D366', color: '#fff', padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    <WhatsAppOutlined />
                    <span>WhatsApp Student</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </ConfigProvider>

    </div>
  );
}
