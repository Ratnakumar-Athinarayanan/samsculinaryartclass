import React from 'react';
import { Link } from 'react-router-dom';
import {
  ExperimentOutlined,
  SmileOutlined,
  TrophyOutlined,
  CrownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
  StarFilled,
  GlobalOutlined
} from '@ant-design/icons';
import useSEO from '../hooks/useSEO';
import TiltCard from '../components/TiltCard';
import FeaturedWebinarBanner from '../components/FeaturedWebinarBanner';
import AccreditationBadges from '../components/AccreditationBadges';

export default function Home() {
  useSEO({
    title: "Sam's Culinary Art Classes - Cooking & Baking Classes in Chennai",
    description: "Welcome to Sam's Culinary Art Classes in Chennai. We offer hands-on cooking and baking courses for traditional, continental, and multi-cuisine dishes. Start your chef journey today!",
    keywords: "sams culinary, sam culinary art class, sams cooking class chennai, sams baking classes chennai, sam baking class kodambakkam, samculinary, sams culiniry, vahitha jeevanandam, cooking academy chennai, sams coocking class, sams backing class, sam cook, sam bak, sams cul"
  });

  return (
    <div className="home-page-container">
      {/* 3D Cinematic Hero Section */}
      <section className="hero-wrapper section-padding">
        <div className="container hero-grid">
          <div className="hero-content tilt-layer-depth-1">
            {/* Top Rating Badge */}
            <div className="hero-rating-badge">
              <div style={{ display: 'flex', color: 'var(--mango-yellow)', fontSize: '13px' }}>
                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
              </div>
              <span className="hero-rating-badge-text">
                TOP-RATED CULINARY ACADEMY IN CHENNAI
              </span>
            </div>

            <h1 className="hero-title gradient-title-green">
              Welcome to <span className="script-highlight">Sam&apos;s</span> <br />
              Culinary Art Classes
            </h1>

            <p className="hero-para editorial-measure" style={{ fontSize: '1.08rem' }}>
              Discover the traditional way of preparing, cooking, and baking dishes from around the world. We offer a warm, secured, and amiable atmosphere welcoming all genders — perfect for kids, teenagers, and adult learners alike.
            </p>

            <div className="hero-quote-box">
              <p className="hero-quote">
                &quot;To enter one&apos;s heart is through stomach.&quot;
              </p>
              <p className="hero-para" style={{ margin: '4px 0 0 0', fontSize: '0.88rem' }}>
                Our students have achieved this at their homes through the joy of cooking.
              </p>
            </div>

            <div className="hero-action-buttons">
              <Link to="/courses" className="btn-primary">
                <span>Explore Courses</span>
                <ArrowRightOutlined style={{ fontSize: '11px' }} />
              </Link>
              <Link to="/about" className="btn-outline">About Founder</Link>
            </div>
          </div>

          {/* Right 3D Chef Circle Montage */}
          <div className="hero-visuals">
            <div className="chef-circle-main">
              <img
                src="/home.webp"
                alt="Sam's Culinary Art Classes"
                className="chef-img-main"
              />
            </div>
            <div className="floating-dish dish-1">
              <img src="/home1.webp" alt="Sam's Culinary Art Class Showcase 1" />
            </div>
            <div className="floating-dish dish-2">
              <img src="/home2.webp" alt="Sam's Culinary Art Class Showcase 2" />
            </div>
            <div className="floating-dish dish-3">
              <img src="/home3.webp" alt="Sam's Culinary Art Class Showcase 3" />
            </div>
            <div className="floating-dish dish-4">
              <img src="/home4.webp" alt="Sam's Culinary Art Class Showcase 4" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Live Webinar Promotion Banner */}
      <FeaturedWebinarBanner />

      {/* 3D Spotlight Statistics Counter Bar */}
      <section className="stats-bar">
        <div className="container">
          <TiltCard className="stats-grid" maxTilt={8}>
            <div className="stat-item">
              <div className="stat-icon">
                <ExperimentOutlined style={{ fontSize: '22px' }} />
              </div>
              <div className="stat-details">
                <span className="stat-number">50+</span>
                <span className="stat-label">Cuisines &amp; Courses</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <SmileOutlined style={{ fontSize: '22px' }} />
              </div>
              <div className="stat-details">
                <span className="stat-number">
                  <span className="stat-desktop-num">1400+</span>
                  <span className="stat-mobile-num">1.4k+</span>
                </span>
                <span className="stat-label">Global Alumni</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <GlobalOutlined style={{ fontSize: '22px' }} />
              </div>
              <div className="stat-details">
                <span className="stat-number">40+</span>
                <span className="stat-label">Countries Represented</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <TrophyOutlined style={{ fontSize: '22px' }} />
              </div>
              <div className="stat-details">
                <span className="stat-number">12+</span>
                <span className="stat-label">Years of Heritage</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <CheckCircleOutlined style={{ fontSize: '22px' }} />
              </div>
              <div className="stat-details">
                <span className="stat-number">100%</span>
                <span className="stat-label">Hands-on Practice</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* World Record & Social Impact Banner */}
      <section style={{ paddingTop: '24px' }}>
        <div className="container">
          <TiltCard className="world-record-card" maxTilt={4} style={{ borderRadius: '24px', background: 'var(--green-light)', border: 'var(--border-subtle)', overflow: 'hidden' }}>
            <div className="world-record-grid">
              <div style={{ minWidth: 0 }}>
                <span className="world-record-badge">
                  <CrownOutlined style={{ marginRight: '6px' }} /> WORLD RECORD ACHIEVEMENT &amp; SOCIAL IMPACT
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', color: 'var(--green-primary)', margin: '0 0 8px 0', wordBreak: 'break-word' }}>
                  Fireless Cooking Event for 150 Special Children &amp; CISF Port Partner
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0 0 14px 0', wordBreak: 'break-word' }}>
                  Sam’s Culinary Art Class organized India’s First-Ever Mega Fireless Cooking Event at IHM Taramani, Chennai (Junior Magic Chefs Season 1).
                </p>
                <Link to="/about?tab=social-impact" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', maxWidth: '100%', boxSizing: 'border-box' }}>
                  <span>Read World Record Story</span> <ArrowRightOutlined />
                </Link>
              </div>
              <div className="world-record-stats">
                <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px 10px', borderRadius: '14px', border: 'var(--border-subtle)', textAlign: 'center', minWidth: 0 }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--green-primary)', fontFamily: 'var(--font-serif)' }}>150+</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Special Children Trained</div>
                </div>
                <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px 10px', borderRadius: '14px', border: 'var(--border-subtle)', textAlign: 'center', minWidth: 0 }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--green-primary)', fontFamily: 'var(--font-serif)' }}>Since 2015</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Super MOM Pageant</div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 3D Overview Story Banner */}
      <section className="section-padding" style={{ paddingBottom: '32px' }}>
        <div className="container">
          <TiltCard style={{ padding: 'var(--space-6)', textAlign: 'center' }} maxTilt={6}>
            <span className="section-tag tilt-layer-depth-1">OUR ACADEMY PHILOSOPHY</span>
            <h2 className="section-title gradient-title-green tilt-layer-depth-2" style={{ marginBottom: '16px' }}>
              Learn Cooking the <span className="script-highlight">Traditional Way</span>
            </h2>
            <p className="hero-para tilt-layer-depth-1" style={{ maxWidth: '750px', margin: '0 auto 24px auto' }}>
              Sam&apos;s Culinary Art Classes began with a half-hour decision and grew into a premier cooking institute in Chennai. We maintain a friendly, team-based atmosphere where teenagers, adults, and international NRI students discover the science behind tastes, spices, and aromas.
            </p>
            <div className="hero-action-buttons tilt-layer-depth-3" style={{ justifyContent: 'center' }}>
              <Link to="/about" className="btn-primary">Our Journey Story</Link>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 3D Batch Timings & Promo Grid */}
      <section className="section-padding" style={{ paddingTop: '32px' }}>
        <div className="container timings-cta-grid">
          {/* 3D Batch Timings Card */}
          <TiltCard className="timing-card" maxTilt={10}>
            <div className="timing-header tilt-layer-depth-2">
              <span className="timing-icon"><ClockCircleOutlined /></span>
              <h4 className="timing-title">Batch Timings</h4>
            </div>
            <div className="timing-list tilt-layer-depth-1">
              <div className="timing-item">
                <span className="timing-days">Monday – Friday:</span>
                <span className="timing-hours">10:00 AM – 1:00 PM &amp; 2:00 PM – 7:00 PM</span>
              </div>
              <div className="timing-item">
                <span className="timing-days">Weekends:</span>
                <span className="timing-hours">Special Appointments</span>
              </div>
            </div>
            <p className="timing-limit-warning tilt-layer-depth-1">
              * Note: We maintain limited seats per batch to ensure personalized care and better learning.
            </p>
          </TiltCard>

          {/* 3D CTA Promo Card */}
          <TiltCard className="cta-promo-card" maxTilt={10}>
            <div className="cta-promo-content tilt-layer-depth-2">
              <h3 className="cta-promo-title">Start Your Culinary Journey Today!</h3>
              <p className="cta-promo-para">
                Learn, create, and celebrate the joy of cooking. Reserve your slot now or WhatsApp us for instant batch availability.
              </p>
              <Link
                to="/contact"
                className="btn-primary btn-mango"
              >
                Register Now
              </Link>
            </div>
            <div className="cta-promo-img-wrapper tilt-layer-depth-3">
              <img
                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=400&auto=format&fit=crop"
                alt="Culinary cooking bowl"
                className="cta-promo-img"
              />
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Official Govt. Accreditations & Certifications Section before Footer */}
      <section style={{ paddingTop: '20px' }}>
        <div className="container">
          <AccreditationBadges />
        </div>
      </section>
    </div>
  );
}
