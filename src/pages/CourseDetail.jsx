import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  FilePdfOutlined,
  BookOutlined,
  ReadOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import useSEO from '../hooks/useSEO';
import TiltCard from '../components/TiltCard';
import { CourseList } from '../data/coursesData';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find course by ID
  const course = CourseList.find(c => c.id === id) || CourseList[0];

  // Set page SEO dynamically
  useSEO({
    title: `${course.name} | Sam's Culinary Art Class`,
    description: course.desc,
    keywords: `${course.name}, cooking course chennai, ${course.category} masterclass`
  });

  // Other related courses excluding current
  const relatedCourses = CourseList.filter(c => c.id !== course.id).slice(0, 3);

  return (
    <div className="course-detail-page animate-fade-in" style={{ paddingBottom: 'var(--space-12)' }}>

      {/* Hero Banner Section — Light mint background in Light Mode, dark green in Dark Mode */}
      <section style={{
        background: 'var(--green-light)',
        color: 'var(--text-primary)',
        padding: 'var(--space-8) 0',
        borderBottom: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="container">

          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link to="/courses" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Courses</Link>
            <span>/</span>
            <span style={{ color: 'var(--green-primary)', fontWeight: '700' }}>{course.name}</span>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/courses')}
            style={{
              background: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              border: 'var(--border-subtle)',
              padding: '6px 16px',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '0.84rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: 'var(--space-6)',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 200ms ease'
            }}
          >
            <ArrowLeftOutlined /> Back to All Courses
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>

            {/* Left Image */}
            <TiltCard maxTilt={0} scaleOnHover={true} style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img
                src={course.img}
                alt={course.name}
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
              />
            </TiltCard>

            {/* Right Course Details */}
            <div>
              <span className="badge" style={{ background: 'var(--mango-yellow)', color: '#142718', fontWeight: '800', fontSize: '0.8rem', padding: '5px 14px', borderRadius: '9999px', marginBottom: '14px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {course.category} Module
              </span>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: 'var(--green-primary)', margin: '0 0 14px 0', lineHeight: 1.25, fontWeight: '700' }}>
                {course.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--green-primary)', fontWeight: '700', fontSize: '0.96rem' }}>
                  <ClockCircleOutlined style={{ color: 'var(--mango-yellow)' }} /> {course.duration}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.92rem' }}>
                  <SafetyCertificateOutlined style={{ color: 'var(--green-primary)' }} /> ISO &amp; NSDC Affiliated Certificate
                </span>
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
                {course.fullDesc}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Call Now for Enquiry (Always shown for all courses) */}
                <a
                  href="tel:+918939648457"
                  className="btn-primary btn-mango"
                  style={{ padding: '12px 24px', fontSize: '0.92rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <PhoneOutlined /> <span>Call Now for Enquiry</span>
                </a>

                {course.hideSyllabusPdf ? (
                  /* For the 11 specialized/consultation modules: Show Chat for Enquiry (WhatsApp), Hide PDF */
                  <a
                    href={`https://wa.me/918939648457?text=${encodeURIComponent(course.whatsappMessage || `Hi Sam's Culinary Art Class, I would like to enquire about ${course.name}. Please share details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-chat-enquiry"
                    style={{
                      padding: '12px 24px',
                      fontSize: '0.92rem',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <WhatsAppOutlined style={{ fontSize: '18px' }} /> <span>Chat for Enquiry</span>
                  </a>
                ) : (
                  /* For all other modules: Show Download Syllabus PDF, Hide Chat */
                  <a
                    href={course.syllabusPdf || "/SAM-CULINARY_LQ.pdf"}
                    download={course.syllabusPdf ? course.syllabusPdf.split('/').pop() : "SAM-CULINARY-Syllabus.pdf"}
                    className="btn-secondary"
                    style={{ padding: '12px 22px', fontSize: '0.92rem' }}
                  >
                    <FilePdfOutlined /> <span>Download Syllabus PDF</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Detail Content Container */}
      <div className="container" style={{ marginTop: 'var(--space-10)' }}>

        {/* Section 1: Complete Dishes Included Grid */}
        {/* <section style={{ marginBottom: 'var(--space-12)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="badge badge-category-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Full Syllabus
            </span>
            <h2 className="section-title" style={{ marginTop: '8px' }}>
              Dishes &amp; Modules Taught ({course.dishes?.length || 0} Items)
            </h2>
            <p className="section-subtitle">
              Every dish is taught from scratch with 100% hands-on practical student cooking under direct expert guidance.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {course.dishes?.map((dish, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: 'var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 200ms ease'
                }}
              >
                <div style={{ background: 'var(--green-light)', color: 'var(--green-primary)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '700', fontSize: '0.82rem' }}>
                  {idx + 1}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                    {dish}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-block', marginTop: '4px' }}>
                    <CheckCircleOutlined style={{ color: 'var(--green-primary)', marginRight: '4px' }} /> 100% Practical Recipe
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Section 2: Key Learning Highlights & Outcomes */}
        <section style={{ marginBottom: 'var(--space-12)', marginTop: 'var(--space-12)', background: 'var(--green-light)', borderRadius: '24px', padding: 'var(--space-8)', border: 'var(--border-subtle)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.45rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOutlined /> Key Course Highlights
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {course.highlights?.map((hl, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    <CheckCircleOutlined style={{ color: 'var(--mango-yellow)', fontSize: '18px' }} />
                    <strong style={{ fontWeight: '600' }}>{hl}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green-primary)', fontSize: '1.45rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ReadOutlined /> Learning Outcomes
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {course.outcomes?.map((oc, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>✓</span>
                    <span>{oc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Client & Entrepreneur Showcase */}
        {course.clientShowcase && course.clientShowcase.length > 0 && (
          <section style={{ marginBottom: 'var(--space-12)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <span className="badge badge-category-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Success Stories
              </span>
              <h2 className="section-title" style={{ marginTop: '8px' }}>
                Entrepreneurs &amp; Brands Consulted by Us
              </h2>
              <p className="section-subtitle">
                Proud to mentor and consult emerging food entrepreneurs, food trucks, and restaurant brands across Tamil Nadu.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {course.clientShowcase.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    border: 'var(--border-subtle)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'transform 200ms ease, box-shadow 200ms ease'
                  }}
                >
                  <div style={{ position: 'relative', height: '300px', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                    {item.tag && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '14px',
                          left: '14px',
                          background: 'var(--mango-yellow)',
                          color: '#142718',
                          fontWeight: '800',
                          fontSize: '0.75rem',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '20px 22px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1.15rem', fontWeight: '700', color: 'var(--green-primary)' }}>
                      {item.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Featured & Related Courses */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span className="badge badge-category-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Explore More
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--green-primary)', margin: '4px 0 0 0' }}>
                Featured &amp; Related Courses
              </h3>
            </div>
            <Link to="/courses" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.84rem' }}>
              View All Courses <ArrowRightOutlined />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
            {relatedCourses.map((relCourse) => (
              <TiltCard className="course-card" key={relCourse.id} maxTilt={0} scaleOnHover={true}>
                <div className="course-img-wrapper">
                  <img src={relCourse.img} alt={relCourse.name} className="course-img" />
                  <span className="course-badge tilt-layer-depth-3">{relCourse.badge}</span>
                </div>

                <div className="course-details">
                  <h4 className="course-name tilt-layer-depth-2">
                    {relCourse.name}
                  </h4>
                  <p className="course-desc tilt-layer-depth-1">
                    {relCourse.desc}
                  </p>

                  <div className="course-action tilt-layer-depth-2">
                    <div className="course-timing">
                      <ClockCircleOutlined />
                      <span>{relCourse.duration}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/courses/${relCourse.id}`)}
                      className="course-learn-more"
                    >
                      <span>View Details</span>
                      <ArrowRightOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
