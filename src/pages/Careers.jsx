import React from 'react';
import {
  ExperimentOutlined,
  TeamOutlined,
  ContactsOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import useSEO from '../hooks/useSEO';
import TiltCard from '../components/TiltCard';

const FlourishTop = () => (
  <svg viewBox="0 0 300 24" width="180" height="15" className="flourish-svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M 20 12 C 50 12, 70 8, 100 12 C 120 15, 130 15, 140 12" strokeLinecap="round" />
    <path d="M 20 12 C 15 12, 10 15, 12 17 C 18 18, 18 16 C 18 14, 15 13, 16 13" strokeLinecap="round" />
    <path d="M 280 12 C 250 12, 230 8, 200 12 C 180 15, 170 15, 160 12" strokeLinecap="round" />
    <path d="M 280 12 C 285 12, 290 15, 288 17 C 282 18, 282 16 C 284 13, 284 13" strokeLinecap="round" />
    <circle cx="150" cy="12" r="3.5" fill="currentColor" />
  </svg>
);

const RoleList = [
  {
    title: "Culinary Assistant",
    icon: <ExperimentOutlined style={{ fontSize: '20px' }} />,
    desc: "Support our head instructor with food preparation, ingredient sourcing, dough kneading, measuring spice blends, and setting up staging tables before and during sessions.",
    skills: ["Basic cooking/baking knowledge", "Knife and chopping safety", "Reliable & organized pace"],
    img: "/careers/ca.webp"
  },
  {
    title: "Desk Manager",
    icon: <ContactsOutlined style={{ fontSize: '20px' }} />,
    desc: "Manage client registrations, handle phone calls, respond to student batch inquiries via WhatsApp, track class attendance sheets, maintain fee books, and coordinate schedule timings.",
    skills: ["Fluent communication (English & Tamil)", "Google Sheets / basic computing", "Amiable phone etiquettes"],
    img: "/careers/dmgr.webp"
  },
  {
    title: "Studio Assistant",
    icon: <TeamOutlined style={{ fontSize: '20px' }} />,
    desc: "Maintain kitchen hygiene and equipment organization. Responsibilities include washing culinary utensils, arranging baking sheets, cleaning workstations, and sanitizing the studio before new batches enter.",
    skills: ["Hygiene-conscious habits", "Timely workspace management", "Physical agility & stamina"],
    img: "/careers/sa.webp"
  }
];

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSemLcbUIZiY1XSh1OaaMOu35TXrlw_fqitSFtrtYsCPSrT2KA/viewform?usp=send_form";

export default function Careers() {
  useSEO({
    title: "Careers & Job Openings - Culinary Assistant, Studio Assistant | Sam's",
    description: "Join our growing kitchen academy in Chennai. We are hiring culinary assistants, kitchen studio assistants, and front desk managers. Apply online through our official Google Form.",
    keywords: "sams cooking jobs, culinary jobs chennai, baking assistant vacancies, desk manager jobs, chef assistant vacancy, kitchen staff hire, jobs in kodambakkam, sams hiring, sams careers, apply culinary class"
  });

  return (
    <div className="careers-page-container container section-padding">
      <div className="section-title-wrapper">
        <span className="section-tag">Careers</span>
        <h2 className="section-title">Join Our Culinary Team</h2>
        <p className="section-subtitle">Grow your passion for culinary arts and baking by teaching and managing classes with us.</p>
        <div className="dotted-line-accent"><FlourishTop /></div>
      </div>

      {/* 3D Careers Openings Grid */}
      <div className="courses-grid" style={{ minHeight: '350px' }}>
        {RoleList.map((role, idx) => (
          <TiltCard className="course-card" key={idx} maxTilt={0} scaleOnHover={true}>
            <div className="course-img-wrapper">
              <img src={role.img} alt={role.title} className="course-img" />
              <span className="course-badge tilt-layer-depth-3" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {role.icon}
                <span>Open Role</span>
              </span>
            </div>

            <div className="course-details">
              <h4 className="course-name tilt-layer-depth-2">{role.title}</h4>
              <p className="course-desc tilt-layer-depth-1">{role.desc}</p>

              <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.92rem', color: 'var(--mango-yellow)', marginBottom: '8px' }}>
                Key Requirements:
              </h5>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0 0 20px 0' }}>
                {role.skills.map((skill, sIdx) => (
                  <li key={sIdx} style={{ fontSize: '0.82rem', color: 'var(--text-dark)', marginBottom: '6px', paddingLeft: '14px', position: 'relative' }}>
                    <span style={{ color: 'var(--green-medium)', position: 'absolute', left: '0' }}>✓</span>
                    {skill}
                  </li>
                ))}
              </ul>

              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary tilt-layer-depth-3"
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <span>Apply Now</span>
                <ArrowRightOutlined style={{ fontSize: '11px', marginLeft: '4px' }} />
              </a>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
