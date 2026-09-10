import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  InstagramOutlined,
  UsergroupAddOutlined,
  CrownOutlined,
  TrophyFilled,
  SolutionOutlined,
  GlobalOutlined,
  StarFilled,
  ExportOutlined,
  FireOutlined,
  AuditOutlined
} from '@ant-design/icons';
import useSEO from '../hooks/useSEO';
import TiltCard from '../components/TiltCard';

const FlourishTop = () => (
  <svg viewBox="0 0 300 24" width="180" height="15" className="flourish-svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M 20 12 C 50 12, 70 8, 100 12 C 120 15, 130 15, 140 12" strokeLinecap="round" />
    <path d="M 20 12 C 15 12, 10 15, 12 17 C 18 18, 18 16 C 18 14, 15 13, 16 13" strokeLinecap="round" />
    <path d="M 280 12 C 250 12, 230 8, 200 12 C 170 15, 170 15, 160 12" strokeLinecap="round" />
    <path d="M 280 12 C 285 12, 290 15, 288 17 C 282 18, 282 16 C 285 13, 284 13" strokeLinecap="round" />
    <circle cx="150" cy="12" r="3.5" fill="currentColor" />
  </svg>
);

const TabHeaderInfo = {
  awards: {
    tag: "Accreditation & Honor",
    title: "Awards & Honours – Recognizing Institutional Excellence",
    quote: "Over 12+ years of culinary academic leadership, Lions Club Best Teacher Awards, CIMSME Entrepreneur honors, and CISF recognition."
  },
  fcsc: {
    tag: "World Record Event",
    title: "Fireless Cooking – 150 Special Children Mega Event",
    quote: "India's first-ever mega fireless cooking championship for 150 special children at IHM Taramani, documented in the Grand Universe Book of Records."
  },
  guest: {
    tag: "Institutional Outreach",
    title: "Guest Speaker & Corporate Culinary Workshops",
    quote: "Special guest lectures, CISF Chennai Port Authority demonstrations, and institutional masterclasses across educational and corporate platforms."
  },
  media: {
    tag: "Press & Publications",
    title: "Media & Press – Newspaper, Television & Magazine Coverage",
    quote: "Featured in The New Indian Express ('Taught with Tradition'), national TV broadcasts, and premier print publications."
  },
  supermom: {
    tag: "Annual Pageant",
    title: "Super MOM – Celebrating Skill & Strength Since 2015",
    quote: "Every year, Super MOM crowns not just a winner — but dozens of women who walk out feeling seen, celebrated, and strong."
  },
  pongal: {
    tag: "Festival Celebration",
    title: "Pongal Celebration – Traditional Tamil Harvest Festivities",
    quote: "Celebrating Tamil Nadu's sacred harvest tradition through traditional sweet pongal cooking, sugarcane feasts, clay pot rituals, and vibrant kitchen togetherness."
  },
  internship: {
    tag: "Career Development",
    title: "Internship Programme – Hands-on Commercial Kitchen Training",
    quote: "Equipping students with professional kitchen staging, 5-star hotel placements, bulk production workflow, and real-world commercial culinary industry experience."
  },
  students: {
    tag: "Student Community",
    title: "Students Gallery – Hands-on Kitchen Learning & Studio Practice",
    quote: "Inside our vibrant cooking studio — students practicing hands-on recipes, cake decorating, studio masterclasses, and celebrating culinary milestones together."
  }
};

const GalleryItems = [
  // Award Folder (Awards & Honours)
  { id: 301, category: "awards", title: "Lions Club Best Teacher Award 2025", tag: "Award", desc: "Honoured with the Best Teacher Award 2025 by Lions Club for excellence in vocational culinary education.", img: "/Award/Screenshot 2026-07-30 at 1.41.59 PM.webp" },
  { id: 302, category: "awards", title: "CIMSME Entrepreneur of the Year Award", tag: "Award", desc: "Recognized as Entrepreneur of the Year (CIMSME - MSME Honours) for culinary business entrepreneurship.", img: "/Award/Screenshot 2026-07-30 at 1.52.49 PM copy.webp" },
  { id: 303, category: "awards", title: "Vocational Excellence & Leadership Honor", tag: "Award", desc: "Prestigious recognition for 12+ years of culinary academic leadership and institutional excellence.", img: "/Award/Screenshot 2026-07-30 at 1.55.42 PM.webp" },
  { id: 304, category: "awards", title: "Honoured by CISF Chennai Port Authority", tag: "Award", desc: "Honoured by CISF Chennai Port Authority for fireless cooking workshop at their community centre.", img: "/Guest/Screenshot 2026-07-30 at 1.49.58 PM.webp" },
  { id: 305, category: "awards", title: "Special Jury Award Honor", tag: "Award", desc: "Honoured with the Special Jury Award for outstanding dedication and contribution to culinary arts education.", img: "/Award/Screenshot 2026-08-05 at 1.46.38 PM.webp" },

  // FCSC Folder (Fireless Cooking Special Children / World Record)
  { id: 401, category: "fcsc", title: "150 Special Children Mega Fireless Cooking Event", tag: "World Record", desc: "India's First-Ever Mega Fireless Cooking Event for 150 Special Children hosted at IHM Taramani, Chennai.", img: "/FCSC/Screenshot 2026-07-30 at 1.42.20 PM.webp" },
  { id: 402, category: "fcsc", title: "Grand Universe Book of Records", tag: "World Record", desc: "Officially documented in Book of Records for promoting dignity, ability, and self-reliance through food.", img: "/FCSC/Screenshot 2026-07-30 at 1.42.41 PM.webp" },

  // Guest Folder (Guest Speaker & Events)
  {
    id: 501,
    category: "guest",
    title: "Millet Mela at CISF, Chennai Port Trust",
    tag: "Guest Speaker",
    desc: "Guest Speaker for Millet Mela at CISF, Port Trust, Chennai — trained the cooks and CISF personnel wives in healthy millet culinary techniques.",
    img: "/Guest/guest event.jpeg"
  },
  {
    id: 502,
    category: "guest",
    title: "AAFT University Millet Deepavali Webinar",
    tag: "Guest Speaker",
    desc: "First online Webinar on Millet Deepavali Sweets and Snacks conducted for AAFT University Clinical Nutrition and Dietetics students.",
    img: "/Guest/webinar.jpeg"
  },
  { id: 503, category: "guest", title: "CISF Chennai Port Authority Special Guest Speaker", tag: "Guest Speaker", desc: "Invited as Special Guest Speaker by CISF Chennai Port Authority.", img: "/Guest/Screenshot 2026-07-30 at 1.43.45 PM.webp" },
  { id: 504, category: "guest", title: "Institutional Culinary Workshops & Live Demos", tag: "Guest Speaker", desc: "Conducting guest lectures and skill development workshops across corporate and educational platforms.", img: "/Guest/Screenshot 2026-07-30 at 1.56.03 PM.webp" },

  // Media Folder (Media & Press)
  { id: 600, category: "media", title: "The New Indian Express — 'Taught with Tradition'", tag: "Press Feature", desc: "Featured in The New Indian Express (Chennai Edition) profiling Mrs. Vahitha Jeevanandam's 500+ recipe mastery, international students from 18+ countries, and Sam's Culinary Art Class.", img: "/Media/nie_taught_with_tradition.webp", url: "https://www.newindianexpress.com/cities/chennai/2019/May/30/taught-with-tradition-1983533.html" },
  { id: 601, category: "media", title: "Featured Television Media & Press Coverage", tag: "Media & Press", desc: "Featured on leading regional and national television channels highlighting academy achievements.", img: "/Media/Screenshot 2026-07-30 at 1.56.43 PM.webp" },
  { id: 602, category: "media", title: "Newspaper & Magazine Press Publications", tag: "Media & Press", desc: "Print media coverage celebrating culinary education, Super MOM pageants, and student successes.", img: "/Media/Screenshot 2026-07-30 at 1.56.51 PM.webp" },
  { id: 603, category: "media", title: "Live TV Cooking Masterclass Demonstration", tag: "Media & Press", desc: "Live stage demonstrations at Chennaivil Thiruvaiyaru and state-wide culinary pageants.", img: "/Media/Screenshot 2026-07-30 at 1.57.03 PM.webp" },
  { id: 604, category: "media", title: "Newspaper Clip", tag: "Social Impact", desc: "150 Special Children Mega Fireless Cooking Event", img: "/FCSC/Screenshot 2026-07-30 at 1.43.00 PM.webp" },

  // SM Folder (Super MOM)
  { id: 701, category: "supermom", title: "Super MOM Annual Culinary Pageant Crown", tag: "Super MOM", desc: "Annual culinary and personality celebration for mothers of all ages celebrating skill and female leadership.", img: "/SM/Screenshot 2026-07-30 at 1.36.10 PM.webp" },
  { id: 702, category: "supermom", title: "Super MOM Personality & Talent Rounds", tag: "Super MOM", desc: "Mothers shining beyond the kitchen through expression, confidence, and culinary talent.", img: "/SM/Screenshot 2026-07-30 at 1.36.23 PM.webp" },
  { id: 707, category: "supermom", title: "Super MOM Grand Finale Winners Celebration", tag: "Super MOM", desc: "Crowning ceremony celebrating the top winners and participants of Super MOM.", img: "/SM/Screenshot 2026-07-30 at 1.44.33 PM.webp" },
  { id: 704, category: "supermom", title: "Super MOM Trophy & Certificate Presentation", tag: "Super MOM", desc: "Honouring outstanding mothers with trophies, titles, and rewards since 2015.", img: "/SM/Screenshot 2026-07-30 at 1.37.14 PM.webp" },
  { id: 703, category: "supermom", title: "Super MOM Live Cooking Showcase", tag: "Super MOM", desc: "Live cooking round where participants prepare gourmet dishes for expert judging.", img: "/SM/Screenshot 2026-07-30 at 1.36.39 PM.webp" },
  { id: 705, category: "supermom", title: "Super MOM Mothers Culinary Skill Championship", tag: "Super MOM", desc: "Empowering mothers of all generations to express their passion and creativity.", img: "/SM/Screenshot 2026-07-30 at 1.37.25 PM.webp" },
  { id: 706, category: "supermom", title: "Super MOM Stage & Empowerment Ceremony", tag: "Super MOM", desc: "A grand stage for mothers to feel celebrated, seen, and empowered.", img: "/SM/Screenshot 2026-07-30 at 1.37.41 PM.webp" },
  { id: 708, category: "supermom", title: "Super MOM Special Moments 8", tag: "Super MOM", desc: "Super MOM Celebration", img: "/SM/2.webp" },
  { id: 709, category: "supermom", title: "Super MOM Special Moments 9", tag: "Super MOM", desc: "Super MOM Celebration", img: "/SM/sc1.webp" },

  // Pongal Celebration Tab (public/Pongal images)
  { id: 801, category: "pongal", title: "Pongal Celebration 1", tag: "Pongal Special", desc: "Pongal Celebration", img: "/Pongal/1.webp" },
  { id: 803, category: "pongal", title: "Pongal Celebration 3", tag: "Pongal Special", desc: "Pongal Celebration", img: "/Pongal/3.webp" },
  { id: 804, category: "pongal", title: "Pongal Celebration 4", tag: "Pongal Special", desc: "Pongal Celebration", img: "/Pongal/4.webp" },
  { id: 805, category: "pongal", title: "Pongal Celebration 5", tag: "Pongal Special", desc: "Pongal Celebration", img: "/Pongal/5.webp" },
  { id: 806, category: "pongal", title: "Pongal Celebration 6", tag: "Pongal Special", desc: "Pongal Celebration", img: "/Pongal/6.webp" },
  { id: 807, category: "pongal", title: "Pongal Celebration 7", tag: "Pongal Special", desc: "Pongal Celebration", img: "/Pongal/7.webp" },
  { id: 808, category: "pongal", title: "Pongal Celebration 8", tag: "Pongal Special", desc: "Pongal Celebration", img: "/Pongal/8.webp" },

  // Internship Programme Tab (public/internship images)
  { id: 901, category: "internship", title: "Internship Programme 1", tag: "Internship", desc: "Internship Programme", img: "/internship/i.webp" },
  { id: 902, category: "internship", title: "Internship Programme 2", tag: "Internship", desc: "Internship Programme", img: "/internship/i1.webp" },
  { id: 903, category: "internship", title: "Internship Programme 3", tag: "Internship", desc: "Internship Programme", img: "/internship/i2.webp" },

  // Students Gallery Tab (public/student_gallery images)
  { id: 102, category: "students", title: "Student Gallery 2", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/2.jpeg" },
  { id: 103, category: "students", title: "Student Gallery 3", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/3.jpeg" },
  { id: 104, category: "students", title: "Student Gallery 4", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/4.jpeg" },
  { id: 105, category: "students", title: "Student Gallery 5", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/5.jpeg" },
  { id: 106, category: "students", title: "Student Gallery 6", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/6.jpeg" },
  { id: 107, category: "students", title: "Student Gallery 7", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/7.jpeg" },
  { id: 108, category: "students", title: "Student Gallery 8", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/8.webp" },
  { id: 109, category: "students", title: "Student Gallery 9", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/9.webp" },
  { id: 110, category: "students", title: "Student Gallery 10", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/10.webp" },
  { id: 111, category: "students", title: "Student Gallery 11", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/11.webp" },
  { id: 112, category: "students", title: "Student Gallery 12", tag: "Students Gallery", desc: "Student Gallery", img: "/student_gallery/12.webp" }
];

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'awards';

  useSEO({
    title: "Gallery & Photo Showcase | Sam's Culinary Art Classes",
    description: "Explore our official gallery featuring Awards, Fireless Cooking, Guest Speaker Events, Media Coverage, Super MOM pageants, Pongal celebrations, Internship programs, and Student sessions from Sam's Culinary Art Classes in Chennai.",
    keywords: "awards gallery sams culinary, fireless cooking fcsc photos, guest speaker cisf photos, media press coverage, super mom pageant photos, pongal celebration photos, internship programme gallery, students gallery sams culinary"
  });

  const selectTab = (tab) => {
    searchParams.set('tab', tab);
    setSearchParams(searchParams);
  };

  const filteredItems = GalleryItems.filter(item => item.category === activeTab);

  const isImagesOnlyTab = activeTab === 'supermom' || activeTab === 'pongal' || activeTab === 'internship' || activeTab === 'students';
  const useCoverImage = isImagesOnlyTab || activeTab === 'awards' || activeTab === 'guest';

  return (
    <div className="gallery-page-container container section-padding">
      {/* Editorial Header */}
      <div className="section-title-wrapper" style={{ marginBottom: 'var(--space-6)' }}>
        <span className="section-tag">— CULINARY SHOWCASE &amp; CREATIONS</span>
        <h1 className="hero-title gradient-title-green" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '12px' }}>
          Explore Our Gallery
        </h1>
        <p className="section-subtitle" style={{ fontSize: '1.08rem' }}>
          Browse our official Awards, Fireless Cooking, Guest Speaker events, Media coverage, Super MOM pageants, Pongal celebrations, Internship programs, and Student sessions.
        </p>
        <div className="dotted-line-accent"><FlourishTop /></div>
      </div>

      {/* Segmented Glass Filter Tabs */}
      <div className="gallery-tabs-wrapper">
        <div className="gallery-tabs">
          <button
            className={`gallery-tab-btn ${activeTab === 'awards' ? 'active' : ''}`}
            onClick={() => selectTab('awards')}
          >
            <TrophyFilled style={{ marginRight: '6px' }} /> Awards &amp; Honours
          </button>
          <button
            className={`gallery-tab-btn ${activeTab === 'fcsc' ? 'active' : ''}`}
            onClick={() => selectTab('fcsc')}
          >
            <CrownOutlined style={{ marginRight: '6px' }} /> Fireless Cooking
          </button>
          <button
            className={`gallery-tab-btn ${activeTab === 'guest' ? 'active' : ''}`}
            onClick={() => selectTab('guest')}
          >
            <SolutionOutlined style={{ marginRight: '6px' }} /> Guest Speaker
          </button>
          <button
            className={`gallery-tab-btn ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => selectTab('media')}
          >
            <GlobalOutlined style={{ marginRight: '6px' }} /> Media &amp; Press
          </button>
          <button
            className={`gallery-tab-btn ${activeTab === 'supermom' ? 'active' : ''}`}
            onClick={() => selectTab('supermom')}
          >
            <StarFilled style={{ marginRight: '6px' }} /> Super Mom
          </button>
          <button
            className={`gallery-tab-btn ${activeTab === 'pongal' ? 'active' : ''}`}
            onClick={() => selectTab('pongal')}
          >
            <FireOutlined style={{ marginRight: '6px' }} /> Pongal Celebration
          </button>
          <button
            className={`gallery-tab-btn ${activeTab === 'internship' ? 'active' : ''}`}
            onClick={() => selectTab('internship')}
          >
            <AuditOutlined style={{ marginRight: '6px' }} /> Internship Programme
          </button>
          <button
            className={`gallery-tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => selectTab('students')}
          >
            <UsergroupAddOutlined style={{ marginRight: '6px' }} /> Students Gallery
          </button>
        </div>
      </div>

      {/* Dynamic Tab Hero Panel */}
      {TabHeaderInfo[activeTab] && (
        <div className="glass-panel" key={`header-${activeTab}`} style={{
          padding: '32px 28px',
          marginBottom: 'var(--space-8)',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(13, 31, 16, 0.9) 0%, rgba(20, 48, 26, 0.95) 100%)',
          border: '1px solid rgba(232, 167, 16, 0.4)',
          textAlign: 'center',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)'
        }}>
          <span className="section-tag" style={{ fontSize: '0.82rem', letterSpacing: '2px', color: 'var(--mango-yellow)', marginBottom: '8px', display: 'inline-block' }}>
            {TabHeaderInfo[activeTab].tag}
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#ffffff', fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '16px', lineHeight: '1.3' }}>
            {TabHeaderInfo[activeTab].title}
          </h2>
          <blockquote style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.08rem',
            fontStyle: 'italic',
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: '1.7',
            paddingLeft: '16px',
            borderLeft: '3px solid var(--mango-yellow)'
          }}>
            "{TabHeaderInfo[activeTab].quote}"
          </blockquote>
        </div>
      )}

      {/* 3D Courses-Grid Card Layout with Key to Force Clean Re-render per Tab */}
      <div className="courses-grid" key={`grid-${activeTab}`} style={{ minHeight: '350px', marginBottom: 'var(--space-8)' }}>
        {filteredItems.map((item) => (
          <TiltCard
            key={item.id}
            maxTilt={6}
            style={{
              padding: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: isImagesOnlyTab ? 'fit-content' : '100%'
            }}
          >
            <div style={{ position: 'relative', height: isImagesOnlyTab ? '260px' : '240px', overflow: 'hidden', background: '#09150a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isImagesOnlyTab ? '0' : '6px' }}>
              {/* Ambient Blurred Fill Background (Removes empty black spacing) */}
              <img
                src={item.img}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(16px) brightness(0.5) saturate(1.2)',
                  transform: 'scale(1.15)',
                  pointerEvents: 'none'
                }}
              />
              {/* Foreground Image */}
              <img
                src={item.img}
                alt={item.title}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: useCoverImage ? '100%' : 'auto',
                  height: useCoverImage ? '100%' : 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: useCoverImage ? 'cover' : 'contain',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  borderRadius: isImagesOnlyTab ? '0' : '6px',
                  transition: 'transform 400ms ease'
                }}
                className="gallery-hover-img"
              />
            </div>

            {/* Card Content Details - Hidden for Super MOM, Pongal, Internship, and Students tabs */}
            {!isImagesOnlyTab && (
              <div style={{ padding: 'var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 className="gallery-card-title">
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                    {item.desc}
                  </p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{
                        marginTop: '14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.82rem',
                        padding: '6px 14px',
                        color: 'var(--mango-yellow)',
                        borderColor: 'rgba(232, 167, 16, 0.4)',
                        textDecoration: 'none'
                      }}
                    >
                      <span>Read Article</span>
                      <ExportOutlined style={{ fontSize: '12px' }} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </TiltCard>
        ))}
      </div>

      {/* Featured TV Networks Logos Below Media Cards */}
      {activeTab === 'media' && (
        <div className="glass-panel" style={{
          padding: '24px 28px',
          marginBottom: 'var(--space-8)',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(13, 31, 16, 0.85) 0%, rgba(20, 48, 26, 0.9) 100%)',
          border: '1px solid rgba(232, 167, 16, 0.35)',
          textAlign: 'center'
        }}>
          <span className="section-tag" style={{ fontSize: '0.78rem', letterSpacing: '1.5px', marginBottom: '8px', display: 'inline-block' }}>
            TELEVISION BROADCAST NETWORKS
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--mango-yellow)', fontSize: '1.25rem', marginBottom: '20px' }}>
            As Featured On Leading TV Channels
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '850px',
            margin: '0 auto'
          }}>
            <div style={{ background: 'rgba(15, 26, 17, 0.8)', padding: '16px 12px', borderRadius: '14px', border: '1px solid rgba(232, 167, 16, 0.25)', textAlign: 'center', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/Media/tv_networks/jaya_tv.webp" alt="Jaya TV Logo" style={{ maxWidth: '100%', maxHeight: '70px', objectFit: 'contain', marginBottom: '10px' }} />
              <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#ffffff', display: 'block' }}>Jaya TV</span>
            </div>
            <div style={{ background: 'rgba(15, 26, 17, 0.8)', padding: '16px 12px', borderRadius: '14px', border: '1px solid rgba(232, 167, 16, 0.25)', textAlign: 'center', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/Media/tv_networks/mega_tv.webp" alt="Mega TV Logo" style={{ maxWidth: '100%', maxHeight: '70px', objectFit: 'contain', marginBottom: '10px' }} />
              <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#ffffff', display: 'block' }}>Mega TV</span>
            </div>
            <div style={{ background: 'rgba(15, 26, 17, 0.8)', padding: '16px 12px', borderRadius: '14px', border: '1px solid rgba(232, 167, 16, 0.25)', textAlign: 'center', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/Media/tv_networks/vendhar_tv.webp" alt="Vendhar TV Logo" style={{ maxWidth: '100%', maxHeight: '70px', objectFit: 'contain', marginBottom: '10px' }} />
              <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#ffffff', display: 'block' }}>Vendhar TV</span>
            </div>
            <div style={{ background: 'rgba(15, 26, 17, 0.8)', padding: '16px 12px', borderRadius: '14px', border: '1px solid rgba(232, 167, 16, 0.25)', textAlign: 'center', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/Media/tv_networks/velicham_tv.webp" alt="Velicham TV Logo" style={{ maxWidth: '100%', maxHeight: '70px', objectFit: 'contain', marginBottom: '10px' }} />
              <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#ffffff', display: 'block' }}>Velicham TV</span>
            </div>
            <div style={{ background: 'rgba(15, 26, 17, 0.8)', padding: '16px 12px', borderRadius: '14px', border: '1px solid rgba(232, 167, 16, 0.25)', textAlign: 'center', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/Media/tv_networks/win_tv.webp" alt="Win TV Logo" style={{ maxWidth: '100%', maxHeight: '70px', objectFit: 'contain', marginBottom: '10px' }} />
              <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#ffffff', display: 'block' }}>Win TV</span>
            </div>
          </div>
        </div>
      )}

      {/* Instagram Call to Action */}
      <div style={{ textAlign: 'center' }}>
        <a
          href="https://instagram.com/samsculinaryartclassofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
          style={{ gap: '8px', fontSize: '0.92rem' }}
        >
          <InstagramOutlined style={{ fontSize: '18px', color: '#e1306c' }} />
          <span>Follow Us on Instagram @samsculinaryartclassofficial</span>
        </a>
      </div>

    </div>
  );
}
