import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  CheckCircleOutlined,
  SendOutlined,
  CompassOutlined,
  WhatsAppOutlined,
  TeamOutlined,
  BookOutlined,
  MessageOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import useSEO from '../hooks/useSEO';
import TiltCard from '../components/TiltCard';

const FlourishTop = () => (
  <svg viewBox="0 0 300 24" width="180" height="15" className="flourish-svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M 20 12 C 50 12, 70 8, 100 12 C 120 15, 130 15, 140 12" strokeLinecap="round" />
    <path d="M 20 12 C 15 12, 10 15, 12 17 C 18 18, 18 16 C 18 14, 15 13, 16 13" strokeLinecap="round" />
    <path d="M 280 12 C 250 12, 230 8, 200 12 C 180 15, 170 15, 160 12" strokeLinecap="round" />
    <path d="M 280 12 C 285 12, 290 15, 288 17 C 282 18, 282 16 C 282 14, 285 13, 284 13" strokeLinecap="round" />
    <circle cx="150" cy="12" r="3.5" fill="currentColor" />
  </svg>
);

const PopularCoursesQuickSelect = [
  "Baking & Cake Decorating",
  "Traditional South Indian Tiffins",
  "Continental & Soups Masterclass",
  "NRI Individual Fast-Track",
  "Kids Summer Culinary Camp",
  "General Batch Inquiry"
];

export default function Contact() {
  const [activeChannel, setActiveChannel] = useState('inquiry'); // 'inquiry' | 'whatsapp' | 'location' | 'careers'
  const [selectedCourseTag, setSelectedCourseTag] = useState("Baking & Cake Decorating");
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useSEO({
    title: "Contact Us - Location Address, Phone Number & Map | Sam's",
    description: "Contact Sam's Culinary Art Classes in Chennai. Find our Google Map location at Viswanatha Puram, Kodambakkam, phone numbers, and submit inquiries online.",
    keywords: "sams cooking phone number, sam culinary address, vahitha jeevanandam email, cooking classes in kodambakkam, sams maps location, inquire cooking classes chennai, reach sam culinary, sams contact"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setIsSending(true);

    const formattedTime = new Date().toLocaleString('en-IN', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    try {
      await fetch('https://formsubmit.co/ajax/samsculinaryartclass@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🎓 New Course Inquiry: ${selectedCourseTag} - ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
          '📌 Selected Course / Topic': selectedCourseTag,
          '👤 Student Full Name': formData.name,
          '📱 Phone / WhatsApp': formData.phone,
          '✉️ Student Mail ID': formData.email,
          '💬 Message & Requirements': formData.message || 'No additional message provided.',
          '📅 Date & Time': formattedTime,
          '🏫 Academy Branch': "Sam's Culinary Art Classes, Viswanatha Puram, Kodambakkam, Chennai - 600024"
        })
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Email dispatch error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 5000);
    }
  };

  return (
    <div className="contact-page-container container section-padding">
      {/* Editorial Header */}
      <div className="section-title-wrapper" style={{ marginBottom: 'var(--space-6)' }}>
        <span className="section-tag">— SAM&apos;S CONCIERGE &amp; INQUIRY DESK</span>
        <h1 className="hero-title gradient-title-green" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '12px' }}>
          How Can We Help You Today?
        </h1>
        <p className="section-subtitle" style={{ fontSize: '1.08rem' }}>
          Select your preferred contact channel below for instant assistance.
        </p>
        <div className="dotted-line-accent"><FlourishTop /></div>
      </div>

      {/* Interactive Channel Selection Segmented Bar */}
      <div className="gallery-tabs" style={{ marginBottom: 'var(--space-8)' }}>
        <button
          className={`gallery-tab-btn ${activeChannel === 'inquiry' ? 'active' : ''}`}
          onClick={() => setActiveChannel('inquiry')}
        >
          <BookOutlined /> Course Inquiry Form
        </button>
        <button
          className={`gallery-tab-btn ${activeChannel === 'whatsapp' ? 'active' : ''}`}
          onClick={() => setActiveChannel('whatsapp')}
        >
          <WhatsAppOutlined /> Instant WhatsApp Chat
        </button>
        <button
          className={`gallery-tab-btn ${activeChannel === 'location' ? 'active' : ''}`}
          onClick={() => setActiveChannel('location')}
        >
          <EnvironmentOutlined /> Location &amp; Directions
        </button>
        <button
          className={`gallery-tab-btn ${activeChannel === 'careers' ? 'active' : ''}`}
          onClick={() => setActiveChannel('careers')}
        >
          <TeamOutlined /> Careers &amp; Hiring
        </button>
      </div>

      {/* Dynamic Active Channel Panel */}
      <div style={{ marginBottom: 'var(--space-12)' }}>

        {/* CHANNEL 1: COURSE INQUIRY FORM */}
        {activeChannel === 'inquiry' && (
          <TiltCard maxTilt={0} style={{ padding: 'var(--space-6)' }}>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <span className="section-tag" style={{ fontSize: '0.75rem' }}>STEP 1: CHOOSE A COURSE OR TOPIC</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                {PopularCoursesQuickSelect.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCourseTag(tag)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      border: selectedCourseTag === tag ? '1.5px solid var(--mango-yellow)' : 'var(--border-subtle)',
                      background: selectedCourseTag === tag ? 'var(--green-primary)' : 'var(--glass-bg)',
                      color: selectedCourseTag === tag ? '#ffffff' : 'var(--text-dark)',
                      transition: 'all 200ms ease'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="footer-divider" style={{ margin: 'var(--space-4) 0' }} />

            <div style={{ marginBottom: 'var(--space-3)' }}>
              <span className="section-tag" style={{ fontSize: '0.75rem' }}>STEP 2: YOUR DETAILS</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--green-primary)', margin: 0 }}>
                Inquiry for: <span style={{ color: 'var(--mango-yellow)' }}>{selectedCourseTag}</span>
              </h3>
            </div>

            {isSubmitted ? (
              <div
                className="glass-panel-accent"
                style={{ padding: 'var(--space-4)', color: 'var(--green-primary)', fontWeight: '600', textAlign: 'center', borderRadius: '20px' }}
              >
                <CheckCircleOutlined style={{ fontSize: '32px', color: 'var(--mango-yellow)', marginBottom: '8px', display: 'block' }} />
                Thank you! Your enquiry for &quot;{selectedCourseTag}&quot; was successfully sent to samsculinaryartclass@gmail.com. We will contact you via WhatsApp/Phone/Email shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: 'var(--border-medium)', background: 'var(--bg-surface)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: 'var(--border-medium)', background: 'var(--bg-surface)', outline: 'none' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>Mail ID / Email Address *</label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: 'var(--border-medium)', background: 'var(--bg-surface)', outline: 'none' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>Message / Specific Requirements</label>
                  <textarea
                    placeholder={`Tell us about your interest in ${selectedCourseTag}...`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="3"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: 'var(--border-medium)', background: 'var(--bg-surface)', outline: 'none', resize: 'vertical' }}
                  ></textarea>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <button
                    type="submit"
                    className="btn-primary btn-mango"
                    disabled={isSending}
                    style={{ width: '100%', padding: '12px', opacity: isSending ? 0.7 : 1, cursor: isSending ? 'wait' : 'pointer' }}
                  >
                    {isSending ? (
                      <>
                        <LoadingOutlined /> Sending Enquiry to samsculinaryartclass@gmail.com...
                      </>
                    ) : (
                      <>
                        <SendOutlined /> Submit Course Enquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </TiltCard>
        )}

        {/* CHANNEL 2: INSTANT WHATSAPP CHAT */}
        {activeChannel === 'whatsapp' && (
          <TiltCard maxTilt={0} style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#25D366', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-3) auto', fontSize: '32px', boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)' }}>
              <WhatsAppOutlined />
            </div>

            <span className="section-tag" style={{ fontSize: '0.75rem' }}>INSTANT ASSISTANCE</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '2rem', marginBottom: '4px' }}>
              Chat Directly With Mrs. M. Vahitha Jeevanandam
            </h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--mango-yellow)', fontWeight: '600', marginBottom: '12px' }}>
              MCA, M.Phil., Diploma in Clinical Nutrition and Dietetics
            </div>
            <p style={{ maxWidth: '600px', margin: '0 auto var(--space-4) auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
              Get instant answers on upcoming weekend &amp; weekday batch timings, fee structures, and customized NRI course modules.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: 'var(--space-6)', width: '100%' }}>
              <a
                href={`https://wa.me/918939648457?text=Hi%20Sam's%20Culinary,%20I'd%20like%20to%20know%20upcoming%20batch%20timings%20and%20fees.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-mango"
                style={{
                  padding: '12px 20px',
                  fontSize: '0.95rem',
                  maxWidth: '100%',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                <MessageOutlined /> <span>Open WhatsApp Chat (+91 8939648457)</span>
              </a>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: 'var(--green-light)', fontSize: '0.82rem', color: 'var(--green-primary)', fontWeight: '600', maxWidth: '100%', boxSizing: 'border-box', whiteSpace: 'normal', textAlign: 'center' }}>
              <CheckCircleOutlined style={{ color: 'var(--green-medium)' }} /> <span>Typical response time: under 15 minutes</span>
            </div>
          </TiltCard>
        )}

        {/* CHANNEL 3: LOCATION & MAP */}
        {activeChannel === 'location' && (
          <div className="about-grid" style={{ gap: 'var(--space-6)', alignItems: 'stretch' }}>
            <TiltCard maxTilt={0} style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="section-tag" style={{ fontSize: '0.75rem' }}>ACADEMY ADDRESS</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--green-primary)', marginBottom: '16px' }}>
                  Visit Our Kitchen Studio
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <EnvironmentOutlined />
                    </div>
                    <div>
                      <h5 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-dark)' }}>Address</h5>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                        Anbazhaghi Bhavanam, 18/21, Viswanatha Puram 3rd Street, Kodambakkam, Chennai - 600024
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <PhoneOutlined className="contact-dialer-down" />
                    </div>
                    <div>
                      <h5 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-dark)' }}>Visiting Hours</h5>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                        Monday – Friday: 10:00 AM – 1:00 PM &amp; 2:00 PM – 7:00 PM<br />
                        Weekends: Special Appointments
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=3/18,+Viswanatha+Puram,+Kodambakkam,+Chennai,+Tamil+Nadu+600024"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-mango"
                style={{ width: '100%', textAlign: 'center', maxWidth: '100%', boxSizing: 'border-box', whiteSpace: 'normal' }}
              >
                <CompassOutlined /> <span>Open in Google Maps ↗</span>
              </a>
            </TiltCard>

            <TiltCard maxTilt={0} style={{ padding: '0', overflow: 'hidden', minHeight: '400px', position: 'relative' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8153394118463!2d80.2229660745765!3d13.047423213212394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266f0b949d36f%3A0x75c3bcaba8428ec4!2s3%2F18%2C%20Viswanatha%20Puram%2C%20Kodambakkam%2C%20Chennai%2C%20Greater%20Chennai%2C%20Tamil%20Nadu%20600024!5e0!3m2!1sen!2sin!4v1784567658563!5m2!1sen!2sin"
                style={{ width: '100%', height: '100%', minHeight: '400px', border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                title="Sam's Culinary Location Map"
              ></iframe>
            </TiltCard>
          </div>
        )}

        {/* CHANNEL 4: CAREERS */}
        {activeChannel === 'careers' && (
          <TiltCard maxTilt={0} style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-3) auto', fontSize: '28px' }}>
              <TeamOutlined />
            </div>

            <span className="section-tag" style={{ fontSize: '0.75rem' }}>JOIN OUR TEAM</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '2.2rem', marginBottom: '12px' }}>
              Culinary &amp; Baking Instructors Wanted
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto var(--space-6) auto', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
              We are expanding our teaching faculty! If you are an experienced pastry chef, home baker, or expert in regional Indian cuisines with a passion for teaching, we would love to hear from you.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', width: '100%', flexWrap: 'wrap' }}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSemLcbUIZiY1XSh1OaaMOu35TXrlw_fqitSFtrtYsCPSrT2KA/viewform?usp=send_form"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-mango"
                style={{
                  padding: '12px 20px',
                  fontSize: '0.95rem',
                  maxWidth: '100%',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none'
                }}
              >
                <span>Fill Instructor Application Form ↗</span>
              </a>

              <Link
                to="/onboarding"
                className="btn-primary btn-mango"
                style={{
                  padding: '12px 20px',
                  fontSize: '0.95rem',
                  maxWidth: '100%',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none'
                }}
              >
                <span>Student Registration Form ↗</span>
              </Link>
            </div>
          </TiltCard>
        )}

      </div>
    </div>
  );
}
