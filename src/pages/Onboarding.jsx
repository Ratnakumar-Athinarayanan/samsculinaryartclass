import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  TeamOutlined,
  GlobalOutlined,
  AimOutlined,
  CreditCardOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  CopyOutlined,
  PrinterOutlined,
  MessageOutlined,
  LoadingOutlined,
  SmileOutlined,
  HeartOutlined,
  BookOutlined,
  TrophyOutlined,
  UploadOutlined,
  PictureOutlined,
  DeleteOutlined,
  FileImageOutlined,
  CloudUploadOutlined,
  EyeOutlined,
  BankOutlined,
  QrcodeOutlined,
  WhatsAppOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import useSEO from '../hooks/useSEO';
import TiltCard from '../components/TiltCard';
import { submitOnboardingForm, uploadImageToCloudinary } from '../services/onboardingService';

export default function Onboarding() {
  useSEO({
    title: "Student Onboarding & Registration Form - Sam's Culinary Art Classes",
    description: "Official student onboarding and registration for Sam's Culinary Art Classes. Register for professional diploma, home cooking, baking, and culinary masterclasses.",
    keywords: "student onboarding, culinary class registration, cookery admission, baking registration, sam's culinary art classes"
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Cloudinary image upload state
  const [proofPreview, setProofPreview] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    fatherName: '',
    motherName: '',
    nationality: 'Indian',
    purposeOfJoining: '',
    bankDetails: '',
    amountPaid: 500,
    proofImageUrl: ''
  });

  const [errors, setErrors] = useState({});

  const PURPOSE_OPTIONS = [
    'Start My Own Bakery / Food Business',
    'Career & Professional Chef Training',
    'Enhance Home Cooking & Culinary Passion',
    'Learn Traditional & Heritage Recipes',
    'Fireless & Smart Cooking Mastery',
    'Other Special Interest'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Image Upload to Cloudinary Handler
  const handleProofImageChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      message.error('File size too large. Please select an image under 10MB.');
      return;
    }

    // Set local immediate preview
    const localUrl = URL.createObjectURL(file);
    setProofPreview(localUrl);
    setErrors((prev) => ({ ...prev, proofImage: '' }));
    setIsUploadingImage(true);

    try {
      // Upload directly via backend service
      const cdnUrl = await uploadImageToCloudinary(file);
      setFormData((prev) => ({ ...prev, proofImageUrl: cdnUrl }));
      setErrors((prev) => ({ ...prev, proofImage: '' }));
      message.success('Payment screenshot uploaded successfully!');
    } catch (err) {
      message.warning('Image upload warning. The image preview is saved and will be submitted.');
      // Fallback: convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, proofImageUrl: reader.result }));
        setErrors((prev) => ({ ...prev, proofImage: '' }));
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const removeProofImage = () => {
    setProofPreview('');
    setFormData((prev) => ({ ...prev, proofImageUrl: '' }));
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone / WhatsApp number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid contact number.';
    }
    if (!formData.address.trim()) errs.address = 'Full residential address is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.fatherName.trim()) errs.fatherName = "Father's Name is required.";
    if (!formData.motherName.trim()) errs.motherName = "Mother's Name is required.";
    if (!formData.nationality.trim()) errs.nationality = 'Nationality is required.';
    if (!formData.purposeOfJoining.trim()) errs.purposeOfJoining = 'Please state your purpose of joining.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!formData.bankDetails || !formData.bankDetails.trim()) {
      errs.bankDetails = 'Transaction ID / UPI Reference Number is required.';
    }
    if (!formData.proofImageUrl && !proofPreview) {
      errs.proofImage = 'Payment proof screenshot is required. Please upload your payment screenshot.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      message.error('Please complete all required fields before submitting.');
      return;
    }

    if (isUploadingImage) {
      message.info('Image is still uploading, please wait a moment...');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitOnboardingForm(formData);
      setSubmittedData(result);
      message.success('Registration submitted successfully! Welcome to Sam\'s Culinary Art Class.');
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      message.error(err.message || 'Failed to submit onboarding registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      message.success(`${label} copied to clipboard!`);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      fatherName: '',
      motherName: '',
      nationality: 'Indian',
      purposeOfJoining: '',
      bankDetails: '',
      amountPaid: 500,
      proofImageUrl: ''
    });
    setProofPreview('');
    setSubmittedData(null);
    setCurrentStep(1);
    setErrors({});
  };

  return (
    <div className="onboarding-page-wrapper">
      {/* Hero Banner Section */}
      <section className="page-hero-banner text-center" style={{ padding: '60px 20px 40px', background: 'radial-gradient(circle at top, rgba(232, 167, 16, 0.15) 0%, transparent 70%)' }}>
        <div className="container">
          <div className="hero-pill-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(232, 167, 16, 0.12)', border: '1px solid var(--mango-yellow)', color: 'var(--mango-yellow)', fontSize: '0.85rem', fontWeight: '700', marginBottom: '16px' }}>
            <SafetyCertificateOutlined />
            <span>OFFICIAL STUDENT ENROLLMENT &amp; ONBOARDING</span>
          </div>

          <h1 className="page-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
            Join <span className="gradient-text-gold">Sam&apos;s Culinary Art Class</span>
          </h1>

          <p className="page-subtitle" style={{ maxWidth: '680px', margin: '0 auto 24px', opacity: 0.9, fontSize: '1.05rem', lineHeight: '1.6' }}>
            Complete your registration to access hands-on training, professional chef mentorship, course kits, and recognized certifications.
          </p>

          {/* Academy Highlights Bar */}
          <div className="academy-badges-row" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '10px' }}>
            <span className="badge-pill-item"><TrophyOutlined style={{ color: 'var(--mango-yellow)' }} /> ISO 9001:2015 Certified</span>
            <span className="badge-pill-item"><TeamOutlined style={{ color: 'var(--green-primary)' }} /> 10,000+ Students Trained</span>
            <span className="badge-pill-item"><BookOutlined style={{ color: 'var(--mango-yellow)' }} /> 100% Practical Cooking</span>
          </div>
        </div>
      </section>

      <section className="form-container-section" style={{ padding: '20px 16px 80px' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Success Screen */}
          {submittedData ? (
            <div className="onboarding-success-card">
              <div className="success-icon-wrapper" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(52, 199, 89, 0.15)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 20px' }}>
                <CheckCircleOutlined />
              </div>

              <span className="badge badge-success" style={{ fontSize: '0.9rem', padding: '6px 14px', borderRadius: '20px', marginBottom: '12px', display: 'inline-block' }}>
                APPLICATION SUBMITTED SUCCESSFULLY
              </span>

              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '8px', marginBottom: '8px' }}>
                Welcome to the Culinary Family, {submittedData.name}!
              </h2>

              <p style={{ maxWidth: '600px', margin: '0 auto 24px', opacity: 0.85, fontSize: '1rem', lineHeight: '1.6' }}>
                Your onboarding details and registration information have been recorded securely. Our admissions coordinator will connect with you on WhatsApp shortly with your class schedule.
              </p>

              {/* Receipt Summary Card */}
              <div className="application-slip-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.7, display: 'block' }}>Application Number</span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--mango-yellow)', letterSpacing: '0.5px' }}>{submittedData.applicationNumber}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.7, display: 'block' }}>Date</span>
                    <span style={{ fontSize: '0.9rem' }}>{new Date(submittedData.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '0.9rem' }}>
                  <div><strong style={{ opacity: 0.7 }}>Student Name:</strong> <div>{submittedData.name}</div></div>
                  <div><strong style={{ opacity: 0.7 }}>Email:</strong> <div>{submittedData.email}</div></div>
                  <div><strong style={{ opacity: 0.7 }}>Phone / WhatsApp:</strong> <div>{submittedData.phone}</div></div>
                  <div><strong style={{ opacity: 0.7 }}>Nationality:</strong> <div>{submittedData.nationality}</div></div>
                  <div><strong style={{ opacity: 0.7 }}>Registration Fee:</strong> <div style={{ color: '#22c55e', fontWeight: '700' }}>₹{submittedData.amountPaid}/- (Paid / Submitted)</div></div>
                  <div><strong style={{ opacity: 0.7 }}>Purpose:</strong> <div>{submittedData.purposeOfJoining}</div></div>
                  {submittedData.bankDetails && (
                    <div><strong style={{ opacity: 0.7 }}>Transaction ID / Ref:</strong> <div style={{ color: 'var(--mango-yellow)', fontWeight: '600' }}>{submittedData.bankDetails}</div></div>
                  )}
                  {submittedData.proofImageUrl && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '6px' }}>
                      <strong style={{ opacity: 0.7, display: 'block', marginBottom: '4px' }}>Payment Proof:</strong>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={submittedData.proofImageUrl}
                          alt="Proof attachment"
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                        />
                        <a
                          href={submittedData.proofImageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--mango-yellow)', fontSize: '0.85rem', textDecoration: 'underline' }}
                        >
                          View Payment Screenshot
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Immediate WhatsApp Notification Note */}
              <div className="whatsapp-notice-card">
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.2)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                  <WhatsAppOutlined />
                </div>
                <div>
                  <strong className="notice-title">
                    Payment Completed? Let us know immediately!
                  </strong>
                  <span className="notice-desc">
                    You have submitted your payment details. Click <strong>&quot;Share to Us on WhatsApp&quot;</strong> below to send your application slip &amp; payment screenshot for instant priority response &amp; admission confirmation.
                  </span>
                </div>
              </div>

              {/* Action CTAs */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/918939648457?text=${encodeURIComponent(
                    `*Sam's Culinary Art Classes - Registration & Payment Confirmation*\n\n` +
                    `📄 *Application No:* ${submittedData.applicationNumber}\n` +
                    `👤 *Student Name:* ${submittedData.name}\n` +
                    `📞 *Phone / WhatsApp:* ${submittedData.phone}\n` +
                    `📧 *Email:* ${submittedData.email}\n` +
                    `💰 *Fee Paid:* ₹${submittedData.amountPaid}/- (Paid)\n` +
                    `🏦 *Transaction / UPI Ref ID:* ${submittedData.bankDetails || 'Submitted'}\n` +
                    (submittedData.proofImageUrl && !submittedData.proofImageUrl.startsWith('data:') ? `📸 *Payment Screenshot:* ${submittedData.proofImageUrl}\n\n` : '\n') +
                    `_Hi Chef Vahitha, I have completed my registration payment of ₹500. Please find my payment details above and confirm my seat!_`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', borderColor: '#25D366', color: '#fff', fontSize: '1rem', padding: '12px 26px', fontWeight: '700', boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)' }}
                >
                  <WhatsAppOutlined style={{ fontSize: '18px' }} />
                  <span>Share to Us on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px' }}
                >
                  <PrinterOutlined />
                  <span>Print Application Slip</span>
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px' }}
                >
                  <ReloadOutlined />
                  <span>Register Another Student</span>
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Custom Luxury Form */
            <div className="onboarding-form-card">
              
              {/* Step Navigation Indicator */}
              <div className="form-steps-header">
                <div 
                  className={`step-item-tab ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}
                  onClick={() => currentStep > 1 && setCurrentStep(1)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', padding: '10px', cursor: currentStep > 1 ? 'pointer' : 'default', opacity: currentStep === 1 ? 1 : 0.6 }}
                >
                  <span className="step-circle" style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', background: currentStep === 1 ? 'var(--mango-yellow)' : currentStep > 1 ? 'var(--green-primary)' : 'rgba(255,255,255,0.1)', color: currentStep === 1 ? '#000' : '#fff' }}>
                    {currentStep > 1 ? <CheckCircleOutlined /> : '1'}
                  </span>
                  <span className="step-title" style={{ fontWeight: currentStep === 1 ? '700' : '500', fontSize: '0.9rem' }}>Personal Details</span>
                </div>

                <div 
                  className={`step-item-tab ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}
                  onClick={() => currentStep > 2 && setCurrentStep(2)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', padding: '10px', cursor: currentStep > 2 ? 'pointer' : 'default', opacity: currentStep === 2 ? 1 : 0.6 }}
                >
                  <span className="step-circle" style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', background: currentStep === 2 ? 'var(--mango-yellow)' : currentStep > 2 ? 'var(--green-primary)' : 'rgba(255,255,255,0.1)', color: currentStep === 2 ? '#000' : '#fff' }}>
                    {currentStep > 2 ? <CheckCircleOutlined /> : '2'}
                  </span>
                  <span className="step-title" style={{ fontWeight: currentStep === 2 ? '700' : '500', fontSize: '0.9rem' }}>Family &amp; Purpose</span>
                </div>

                <div 
                  className={`step-item-tab ${currentStep === 3 ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', padding: '10px', opacity: currentStep === 3 ? 1 : 0.6 }}
                >
                  <span className="step-circle" style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', background: currentStep === 3 ? 'var(--mango-yellow)' : 'rgba(255,255,255,0.1)', color: currentStep === 3 ? '#000' : '#fff' }}>
                    3
                  </span>
                  <span className="step-title" style={{ fontWeight: currentStep === 3 ? '700' : '500', fontSize: '0.9rem' }}>Fee &amp; Verification</span>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} style={{ padding: '34px 28px' }}>

                {/* STEP 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="step-pane animate-fade-in">
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '6px' }}>
                        Step 1: Student Information
                      </h3>
                      <p style={{ opacity: 0.75, fontSize: '0.9rem' }}>
                        Enter your primary contact details so we can issue your course admittance and batch allocation.
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      {/* Name */}
                      <div className="form-group-field">
                        <label className="field-label" htmlFor="onb-name">
                          Full Name <span style={{ color: '#ff4d4f' }}>*</span>
                        </label>
                        <div className="custom-input-wrap">
                          <UserOutlined className="input-prefix-icon" />
                          <input
                            id="onb-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Priya Sundaram"
                            className={`custom-form-input ${errors.name ? 'has-error' : ''}`}
                            autoFocus
                          />
                        </div>
                        {errors.name && <span className="field-error-msg">{errors.name}</span>}
                      </div>

                      {/* Email */}
                      <div className="form-group-field">
                        <label className="field-label" htmlFor="onb-email">
                          Email Address <span style={{ color: '#ff4d4f' }}>*</span>
                        </label>
                        <div className="custom-input-wrap">
                          <MailOutlined className="input-prefix-icon" />
                          <input
                            id="onb-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. priya.sundaram@gmail.com"
                            className={`custom-form-input ${errors.email ? 'has-error' : ''}`}
                          />
                        </div>
                        {errors.email && <span className="field-error-msg">{errors.email}</span>}
                      </div>

                      {/* Phone / Whatsapp */}
                      <div className="form-group-field" style={{ gridColumn: '1 / -1' }}>
                        <label className="field-label" htmlFor="onb-phone">
                          Phone / WhatsApp Number <span style={{ color: '#ff4d4f' }}>*</span>
                        </label>
                        <div className="custom-input-wrap">
                          <PhoneOutlined className="input-prefix-icon" />
                          <input
                            id="onb-phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 98765 43210"
                            className={`custom-form-input ${errors.phone ? 'has-error' : ''}`}
                          />
                        </div>
                        <small style={{ opacity: 0.65, fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                          We will send your schedule, ingredient list, and live links to this WhatsApp number.
                        </small>
                        {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                      </div>

                      {/* Address */}
                      <div className="form-group-field" style={{ gridColumn: '1 / -1' }}>
                        <label className="field-label" htmlFor="onb-address">
                          Full Residential Address <span style={{ color: '#ff4d4f' }}>*</span>
                        </label>
                        <div className="custom-input-wrap">
                          <HomeOutlined className="input-prefix-icon" style={{ top: '16px' }} />
                          <textarea
                            id="onb-address"
                            name="address"
                            rows={3}
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Door No, Street Name, Landmark, City, State, Pincode"
                            className={`custom-form-input custom-textarea ${errors.address ? 'has-error' : ''}`}
                            style={{ paddingTop: '10px' }}
                          />
                        </div>
                        {errors.address && <span className="field-error-msg">{errors.address}</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', fontSize: '1rem' }}
                      >
                        <span>Continue to Family Details</span>
                        <ArrowRightOutlined />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Family & Purpose */}
                {currentStep === 2 && (
                  <div className="step-pane animate-fade-in">
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '6px' }}>
                        Step 2: Family &amp; Background Information
                      </h3>
                      <p style={{ opacity: 0.75, fontSize: '0.9rem' }}>
                        Help us understand your culinary background and learning objectives.
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      {/* Father Name */}
                      <div className="form-group-field">
                        <label className="field-label" htmlFor="onb-father">
                          Father&apos;s Name <span style={{ color: '#ff4d4f' }}>*</span>
                        </label>
                        <div className="custom-input-wrap">
                          <TeamOutlined className="input-prefix-icon" />
                          <input
                            id="onb-father"
                            type="text"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleInputChange}
                            placeholder="Father's full name"
                            className={`custom-form-input ${errors.fatherName ? 'has-error' : ''}`}
                            autoFocus
                          />
                        </div>
                        {errors.fatherName && <span className="field-error-msg">{errors.fatherName}</span>}
                      </div>

                      {/* Mother Name */}
                      <div className="form-group-field">
                        <label className="field-label" htmlFor="onb-mother">
                          Mother&apos;s Name <span style={{ color: '#ff4d4f' }}>*</span>
                        </label>
                        <div className="custom-input-wrap">
                          <HeartOutlined className="input-prefix-icon" />
                          <input
                            id="onb-mother"
                            type="text"
                            name="motherName"
                            value={formData.motherName}
                            onChange={handleInputChange}
                            placeholder="Mother's full name"
                            className={`custom-form-input ${errors.motherName ? 'has-error' : ''}`}
                          />
                        </div>
                        {errors.motherName && <span className="field-error-msg">{errors.motherName}</span>}
                      </div>

                      {/* Nationality */}
                      <div className="form-group-field">
                        <label className="field-label" htmlFor="onb-nationality">
                          Nationality <span style={{ color: '#ff4d4f' }}>*</span>
                        </label>
                        <div className="custom-input-wrap">
                          <GlobalOutlined className="input-prefix-icon" />
                          <input
                            id="onb-nationality"
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                            placeholder="e.g. Indian"
                            className={`custom-form-input ${errors.nationality ? 'has-error' : ''}`}
                          />
                        </div>
                        {errors.nationality && <span className="field-error-msg">{errors.nationality}</span>}
                      </div>

                      {/* Purpose of Joining */}
                      <div className="form-group-field" style={{ gridColumn: '1 / -1' }}>
                        <label className="field-label" htmlFor="onb-purpose">
                          Purpose of Joining Sam&apos;s Culinary Art Class <span style={{ color: '#ff4d4f' }}>*</span>
                        </label>

                        {/* Quick Selection Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                          {PURPOSE_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, purposeOfJoining: opt }));
                                if (errors.purposeOfJoining) setErrors((prev) => ({ ...prev, purposeOfJoining: '' }));
                              }}
                              style={{
                                background: formData.purposeOfJoining === opt ? 'var(--mango-yellow)' : 'rgba(255,255,255,0.06)',
                                color: formData.purposeOfJoining === opt ? '#1a1a1a' : 'inherit',
                                border: '1px solid',
                                borderColor: formData.purposeOfJoining === opt ? 'var(--mango-yellow)' : 'var(--border-color)',
                                borderRadius: '20px',
                                padding: '6px 14px',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        <div className="custom-input-wrap">
                          <AimOutlined className="input-prefix-icon" style={{ top: '16px' }} />
                          <textarea
                            id="onb-purpose"
                            name="purposeOfJoining"
                            rows={3}
                            value={formData.purposeOfJoining}
                            onChange={handleInputChange}
                            placeholder="State your goal, interests, or any specific cuisine you want to master..."
                            className={`custom-form-input custom-textarea ${errors.purposeOfJoining ? 'has-error' : ''}`}
                            style={{ paddingTop: '10px' }}
                          />
                        </div>
                        {errors.purposeOfJoining && <span className="field-error-msg">{errors.purposeOfJoining}</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="btn-outline"
                        style={{ padding: '12px 24px' }}
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', fontSize: '1rem' }}
                      >
                        <span>Continue to Registration Fee</span>
                        <ArrowRightOutlined />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Registration Fee & Bank Details */}
                {currentStep === 3 && (
                  <div className="step-pane animate-fade-in">
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '6px' }}>
                        Step 3: Registration Fee &amp; Payment Section
                      </h3>
                      <p style={{ opacity: 0.75, fontSize: '0.9rem' }}>
                        Official onboarding fee confirmation, UPI details, and payment proof upload.
                      </p>
                    </div>

                    {/* Fee Announcement Card */}
                    <div className="fee-announcement-card">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--mango-yellow)', fontWeight: '700', letterSpacing: '0.5px' }}>
                            One-Time Registration Fee
                          </span>
                          <h4 style={{ margin: '4px 0 0 0', fontSize: '1.6rem', fontWeight: '800' }}>
                            Rs. 500/- <span style={{ fontSize: '0.95rem', fontWeight: '500', opacity: 0.8 }}>(INR Five Hundred Rupees)</span>
                          </h4>
                        </div>
                        <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                          Guaranteed Seat Allocation
                        </span>
                      </div>
                    </div>

                    {/* Academy Payment Methods: Bank Transfer & UPI */}
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CreditCardOutlined style={{ color: 'var(--mango-yellow)' }} />
                        <span>Official Academy Payment Modes (Choose UPI or Bank Transfer)</span>
                      </h4>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                        
                        {/* Option 1: Direct Bank Account Transfer */}
                        <div className="payment-method-card">
                          <div className="payment-card-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(232, 167, 16, 0.15)', color: 'var(--mango-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BankOutlined style={{ fontSize: '16px' }} />
                              </div>
                              <strong style={{ fontSize: '0.95rem' }}>Bank Account Transfer</strong>
                            </div>
                            <span className="badge badge-success" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>IMPS / NEFT / RTGS</span>
                          </div>

                          <div className="payment-detail-box">
                            <div>
                              <span style={{ fontSize: '0.72rem', opacity: 0.7, textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>Account Name</span>
                              <strong style={{ fontSize: '0.92rem', color: 'var(--mango-yellow)' }}>Sam&apos;s Culinary Art Class</strong>
                            </div>
                          </div>

                          <div className="payment-detail-box">
                            <div>
                              <span style={{ fontSize: '0.72rem', opacity: 0.7, textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>Bank Name</span>
                              <strong style={{ fontSize: '0.92rem' }}>Canara Bank</strong>
                            </div>
                          </div>

                          <div className="payment-detail-box">
                            <div>
                              <span style={{ fontSize: '0.72rem', opacity: 0.7, textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>Account Number</span>
                              <strong style={{ fontSize: '1.05rem', letterSpacing: '1px', color: 'var(--text-dark)' }}>120038272057</strong>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('120038272057', 'Account Number')}
                              style={{ background: 'rgba(232, 167, 16, 0.15)', border: '1px solid var(--mango-yellow)', color: 'var(--mango-yellow)', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
                              title="Copy Account Number"
                            >
                              <CopyOutlined /> Copy
                            </button>
                          </div>

                          <div className="payment-detail-box">
                            <div>
                              <span style={{ fontSize: '0.72rem', opacity: 0.7, textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>IFSC Code</span>
                              <strong style={{ fontSize: '1rem', letterSpacing: '1px', color: 'var(--text-dark)' }}>CNRB0003871</strong>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('CNRB0003871', 'IFSC Code')}
                              style={{ background: 'rgba(232, 167, 16, 0.15)', border: '1px solid var(--mango-yellow)', color: 'var(--mango-yellow)', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
                              title="Copy IFSC Code"
                            >
                              <CopyOutlined /> Copy
                            </button>
                          </div>

                          <div className="payment-detail-box">
                            <div>
                              <span style={{ fontSize: '0.72rem', opacity: 0.7, textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>Branch</span>
                              <strong style={{ fontSize: '0.92rem' }}>United India colony</strong>
                            </div>
                          </div>
                        </div>

                        {/* Option 2: UPI / QR Code Payment */}
                        <div className="payment-method-card">
                          <div className="payment-card-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(52, 199, 89, 0.15)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <QrcodeOutlined style={{ fontSize: '16px' }} />
                              </div>
                              <strong style={{ fontSize: '0.95rem' }}>UPI &amp; QR Code Scan</strong>
                            </div>
                            <span className="badge badge-warning" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>Instant UPI</span>
                          </div>

                          {/* QR Image Box */}
                          <div className="payment-qr-container">
                            <img
                              src="/qr.jpeg"
                              alt="Sam's Culinary Art Class UPI QR Code"
                              style={{ width: '100%', maxWidth: '170px', height: 'auto', borderRadius: '8px', display: 'block', margin: '0 auto', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                            />
                            <div className="payment-qr-caption">
                              Scan with GPay / PhonePe / Paytm
                            </div>
                          </div>

                          <div className="payment-detail-box">
                            <div>
                              <span style={{ fontSize: '0.72rem', opacity: 0.7, textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>UPI ID</span>
                              <strong style={{ fontSize: '0.92rem' }}>vahijeeva@oksbi</strong>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('vahijeeva@oksbi', 'UPI ID')}
                              style={{ background: 'rgba(232, 167, 16, 0.15)', border: '1px solid var(--mango-yellow)', color: 'var(--mango-yellow)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
                              title="Copy UPI ID"
                            >
                              <CopyOutlined /> Copy
                            </button>
                          </div>

                          <div className="payment-detail-box">
                            <div>
                              <span style={{ fontSize: '0.72rem', opacity: 0.7, textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>GPay / PhonePe Mobile</span>
                              <strong style={{ fontSize: '0.92rem' }}>8939648457</strong>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('8939648457', 'Phone Number')}
                              style={{ background: 'rgba(232, 167, 16, 0.15)', border: '1px solid var(--mango-yellow)', color: 'var(--mango-yellow)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
                              title="Copy Number"
                            >
                              <CopyOutlined /> Copy
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bank Details / Transaction ID Input (Required) */}
                    <div className="form-group-field" style={{ marginBottom: '20px' }}>
                      <label className="field-label" htmlFor="onb-bank">
                        Bank Details / UPI Transaction Reference Number <span style={{ color: '#ff4d4f' }}>*</span>
                      </label>
                      <div className="custom-input-wrap">
                        <CreditCardOutlined className="input-prefix-icon" />
                        <input
                          id="onb-bank"
                          type="text"
                          name="bankDetails"
                          value={formData.bankDetails}
                          onChange={handleInputChange}
                          placeholder="e.g. UPI Ref: 324156789012 or GPay Trans ID"
                          className={`custom-form-input ${errors.bankDetails ? 'has-error' : ''}`}
                        />
                      </div>
                      {errors.bankDetails ? (
                        <span className="field-error-msg">{errors.bankDetails}</span>
                      ) : (
                        <small style={{ opacity: 0.65, fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                          Enter the 12-digit UPI reference ID or Bank UTR number after transferring ₹500.
                        </small>
                      )}
                    </div>

                    {/* Cloudinary Image Upload for Payment Proof (Required) */}
                    <div className="form-group-field" style={{ marginBottom: '24px' }}>
                      <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CloudUploadOutlined style={{ color: 'var(--mango-yellow)' }} />
                        <span>Upload Payment Proof / Screenshot <span style={{ color: '#ff4d4f' }}>*</span></span>
                      </label>

                      {proofPreview || formData.proofImageUrl ? (
                        <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', gap: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '14px', maxWidth: '360px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={proofPreview || formData.proofImageUrl}
                              alt="Payment Proof Screenshot Preview"
                              style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--mango-yellow)' }}
                            />
                            <div>
                              <span className="badge badge-success" style={{ fontSize: '0.75rem', display: 'inline-block', marginBottom: '6px' }}>
                                {isUploadingImage ? 'Uploading screenshot...' : 'Payment Proof Attached'}
                              </span>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {isUploadingImage ? 'Uploading image...' : 'Ready for verification.'}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                            <a
                              href={proofPreview || formData.proofImageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-outline"
                              style={{ fontSize: '0.8rem', padding: '4px 12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <EyeOutlined /> View
                            </a>
                            <button
                              type="button"
                              onClick={removeProofImage}
                              className="btn-outline"
                              style={{ fontSize: '0.8rem', padding: '4px 12px', color: '#ff4d4f', borderColor: '#ff4d4f', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <DeleteOutlined /> Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className={`proof-upload-dropzone ${errors.proofImage ? 'has-error' : ''}`}>
                          <FileImageOutlined style={{ fontSize: '32px', color: errors.proofImage ? '#ff4d4f' : 'var(--mango-yellow)', opacity: 0.85, marginBottom: '8px' }} />
                          <div style={{ fontWeight: '600', fontSize: '0.92rem', marginBottom: '4px' }}>
                            Upload GPay / PhonePe / Bank Transfer Screenshot
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>
                            Payment proof screenshot is mandatory for quick verification &amp; seat allocation.
                          </p>

                          <label className="btn-outline" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', margin: 0 }}>
                            <UploadOutlined />
                            <span>Select Screenshot</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleProofImageChange}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      )}
                      {errors.proofImage && <span className="field-error-msg" style={{ display: 'block', marginTop: '6px' }}>{errors.proofImage}</span>}
                    </div>

                    {/* Bottom Action Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', flexWrap: 'wrap', gap: '16px' }}>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="btn-outline"
                        style={{ padding: '12px 24px' }}
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting || isUploadingImage}
                        className="btn-primary btn-mango"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 34px', fontSize: '1.05rem', fontWeight: '800', boxShadow: '0 4px 18px rgba(232, 167, 16, 0.4)' }}
                      >
                        {isSubmitting ? (
                          <>
                            <LoadingOutlined />
                            <span>Processing Registration...</span>
                          </>
                        ) : isUploadingImage ? (
                          <>
                            <LoadingOutlined />
                            <span>Uploading Proof Image...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircleOutlined />
                            <span>Submit Onboarding Application</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

        </div>
      </section>

      {/* Trust Guarantee Section */}
      <section style={{ padding: '20px 20px 60px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <SafetyCertificateOutlined style={{ color: 'var(--green-primary)' }} />
            <span>Official Enrollment • 100% Privacy Protected • ISO 9001:2015 Quality Standards</span>
          </div>
        </div>
      </section>
    </div>
  );
}
