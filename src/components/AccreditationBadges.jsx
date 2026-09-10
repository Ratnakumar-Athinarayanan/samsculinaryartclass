import React from 'react';
import { SafetyCertificateOutlined } from '@ant-design/icons';

// Official Govt. & International Accreditation Logos
export const MSMELogo = () => (
  <div className="accreditation-badge-item" title="MSME - Govt. of India Registered">
    <div className="accreditation-img-wrapper">
      <img src="/accreditations/msme.svg" alt="MSME Govt. of India Official Logo" className="accreditation-official-img" />
    </div>
    <div className="badge-text-meta">
      <span className="badge-title">MSME Registered</span>
      <span className="badge-sub">Govt. of India Enterprise</span>
    </div>
  </div>
);

export const ISOLogo = () => (
  <div className="accreditation-badge-item" title="ISO 22000:2018 Certified Food Safety Management Academy">
    <div className="accreditation-img-wrapper">
      <img src="/accreditations/iso.svg" alt="ISO 22000:2018 Official Certification Logo" className="accreditation-official-img" />
    </div>
    <div className="badge-text-meta">
      <span className="badge-title">ISO 22000:2018</span>
      <span className="badge-sub">Food Safety Certified</span>
    </div>
  </div>
);

export const FSSAILogo = () => (
  <div className="accreditation-badge-item" title="FSSAI Licensed - Reg No: 22423544000118">
    <div className="accreditation-img-wrapper">
      <img src="/accreditations/fssai.webp" alt="FSSAI Official Logo" className="accreditation-official-img" />
    </div>
    <div className="badge-text-meta">
      <span className="badge-title">FSSAI Registered</span>
      <span className="badge-sub">No: 22423544000118</span>
    </div>
  </div>
);

export const NSDCLogo = () => (
  <div className="accreditation-badge-item" title="NSDC - National Skill Development Corporation Partner">
    <div className="accreditation-img-wrapper">
      <img src="/accreditations/nsdc.webp" alt="NSDC Govt. of India Official Logo" className="accreditation-official-img" />
    </div>
    <div className="badge-text-meta">
      <span className="badge-title">NSDC Affiliated</span>
      <span className="badge-sub">Skill India Partner</span>
    </div>
  </div>
);

export default function AccreditationBadges({ variant = "standard" }) {
  return (
    <div className={`accreditation-bar-container ${variant}`}>
      <div className="accreditation-header-tag">
        <SafetyCertificateOutlined style={{ color: 'var(--mango-yellow)', marginRight: '6px' }} />
        <span>OFFICIAL GOVT. ACCREDITATIONS &amp; CERTIFICATIONS</span>
      </div>
      
      <div className="accreditation-badges-grid">
        <MSMELogo />
        <div className="badge-divider-dot"></div>
        <ISOLogo />
        <div className="badge-divider-dot"></div>
        <FSSAILogo />
        <div className="badge-divider-dot"></div>
        <NSDCLogo />
      </div>
    </div>
  );
}
