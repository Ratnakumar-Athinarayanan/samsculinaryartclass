import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import {
  ClockCircleOutlined,
  ArrowRightOutlined,
  DownloadOutlined,
  EyeOutlined,
  FilePdfOutlined,
  ExperimentOutlined,
  TrophyOutlined,
  GiftOutlined
} from '@ant-design/icons';
import useSEO from '../hooks/useSEO';
import TiltCard from '../components/TiltCard';
import FlipBookViewer from '../components/FlipBookViewer';
import { CourseList } from '../data/coursesData';

const FlourishTop = () => (
  <svg viewBox="0 0 300 24" width="180" height="15" className="flourish-svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M 20 12 C 50 12, 70 8, 100 12 C 120 15, 130 15, 140 12" strokeLinecap="round" />
    <path d="M 20 12 C 15 12, 10 15, 12 17 C 18 18, 18 16 C 18 14, 15 13, 16 13" strokeLinecap="round" />
    <path d="M 280 12 C 250 12, 230 8, 200 12 C 180 15, 170 15, 160 12" strokeLinecap="round" />
    <path d="M 280 12 C 285 12, 290 15, 288 17 C 282 18, 282 16 C 284 13, 284 13" strokeLinecap="round" />
    <circle cx="150" cy="12" r="3.5" fill="currentColor" />
  </svg>
);

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFilter = searchParams.get('category') || 'All';
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);

  useSEO({
    title: "Cooking & Baking Courses in Chennai - South Indian, Continental, Multicuisine | Sam's",
    description: "Explore the complete course syllabus from Sam's Culinary Art Classes in Chennai. We teach South Indian, North Indian, Chinese, continental, and diabetic special diets, along with healthy baking workshops.",
    keywords: "cooking classes chennai, baking workshop chennai, south indian cooking class, continental dessert class, diabetes diet class, millet recipe class, cake baking classes chennai, cake icing class chennai, pasta making class, sams culinary courses, cookery courses, sam culinary syllabus pdf"
  });

  const filteredCourses = useMemo(() => {
    if (categoryFilter === 'All') return CourseList;
    return CourseList.filter(course => course.category === categoryFilter);
  }, [categoryFilter]);

  const selectCategory = (cat) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="courses-page-container container section-padding">

      {/* Page Title & Hero */}
      <div className="section-title-wrapper" style={{ marginBottom: 'var(--space-6)' }}>
        <span className="section-tag">— PROFESSIONAL CULINARY SYLLABUS</span>
        <h1 className="hero-title gradient-title-green" style={{ fontSize: 'clamp(2.1rem, 4vw, 3.4rem)', marginBottom: '12px' }}>
          Explore Our Courses &amp; Masterclasses
        </h1>
        <p className="section-subtitle" style={{ fontSize: '1.08rem', maxWidth: '780px', margin: '0 auto 20px auto' }}>
          Learn A to Z secrets of cooking and baking from traditional South &amp; North Indian to Continental, Chinese, and Pastry Arts.
        </p>
        <div className="dotted-line-accent"><FlourishTop /></div>
      </div>

      {/* PDF Download & Interactive Preview Action Banner */}
      <div className="glass-panel" style={{ padding: 'var(--space-4) var(--space-6)', marginBottom: 'var(--space-8)', borderRadius: '24px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
              <FilePdfOutlined />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--green-primary)' }}>
                Official Academy Course Brochure &amp; Syllabus PDF
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                16-Page complete dish lists, workshop schedules, and practical training details.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', position: 'relative', zIndex: 20 }}>
            <a
              href="/SAM-CULINARY_LQ.pdf"
              download="SAM-CULINARY-Syllabus.pdf"
              className="btn-primary btn-mango"
              style={{ fontSize: '0.9rem', padding: '10px 20px', position: 'relative', zIndex: 30, cursor: 'pointer' }}
            >
              <DownloadOutlined /> <span>Download Syllabus PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Batch Availability Announcement Ribbon */}
      <div className="glass-panel" style={{
        padding: '14px 24px',
        marginBottom: 'var(--space-6)',
        borderRadius: '50px',
        background: 'linear-gradient(135deg, var(--green-primary) 0%, var(--green-medium) 100%)',
        color: '#ffffff',
        border: '1px solid rgba(232, 167, 16, 0.35)',
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: '1px',
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        boxShadow: '0 8px 24px rgba(25, 65, 33, 0.28)'
      }}>
        <span style={{ color: 'var(--mango-yellow)', marginRight: '6px' }}>✦</span>
        <span>KIDS, ADULT, COUPLES, FRIENDS BATCH AVAILABLE</span>
        <span style={{ color: 'var(--mango-yellow)', marginLeft: '6px' }}>✦</span>
      </div>

      {/* Category Filter Pills */}
      <div className="gallery-tabs" style={{ marginBottom: 'var(--space-6)', gap: '8px' }}>
        {['All', 'Traditional Cuisines', 'International Cuisines', 'Baking & Pastry', 'Preservation & Drinks', 'Health & Wellness', 'Workshops & Special Batches', 'Smart Cooking', 'Consultations & Custom'].map((cat, idx) => (
          <button
            key={idx}
            className={`gallery-tab-btn ${categoryFilter === cat ? 'active' : ''}`}
            onClick={() => selectCategory(cat)}
          >
            {cat === 'All' ? 'All Courses' : cat}
          </button>
        ))}
      </div>

      {/* 3D Courses Grid */}
      <div className="courses-grid" style={{ minHeight: '350px', marginBottom: 'var(--space-10)' }}>
        {filteredCourses.map((course) => (
          <TiltCard className="course-card" key={course.id} maxTilt={0} scaleOnHover={true}>
            <div className="course-img-wrapper">
              <img src={course.img} alt={course.name} className="course-img" />
              {/* <span className="course-badge tilt-layer-depth-3">{course.badge}</span> */}
            </div>
            <div className="course-details">
              <h4 className="course-name tilt-layer-depth-2">
                {course.name}
              </h4>
              <p className="course-desc tilt-layer-depth-1">
                {course.desc}
              </p>

              <div className="course-action tilt-layer-depth-2">
                <div className="course-timing">
                  <ClockCircleOutlined />
                  <span>{course.duration}</span>
                </div>
                <Link to={`/courses/${course.id}`} className="course-learn-more">
                  <span>View Details</span>
                  <ArrowRightOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
                </Link>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Ant Design FlipBook Syllabus Preview Modal */}
      <Modal
        title="Sams Culinary Syllabus Brochure"
        open={isPdfPreviewOpen}
        onCancel={() => setIsPdfPreviewOpen(false)}
        footer={null}
        width={1000}
        destroyOnClose
        centered
        zIndex={10000}
      >
        <FlipBookViewer onClose={() => setIsPdfPreviewOpen(false)} />
      </Modal>

      {/* Official Syllabus Courses Taken List (Preserved from Academy Brochure) */}
      <TiltCard className="categories-card" style={{ marginTop: 'var(--space-8)' }} maxTilt={0} scaleOnHover={true}>
        <div className="categories-grid">
          {/* Column 1 */}
          <div>
            <h4 className="category-group-title tilt-layer-depth-2">
              <ExperimentOutlined style={{ color: 'var(--mango-yellow)', marginRight: '6px' }} /> Official Courses Taken
            </h4>
            <ul className="category-items-list tilt-layer-depth-1">
              <li className="category-item"><span className="category-icon-marker">✦</span> South Indian cuisine / North Indian cuisine</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Continental cuisine / Multi Cuisine</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Baking / Pastries / Icing and frosting</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Preservative juices and Jam</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Pickles – Veg and Non-Veg</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Diabetic special</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Slimming salads</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Seasonal workshop</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Kids camp – Summer and Winter</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="category-group-title tilt-layer-depth-2">
              <TrophyOutlined style={{ color: 'var(--mango-yellow)', marginRight: '6px' }} /> Specialized &amp; Custom Batches
            </h4>
            <ul className="category-items-list tilt-layer-depth-1">
              <li className="category-item"><span className="category-icon-marker">✦</span> Personalized classes for Couple</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Bachelor's Cooking</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Seperate batch for Men</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Customized Classes</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Foodtruck, Restaurant Consultations</li>
              <li className="category-item"><span className="category-icon-marker">✦</span> Simple recipes and tips for Working women</li>
            </ul>
          </div>
        </div>
      </TiltCard>

      {/* Custom Orders Banner */}
      <TiltCard className="orders-banner-ribbon" style={{ marginTop: 'var(--space-6)' }} maxTilt={0} scaleOnHover={true}>
        <div className="orders-banner-text tilt-layer-depth-2">
          <GiftOutlined className="orders-banner-icon" style={{ fontSize: '32px', color: 'var(--mango-yellow)' }} />
          <div>
            <h4 className="orders-banner-title">Custom Baking &amp; Food Orders Accepted</h4>
            <p className="orders-banner-subtitle">We bake fresh custom cakes, cupcakes, healthy wheat muffins, diabetic-friendly cakes, and festival sweet boxes.</p>
          </div>
        </div>
        <Link to="/contact" className="btn-primary btn-mango tilt-layer-depth-3">
          Order Now
        </Link>
      </TiltCard>

    </div>
  );
}
