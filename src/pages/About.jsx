import React, { useState } from 'react';
import {
  ExperimentOutlined,
  BookOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  CheckCircleFilled,
  TrophyFilled,
  HeartFilled,
  StarFilled,
  GlobalOutlined,
  CrownOutlined,
  RocketOutlined,
  ReadOutlined,
  AuditOutlined,
  SolutionOutlined,
  SafetyCertificateFilled,
  CheckCircleOutlined
} from '@ant-design/icons';
import useSEO from '../hooks/useSEO';
import TiltCard from '../components/TiltCard';
import FlipBookViewer from '../components/FlipBookViewer';

const FlourishTop = () => (
  <svg viewBox="0 0 300 24" width="180" height="15" className="flourish-svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M 20 12 C 50 12, 70 8, 100 12 C 120 15, 130 15, 140 12" strokeLinecap="round" />
    <path d="M 20 12 C 15 12, 10 15, 12 17 C 18 18, 18 16 C 18 14, 15 13, 16 13" strokeLinecap="round" />
    <path d="M 280 12 C 250 12, 230 8, 200 12 C 180 15, 170 15, 160 12" strokeLinecap="round" />
    <path d="M 280 12 C 285 12, 290 15, 288 17 C 282 18, 282 16 C 282 14, 285 13, 284 13" strokeLinecap="round" />
    <circle cx="150" cy="12" r="3.5" fill="currentColor" />
  </svg>
);

const KeyBadgesData = [
  { label: "Best Teacher Award 2025", sub: "Lions Club Honour", icon: <TrophyFilled style={{ color: 'var(--mango-yellow)' }} /> },
  { label: "World Record Achievement", sub: "Fireless Cooking for 150 Special Kids", icon: <CrownOutlined style={{ color: 'var(--mango-yellow)' }} /> },
  { label: "CISF Chennai Guest Speaker", sub: "Port Security Personnel Training", icon: <SafetyCertificateFilled style={{ color: 'var(--mango-yellow)' }} /> },
  { label: "1400+ Global Alumni", sub: "Learners from 40+ Countries", icon: <GlobalOutlined style={{ color: 'var(--green-medium)' }} /> },
  { label: "12 Years CS Professor", sub: "D.G. Vaishnav College (2000-2012)", icon: <ReadOutlined style={{ color: 'var(--green-medium)' }} /> },
  { label: "Chief Examiner (2011-2012)", sub: "University of Madras UG Board", icon: <AuditOutlined style={{ color: 'var(--green-medium)' }} /> }
];

const CorePillarsData = [
  {
    num: "01",
    title: "Passion for Cooking",
    icon: <ExperimentOutlined />,
    desc: "Experimenting cuisines from around the world with genuine dedication, creativity, and culinary science."
  },
  {
    num: "02",
    title: "Academic Discipline",
    icon: <BookOutlined />,
    desc: "Taught by a former Assistant Professor of Computer Science and Madras University Chief Examiner."
  },
  {
    num: "03",
    title: "Personalized Training",
    icon: <TeamOutlined />,
    desc: "Small batch sizes ensure hands-on practice, technique mastery, individual student focus, and printed booklets."
  },
  {
    num: "04",
    title: "Amiable Atmosphere",
    icon: <SafetyCertificateOutlined />,
    desc: "Air-conditioned cozy studio empowering women, kids, special children, and international learners."
  }
];

const FacultyTeamData = [
  {
    name: "Mrs. M. Vahitha Jeevanandam",
    role: "MCA, M.Phil., Diploma in Clinical Nutrition and Dietetics",
    credentials: "Founder & Master Chef Instructor",
    bio: "Former Assistant Professor & Madras University Chief Examiner with 12+ years of culinary leadership. Awarded Best Teacher 2025 and Entrepreneur of the Year 2019.",
    img: "/profile.webp"
  },
  {
    name: "Mrs. Sujani Franklin",
    role: "Icing & Frosting Tutor",
    credentials: "13+ Years Industry Experience",
    bio: "Sujani Franklin is an accomplished pastry chef and cake artist with 13+ years of industry experience. She trains students across diploma and professional baking courses, from beginners to advanced learners. Her expertise reflects precision, artistry, and passion for culinary excellence.",
    img: "/Sujani Franklin.webp"
  },
  {
    name: "Mrs. Kayalvizhi Rajakumar",
    role: "Icing & Frosting, Chocolatier Tutor",
    credentials: "Buttercream & Fondant Specialist",
    bio: "Kayalvizhi specialises in buttercream, fondant, and advanced cake finishing techniques. She focuses on building strong fundamentals so learners gain professional-level confidence. Her teaching style is friendly, practical, and deeply insightful.",
    img: "/Kayalvizhi Rajakumar.webp"
  },
  {
    name: "Mrs. P. Kirupavathy Ezhlian",
    role: "Traditional Sweets, Savouries & Cookies Tutor",
    credentials: "Festive Culinary Heritage Expert",
    bio: "Kirupavathy is an expert in authentic Indian sweets, savouries, and festive delicacies. She preserves age-old culinary heritage through her hands-on training. Her classes help students master traditional recipes with taste, technique, and cultural richness.",
    img: "/Kirupavathy Ezhlian.webp"
  },
  {
    name: "Ms. Deepthaa Maharabushanam",
    role: "B.Com., MBA",
    credentials: "Digital Marketer",
    bio: "Deepthaa manages the digital presence and branding initiatives of Sam’s Culinary Art Class. With her MBA background, she helps connect the institute with aspiring learners across platforms. She ensures every success story reaches the world with authenticity.",
    img: "/Deepthaa Maharabushanam.webp"
  }
];

const CelebrityStudents = [
  { name: "Shruthika Arjun", desc: "Cook With Comali Winner — Online specialized sessions", tag: "Celebrity Chef" },
  { name: "Mrs. Grace Karunas", desc: "Renowned Singer & Public Figure — Online & studio practice", tag: "High-Profile" },
  { name: "Nancy Jennifer", desc: "Vijay TV Kitchen Super Star Winner — Trained mentor student", tag: "TV Winner" },
  { name: "Family of Director Hari", desc: "Tamil Film Director Family — Custom private culinary training", tag: "VVIP Family" },
  { name: "Family of Mr. Vairamuthu", desc: "Legendary Lyricist Family — Exclusive culinary guidance", tag: "VVIP Family" },
  { name: "Ramachandra Hospital Family", desc: "Founding Doctors Family — Health & nutrition cooking", tag: "Medical Elite" },
  { name: "Chettinad International School", desc: "School Leadership Family — Professional culinary workshops", tag: "Institutional" },
  { name: "Daughter of Actor Sampath Ram", desc: "Film Actor Family — Specialized baking & confectionery", tag: "High-Profile" }
];

const CloudKitchensData = [
  { name: "The Chewzzle", desc: "Gourmet Bakery & Dessert Cloud Kitchen" },
  { name: "The Butterfly Cloud Kitchen", desc: "Multi-Cuisine Home Delivery Venture" },
  { name: "Shree Foods", desc: "Traditional South Indian Tiffin & Meal Service" },
  { name: "Mom's Curry Point", desc: "Authentic Gravy & Homestyle Meal Kitchen" },
  { name: "Nallam Cookies", desc: "Artisanal Healthy Cookie Brand" },
  { name: "Inipu Uppu Karam", desc: "Sweets & Savories Festival Kitchen" },
  { name: "Nishu's Delight", desc: "Custom Cakes & Confectionery Studio" },
  { name: "2 Cups", desc: "Specialty Tea & Snack Hub (West Mambalam)" },
  { name: "Home-Style Food", desc: "Daily Homestyle Catering Service (Porur)" }
];

const CorporateTrainingsData = [
  "Central Industrial Security Force (CISF) – Chennai Port Trust (Guest Speaker for Millet Mela, Training Cooks & CISF Personnel Families)",
  "AAFT University – Online Webinar on Millet Deepavali Sweets & Snacks for Clinical Nutrition and Dietetics Students",
  "Barclays – DLF, Chennai (Corporate Culinary & Wellness Workshops)",
  "City Bank (Employee Team Building & Workplace Wellness)",
  "IIT Madras – Club Activity & Cooking Contingent Selection Judge (2024 & 2025)",
  "ARAN Foundation – Culinary Skill Workshops for Special Kids",
  "SIET College – Student Internship & Practical Board Exams",
  "WEWA (Women Entrepreneurs Welfare Association)",
  "MAVEN Art School & Adarsh After-School Academy",
  "Chennaivil Thiruvaiyaru – Live Stage Cooking Demonstrations (Twice)"
];

const JudgingRolesData = [
  { title: "IIT Madras Cooking Contingent Selection", detail: "Official Selection Judge (2024 & 2025)" },
  { title: "Cake Constellation", detail: "SAAVY Muslim Women Entrepreneurs Pageant" },
  { title: "No Boil No Oil Competition", detail: "D.G. Vaishnav College Departmental Event" },
  { title: "Ramachandra Hospital Dept. of Nutrition", detail: "Nutritional Culinary Judge" },
  { title: "JBN Community Competition", detail: "North Indian Sweets Selection Judge" },
  { title: "Eventiaa Kids & Big Bazaar Competitions", detail: "Vadapalani & Inner Wheel Club Nanganallur" },
  { title: "VIRGO Events, Kids Galaxy & Kids Zee", detail: "Statewide Youth Culinary Talent Judge" },
  { title: "Virtual Cooking Competitions", detail: "Magalir Mattum, Rocking Ladies, Chop Saute VR Hungry Pandas" }
];

const CountriesTrainedList = [
  { name: "London", flag: "🇬🇧" },
  { name: "Holland", flag: "🇳🇱" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Iceland", flag: "🇮🇸" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Korea", flag: "🇰🇷" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Myanmar", flag: "🇲🇲" },
  { name: "Albania", flag: "🇦🇱" },
  { name: "Dominica", flag: "🇩🇲" },
  { name: "UAE", flag: "🇦🇪" },
  { name: "France", flag: "🇫🇷" }
];

const SpecializedCoursesData = [
  "South & North Indian Cuisine", "Continental & Multi-Cuisine", "Baking & Gourmet Pastries",
  "Frosting & Advanced Decor", "Jam & Juice Preservation", "Veg & Non-Veg Pickles",
  "Diabetic Cooking", "Weight Management Salads", "Fast & Smart Cooking",
  "Kids' Seasonal Camps", "Bachelor's Cooking", "Personalized Couple Cooking",
  "Leftover Transformation", "Entrepreneurship-focused Training"
];

const CollaborationsData = [
  { title: "Special Kids Culinary Programs", desc: "100% safe fireless cooking workshops building confidence, motor skills, and dignity." },
  { title: "Personalized Couple Cooking", desc: "Private romantic weekend culinary sessions for anniversaries & pre-wedding bonding." },
  { title: "Kids' Summer & Winter Camps", desc: "Cookie baking, sandwich making, salad tossing, and food art for young chefs." },
  { title: "Festive & Seasonal Masterclasses", desc: "Pongal delicacies, Christmas cakes, cookie boxes, and festival food hampers." },
  { title: "Corporate Wellness Workshops", desc: "Interactive culinary team-building and healthy workplace cooking modules." },
  { title: "Institutional Consulting", desc: "Menu engineering, recipe development, and nutritional audits for academies." }
];

const TimelineMilestones = [
  {
    year: "2000 - 2012",
    tag: "ACADEMIC EXCELLENCE",
    title: "12 Years as Assistant Professor & Chief Examiner",
    desc: "Served for 12 years as Assistant Professor of Computer Science at D.G. Vaishnav College, Chennai, and Chief Examiner for the University of Madras (UG Board, 2011-2012), shaping young minds with academic rigor."
  },
  {
    year: "2012",
    tag: "INITIAL SPARK",
    title: "Starting Cooking Classes with a Friend",
    desc: "Began conducting friendly hands-on cooking classes with a close friend, sharing culinary recipes and discovering a deep passion for teaching cooking skills."
  },
  {
    year: "2013",
    tag: "FOUNDING MOMENT",
    title: "Establishment of Sam's Culinary Art Class",
    desc: "Officially established Sam's Culinary Art Class in Chennai, transforming her passion and deep culinary knowledge into a premier academy with a mission to make culinary arts accessible, practical, and empowering for everyone."
  },
  {
    year: "2015 - Present",
    tag: "SIGNATURE EVENT",
    title: "Launch of 'Super MOM' Culinary Pageant",
    desc: "Initiated the annual 'Super MOM' Culinary & Personality Competition for mothers of all ages, celebrating skill, expression, and female leadership beyond the kitchen."
  },
  {
    year: "May 2019",
    tag: "PRESS FEATURE",
    title: "The New Indian Express — 'Taught with Tradition'",
    desc: "Featured in The New Indian Express (Chennai Edition) profiling Mrs. Vahitha Jeevanandam's 500+ recipe mastery, international students from 18+ countries, and culinary leadership."
  },
  {
    year: "2019 & 2025",
    tag: "PRESTIGIOUS HONOURS",
    title: "Entrepreneur of the Year & Best Teacher Award",
    desc: "Awarded 'Entrepreneur of the Year' in 2019 (CIMSME - MSME Honours) and honored with the 'Best Teacher Award 2025' by Lions Club for outstanding contribution to vocational education."
  },
  {
    year: "2024",
    tag: "CLINICAL NUTRITION",
    title: "Diploma in Clinical Nutrition and Dietetics",
    desc: "Completed her Diploma in Clinical Nutrition and Dietetics, integrating clinical nutrition science, dietary therapy, and wellness cooking into advanced modules."
  },
  {
    year: "Nov 2025",
    tag: "WORLD RECORD",
    title: "Fireless Cooking Event for 150 Special Children",
    desc: "Hosted India's First-Ever Mega Fireless Cooking Event for 150 differently-abled children at IHM Taramani, Chennai (Junior Magic Chefs Season 1), officially documented as a World Record Achievement."
  },
  {
    year: "Present",
    tag: "GLOBAL FOOTPRINT",
    title: "1400+ Students Across 40+ Countries & Convocation",
    desc: "ISO 22000:2018 Food Safety Certified, FSSAI Registered (Lic No: 22423544000118), MSME-Registered, and NSDC-Affiliated academy. Trained over 1400+ students from 40+ countries with placements in Canada, UAE, US, Europe, and 5-star hotels. Hosted the First Convocation in July 2025."
  }
];

export default function About() {
  const [activeTab, setActiveTab] = useState('overview');

  useSEO({
    title: "About Founder Mrs. M. Vahitha Jeevanandam | Sam's Culinary Art Classes",
    description: "Discover the full journey of Mrs. M. Vahitha Jeevanandam (MCA, M.Phil., Diploma in Clinical Nutrition and Dietetics) — Assistant Professor in the Department of Computer Science and Applications, Chief Examiner for UG board at University of Madras, and founder of Sam's Culinary Art Class.",
    keywords: "vahitha jeevanandam, about sams culinary, sams founder bio, m. vahitha jeevanandam pdf, best teacher award 2025, cimsme entrepreneur of the year, nsdc culinary instructor chennai, celebrity cooking instructor chennai, super mom competition, special children fireless cooking world record"
  });

  return (
    <div className="about-page-container container section-padding">

      {/* Editorial Hero Header */}
      <div className="section-title-wrapper" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="section-tag">— THE VISIONARY BEHIND THE ACADEMY</span>
        <h1 className="hero-title gradient-title-green" style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', marginBottom: '12px' }}>
          Founder &amp; Academy Story
        </h1>
        <p className="section-subtitle" style={{ fontSize: '1.1rem', maxWidth: '820px', margin: '0 auto 20px auto' }}>
          From Assistant Professor in the Department of Computer Science and Applications and Chief Examiner for UG board at University of Madras to Award-Winning Culinary Educator.
        </p>
        <div className="dotted-line-accent"><FlourishTop /></div>
      </div>

      {/* Hero Founder Profile Editorial Card */}
      <TiltCard className="founder-spotlight-card glass-panel" maxTilt={3} style={{ marginBottom: 'var(--space-8)' }}>
        <div className="founder-spotlight-grid">

          <div className="founder-photo-wrapper">
            <div className="founder-photo-card">
              <img
                src="/profile.webp"
                alt="Mrs. M. Vahitha Jeevanandam - Founder & Principal"
                className="founder-photo-img"
              />
            </div>
            <div className="founder-award-overlay">
              <span className="award-title">Best Teacher Award 2025</span>
              <h4 className="award-name">Mrs. M. Vahitha Jeevanandam</h4>
              <span className="award-degree">MCA, M.Phil., Dip. in Clinical Nutrition and Dietetics</span>
            </div>
          </div>

          <div className="founder-text-content">
            <span className="badge badge-category-sm founder-heritage-badge">
              12+ Years Heritage • Established 2013
            </span>

            <h2 className="founder-story-title">
              Stirring Confidence, Seasoning Passion &amp; Plating Purpose
            </h2>

            <p className="founder-story-para">
              Mrs. M. Vahitha Jeevanandam (MCA, M.Phil., Diploma in Clinical Nutrition and Dietetics) spent 12 years as Assistant Professor in the Department of Computer Science and Applications at D.G. Vaishnav College (2000–2012) and served as Chief Examiner for UG board at University of Madras. Her academic precision, combined with deep culinary knowledge and mastery, birthed Chennai&apos;s premier ISO &amp; NSDC-affiliated culinary academy.
            </p>

            <blockquote className="founder-quote">
              “At Sam’s Culinary Art Class, we don’t just teach recipes — we stir confidence, season passion, and plate purpose. Whether you are cooking for your family, your dreams, or the world — your journey begins here.”
            </blockquote>

            <div className="founder-pills-row">
              <span className="achievement-pill">
                <CheckCircleFilled style={{ color: 'var(--mango-yellow)' }} /> Lions Club Best Teacher 2025
              </span>
              <span className="achievement-pill">
                <CheckCircleFilled style={{ color: 'var(--mango-yellow)' }} /> CIMSME Entrepreneur of the Year 2019
              </span>
            </div>
          </div>

        </div>
      </TiltCard>

      {/* Key Badges Summary Grid */}
      <div className="key-badges-grid" style={{ marginBottom: 'var(--space-6)' }}>
        {KeyBadgesData.map((badge, idx) => (
          <TiltCard className="badge-card" key={idx} maxTilt={6}>
            <div className="badge-icon-wrapper">{badge.icon}</div>
            <div>
              <h4 className="badge-card-title">{badge.label}</h4>
              <span className="badge-card-sub">{badge.sub}</span>
            </div>
          </TiltCard>
        ))}
      </div>


      {/* High-Contrast Interactive Dark Tab Navigation Bar */}
      <div style={{
        background: 'var(--bg-surface-elevated)',
        border: '1px solid rgba(232, 167, 16, 0.25)',
        borderRadius: '20px',
        padding: '12px 14px',
        marginTop: 'var(--space-6)',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(16px)'
      }}>
        {[
          { key: 'overview', label: 'Story & Mission', icon: <BookOutlined /> },
          { key: 'faculty', label: 'Faculty & Team', icon: <TeamOutlined /> },
          { key: 'social-impact', label: 'World Record & Super MOM', icon: <CrownOutlined /> },
          { key: 'credentials', label: 'Celebrity Alumni', icon: <StarFilled /> },
          { key: 'entrepreneurs', label: 'Cloud Kitchens', icon: <RocketOutlined /> },
          { key: 'corporate', label: 'Corporate & Judging', icon: <SolutionOutlined /> },
          { key: 'courses', label: 'Modules Offered', icon: <ExperimentOutlined /> }
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                whiteSpace: 'nowrap',
                padding: '10px 20px',
                borderRadius: '9999px',
                border: isActive ? '1px solid #fced7e' : '1px solid rgba(255, 255, 255, 0.12)',
                background: isActive
                  ? 'linear-gradient(135deg, #e8a710 0%, #d49308 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#09150a' : 'var(--text-primary)',
                fontWeight: isActive ? '800' : '600',
                fontSize: '0.89rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isActive
                  ? '0 6px 22px rgba(232, 167, 16, 0.5), 0 0 0 2px rgba(232, 167, 16, 0.3)'
                  : '0 2px 6px rgba(0, 0, 0, 0.15)',
                transform: isActive ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span style={{ color: isActive ? '#09150a' : 'var(--mango-yellow)', fontSize: '15px' }}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Content Panels */}
      <div style={{ marginBottom: 'var(--space-12)' }}>

        {/* TAB 1: STORY & MISSION */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
            <TiltCard maxTilt={4} style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  <BookOutlined />
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.5rem' }}>
                  Founder Story &amp; Mission
                </h3>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Mrs. M. Vahitha Jeevanandam (MCA, M.Phil., Diploma in Clinical Nutrition and Dietetics) began her journey as an Assistant Professor in the Department of Computer Science and Applications at D.G. Vaishnav College, where she taught for 12 years (2000–2012) and served as Chief Examiner for UG board at University of Madras (2011–2012). Endowed with deep academic brilliance and heartfelt empathy, she shaped young minds with discipline and clarity.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                After starting hands-on cooking classes with a friend in 2012, she officially established <strong>Sam&apos;s Culinary Art Class</strong> in 2013. She designed her academy with a clear mission:
              </p>
              <div style={{ background: 'var(--green-light)', padding: '16px 20px', borderRadius: '16px', borderLeft: '4px solid var(--green-primary)', fontSize: '0.95rem', color: 'var(--green-primary)', fontWeight: '600', marginBottom: '16px' }}>
                “Make culinary skills accessible, practical, and empowering for every learner — no age, talent, gender, or background barrier.”
              </div>
            </TiltCard>

            <TiltCard maxTilt={4} style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  <HeartFilled style={{ color: '#e05252' }} />
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.5rem' }}>
                  Strength Through Adversity
                </h3>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Even during serious health challenges, Mrs. Vahitha continued to teach, mentor, and support her students with unwavering dedication. Her resilience transformed her academy into a space rich with warmth, patience, and strength — inspiring learners not just through cooking, but through her life story.
              </p>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.1rem', marginTop: '16px', marginBottom: '10px' }}>
                Core Values Nurtured in Every Student:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {CorePillarsData.map((pillar, idx) => (
                  <div key={idx} style={{ padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: '12px', border: 'var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--mango-yellow)', fontWeight: '700' }}>{pillar.num}</div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--green-primary)' }}>{pillar.title}</div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        )}

        {/* TAB 2: FACULTY & EXPERT INSTRUCTORS TEAM */}
        {activeTab === 'faculty' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <span className="badge badge-category-sm">Mentors &amp; Specialists</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.8rem', margin: '6px 0' }}>
                Our Faculty &amp; Expert Instructors Team
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
                Learners are trained by seasoned industry chefs, pastry artists, and traditional heritage tutors with decades of combined experience.
              </p>
            </div>

            {/* 1st Row: 2 Cards Equally Split */}
            <div className="faculty-grid-row-1">
              {FacultyTeamData.slice(0, 2).map((faculty, idx) => (
                <TiltCard key={idx} className="faculty-card" maxTilt={6}>
                  <div className="faculty-card-header">
                    <img
                      src={faculty.img}
                      alt={faculty.name}
                      className="faculty-avatar"
                    />
                    <div className="faculty-info">
                      <span className="faculty-credentials">
                        {faculty.credentials}
                      </span>
                      <h4 className="faculty-name">
                        {faculty.name}
                      </h4>
                      <div className="faculty-role">
                        {faculty.role}
                      </div>
                    </div>
                  </div>
                  <p className="faculty-bio">
                    {faculty.bio}
                  </p>
                </TiltCard>
              ))}
            </div>

            {/* 2nd Row: 3 Cards Equally Split */}
            <div className="faculty-grid-row-2">
              {FacultyTeamData.slice(2).map((faculty, idx) => (
                <TiltCard key={idx + 2} className="faculty-card" maxTilt={6}>
                  <div className="faculty-card-header">
                    <img
                      src={faculty.img}
                      alt={faculty.name}
                      className="faculty-avatar"
                    />
                    <div className="faculty-info">
                      <span className="faculty-credentials">
                        {faculty.credentials}
                      </span>
                      <h4 className="faculty-name">
                        {faculty.name}
                      </h4>
                      <div className="faculty-role">
                        {faculty.role}
                      </div>
                    </div>
                  </div>
                  <p className="faculty-bio">
                    {faculty.bio}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WORLD RECORDS & SUPER MOM */}
        {activeTab === 'social-impact' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'var(--space-6)' }}>

            {/* World Record Event */}
            <TiltCard className="world-record-card" maxTilt={4}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  <CrownOutlined style={{ color: 'var(--mango-yellow)' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--mango-yellow)', fontWeight: '700', textTransform: 'uppercase' }}>Officially Documented World Record</span>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.35rem' }}>
                    Fireless Cooking for 150 Special Children
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px' }}>
                Sam’s Culinary Art Class proudly partnered in organising <strong>India’s First-Ever Mega Fireless Cooking Event for 150 Special Children</strong> at <strong>IHM – Taramani, Chennai</strong> (Junior Magic Chefs Season 1 in association with Fossil Events &amp; Entertainment).
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  "150 differently-abled children trained in safe, engaging fireless cooking",
                  "Promoted ability, dignity, creativity & self-reliance through food",
                  "Documented as an official World Record Achievement for Social Impact",
                  "Special Guest Speaker invitation by CISF Chennai Port Authority"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    <CheckCircleFilled style={{ color: 'var(--mango-yellow)', marginTop: '3px', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </TiltCard>

            {/* Super MOM Signature Event */}
            <TiltCard className="world-record-card" maxTilt={4}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  <TrophyFilled style={{ color: 'var(--mango-yellow)' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--mango-yellow)', fontWeight: '700', textTransform: 'uppercase' }}>Annual Signature Event Since 2015</span>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.35rem' }}>
                    <CrownOutlined style={{ color: 'var(--mango-yellow)', marginRight: '6px' }} /> Super MOM – Skill &amp; Strength Pageant
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px' }}>
                Super MOM is a multi-round culinary and personality celebration for mothers of all ages. It is not just about cooking — it is about expression, leadership, and shining beyond the kitchen.
              </p>

              <blockquote style={{ background: 'var(--green-light)', borderLeft: '4px solid var(--green-primary)', padding: '12px 16px', borderRadius: '0 12px 12px 0', margin: '0 0 14px 0', fontSize: '0.88rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                “Every year, Super MOM crowns not just a winner — but dozens of women who walk out feeling seen, celebrated, and strong.”
              </blockquote>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {["Super MOM 2017", "Super MOM 2018", "Super MOM 2019", "Best Teacher 2025"].map((yr, idx) => (
                  <span key={idx} style={{ background: 'var(--bg-surface)', border: 'var(--border-subtle)', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--green-primary)' }}>
                    <TrophyFilled style={{ color: 'var(--mango-yellow)', marginRight: '4px' }} /> {yr}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>
        )}

        {/* TAB 4: CELEBRITY & VVIP STUDENTS */}
        {activeTab === 'credentials' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <span className="badge badge-category-sm">Distinguished Alumni</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.8rem', margin: '6px 0' }}>
                Celebrity &amp; VVIP Student Mentorship
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
                Trusted by TV stars, film director families, literary icons, and medical leaders for exclusive culinary training.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
              {CelebrityStudents.map((celeb, idx) => (
                <TiltCard key={idx} maxTilt={6} style={{ padding: '16px 20px', borderRadius: '16px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--mango-yellow)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {celeb.tag}
                  </span>
                  <h4 style={{ margin: '4px 0 2px 0', fontSize: '1.1rem', color: 'var(--green-primary)', fontFamily: 'var(--font-serif)' }}>
                    {celeb.name}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {celeb.desc}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CLOUD KITCHENS & GLOBAL REACH */}
        {activeTab === 'entrepreneurs' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>

            {/* Cloud Kitchens Launched */}
            <TiltCard maxTilt={4} style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  <RocketOutlined />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.4rem' }}>
                    Cloud Kitchens &amp; Food Businesses Launched
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Empowering Women &amp; Student Entrepreneurs</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                {CloudKitchensData.map((ck, idx) => (
                  <div key={idx} style={{ padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: '12px', border: 'var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h5 style={{ margin: 0, fontSize: '0.92rem', color: 'var(--green-primary)', fontFamily: 'var(--font-serif)' }}>
                        {ck.name}
                      </h5>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ck.desc}</span>
                    </div>
                    <CheckCircleFilled style={{ color: 'var(--mango-yellow)', fontSize: '16px' }} />
                  </div>
                ))}
              </div>
            </TiltCard>

            {/* International Footprint & Placements */}
            <TiltCard maxTilt={4} style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  <GlobalOutlined />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.4rem' }}>
                    Global Reach &amp; Placements (40+ Countries)
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Students placed in 5-Star Hotels, US, Canada, UAE &amp; Europe</span>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '14px' }}>
                Sam&apos;s Culinary Art Class has welcomed international students, NRI home cooks, and upskilled professional chefs from over 40 countries:
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {CountriesTrainedList.map((c, idx) => (
                  <span key={idx} style={{ background: 'var(--green-light)', color: 'var(--green-primary)', fontSize: '0.82rem', fontWeight: '600', padding: '5px 14px', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>{c.flag}</span>
                    <span>{c.name}</span>
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>
        )}

        {/* TAB 6: CORPORATE & JUDGING ROLES */}
        {activeTab === 'corporate' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>

            {/* Corporate & University Workshops */}
            <TiltCard maxTilt={4} style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  <SolutionOutlined />
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.4rem' }}>
                  Corporate, University &amp; Academy Trainings
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {CorporateTrainingsData.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    <CheckCircleFilled style={{ color: 'var(--green-primary)', marginTop: '3px', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </TiltCard>

            {/* Competition Judging Roles */}
            <TiltCard maxTilt={4} style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  <TrophyFilled style={{ color: 'var(--mango-yellow)' }} />
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.4rem' }}>
                  Judge for Culinary Competitions
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                {JudgingRolesData.map((j, idx) => (
                  <div key={idx} style={{ padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: '12px', border: 'var(--border-subtle)' }}>
                    <h5 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--green-primary)', fontFamily: 'var(--font-serif)' }}>
                      {j.title}
                    </h5>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{j.detail}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        )}

        {/* TAB 7: COURSES & COLLABORATIONS */}
        {activeTab === 'courses' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'var(--space-6)' }}>

            {/* Specialized Courses Offered */}
            <TiltCard maxTilt={4} className="specialized-modules-card">
              <div className="specialized-modules-header" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                  <ExperimentOutlined />
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.4rem' }}>
                  Specialized Modules Offered
                </h3>
              </div>

              <div className="specialized-modules-grid">
                {SpecializedCoursesData.map((course, idx) => (
                  <div key={idx} className="specialized-module-item">
                    <CheckCircleOutlined style={{ color: 'var(--green-medium)', flexShrink: 0 }} />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </TiltCard>

            {/* Strategic Collaboration Opportunities */}
            <TiltCard maxTilt={4} style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  <SolutionOutlined />
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.4rem' }}>
                  Strategic Collaborations &amp; Specialty Workshops
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {CollaborationsData.map((collab, idx) => (
                  <div key={idx} style={{ padding: '12px 16px', background: 'var(--bg-surface)', borderRadius: '12px', border: 'var(--border-subtle)' }}>
                    <h5 style={{ margin: '0 0 4px 0', fontSize: '0.92rem', color: 'var(--green-primary)', fontFamily: 'var(--font-serif)' }}>
                      <TeamOutlined style={{ color: 'var(--green-primary)', marginRight: '6px' }} /> {collab.title}
                    </h5>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                      {collab.desc}
                    </p>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        )}

      </div>

      {/* Restored 3D Core Pillars Section */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <div className="section-title-wrapper" style={{ marginBottom: 'var(--space-6)' }}>
          <span className="section-tag">— THE SAM&apos;S DIFFERENCE</span>
          <h2 className="section-title gradient-title-green">Our Core Pillars</h2>
          <p className="section-subtitle">Four foundational promises that set our culinary training apart.</p>
        </div>

        <div className="core-pillars-luxury-grid">
          {CorePillarsData.map((pillar, idx) => (
            <TiltCard key={idx} className="luxury-pillar-card" maxTilt={8}>
              <div className="pillar-card-header">
                <span className="pillar-num-badge">{pillar.num}</span>
                <div className="pillar-icon-box tilt-layer-depth-2">
                  {pillar.icon}
                </div>
              </div>
              <h3 className="pillar-card-title tilt-layer-depth-2">
                {pillar.title}
              </h3>
              <p className="pillar-card-desc tilt-layer-depth-1">
                {pillar.desc}
              </p>
              <div className="pillar-bottom-glow" />
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Interactive 3D Academy Brochure Section */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <div className="section-title-wrapper" style={{ marginBottom: 'var(--space-6)' }}>
          <span className="section-tag">— INTERACTIVE ACADEMY BROCHURE</span>
          <h2 className="section-title gradient-title-green">Explore Our 3D FlipBook Brochure</h2>
          <p className="section-subtitle">Flip through all 14 pages of our official academy brochure and company profile.</p>
        </div>

        <div style={{
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-3d)',
          border: 'var(--border-medium)'
        }}>
          <FlipBookViewer pdfType="about" />
        </div>
      </section>

      {/* Restored Historic Timeline Section */}
      <section>
        <div className="section-title-wrapper" style={{ marginBottom: 'var(--space-6)' }}>
          <span className="section-tag">MILESTONES &amp; EVOLUTION</span>
          <h2 className="section-title gradient-title-green">Our Historic Timeline</h2>
          <p className="section-subtitle">Key chapters that shaped our academy over the years.</p>
        </div>

        <div className="timeline-items-wrapper">
          {TimelineMilestones.map((item, idx) => (
            <TiltCard
              key={idx}
              maxTilt={4}
              className="timeline-card"
            >
              <div className="timeline-item-year">
                <span className="year-title">
                  {item.year}
                </span>
                <span className="year-tag">
                  {item.tag}
                </span>
              </div>
              <div className="timeline-item-content">
                <h4 className="timeline-item-heading">
                  {item.title}
                </h4>
                <p className="timeline-item-desc">
                  {item.desc}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

    </div>
  );
}
