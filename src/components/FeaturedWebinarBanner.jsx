import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ClockCircleOutlined,
  VideoCameraOutlined,
  UserOutlined,
  TagOutlined,
  ArrowRightOutlined,
  FireFilled,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { getWebinars, getWebinarStatus } from '../services/webinarService';

export default function FeaturedWebinarBanner() {
  const [featuredWebinars, setFeaturedWebinars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false });

  const loadFeatured = async () => {
    const all = await getWebinars();
    const featured = Array.isArray(all)
      ? all.filter((w) => w.isFeaturedAd && getWebinarStatus(w) !== 'Completed')
      : [];
    setFeaturedWebinars(featured);
  };

  useEffect(() => {
    loadFeatured();
    window.addEventListener('webinars_updated', loadFeatured);
    return () => window.removeEventListener('webinars_updated', loadFeatured);
  }, []);

  const activeWebinar = featuredWebinars[currentIndex];

  const getStartTimeMs = (webinar) => {
    if (!webinar) return 0;
    if (webinar.schedule?.startTime) {
      const t = new Date(webinar.schedule.startTime).getTime();
      if (!isNaN(t)) return t;
    }
    if (webinar.startDate) {
      const time = webinar.startTime || '11:00';
      const t = new Date(`${webinar.startDate}T${time}:00`).getTime();
      if (!isNaN(t)) return t;
    }
    return 0;
  };

  useEffect(() => {
    if (!activeWebinar) return;

    const calculateTimer = () => {
      const startTime = getStartTimeMs(activeWebinar);
      if (!startTime) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false });
        return;
      }

      const now = Date.now();
      const durationMinutes = activeWebinar.schedule?.durationMinutes || activeWebinar.durationMinutes || 60;
      const endMs = startTime + durationMinutes * 60 * 1000;
      const diff = startTime - now;

      // Allow joining 5 minutes early so attendees arriving at e.g. 10:55 - 10:59 can enter room
      const earlyAccessMs = 5 * 60 * 1000;
      const isLive = activeWebinar.status === 'live' || (now >= (startTime - earlyAccessMs) && now <= endMs);

      if (isLive) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      const seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

      setTimeLeft({ days, hours, minutes, seconds, isLive: false });
    };

    calculateTimer();
    const interval = setInterval(calculateTimer, 1000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        calculateTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [activeWebinar]);

  if (!activeWebinar) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredWebinars.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredWebinars.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="featured-webinar-banner-wrapper" style={{ margin: 'var(--space-4) 0' }}>
      <div className="container">
        <div className="webinar-ad-card glass-panel-glow">
          {/* Badge Ribbon */}
          <div className="webinar-ad-header-ribbon">
            <div className="ad-pill">
              <FireFilled className="pulse-icon" style={{ color: 'var(--mango-yellow)' }} />
              <span>FEATURED LIVE WEBINAR</span>
            </div>
            {featuredWebinars.length > 1 && (
              <div className="banner-nav-arrows">
                <button onClick={handlePrev} className="banner-arrow-btn" aria-label="Previous webinar">
                  <LeftOutlined style={{ fontSize: '11px' }} />
                </button>
                <span className="banner-arrow-page-num">
                  {currentIndex + 1} / {featuredWebinars.length}
                </span>
                <button onClick={handleNext} className="banner-arrow-btn" aria-label="Next webinar">
                  <RightOutlined style={{ fontSize: '11px' }} />
                </button>
              </div>
            )}
          </div>

          <div className="webinar-ad-grid">
            {/* Left Content Column */}
            <div className="webinar-ad-info">
              <div className="webinar-tags" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="badge badge-category">
                  <TagOutlined style={{ marginRight: '4px' }} />
                  {activeWebinar.category}
                </span>
                <span style={{ 
                  fontWeight: '700', 
                  fontSize: '0.85rem',
                  color: getWebinarStatus(activeWebinar) === 'Live' ? 'var(--mango-yellow)' : 'var(--green-primary)'
                }}>
                  {getWebinarStatus(activeWebinar)}
                </span>
              </div>

              <h2 className="webinar-ad-title">{activeWebinar.title}</h2>
              <p className="webinar-ad-tagline">{activeWebinar.tagline || activeWebinar.description}</p>

              {/* Instructor Bio */}
              <div className="webinar-ad-instructor">
                <img
                  src={activeWebinar.instructor.avatar || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=100&auto=format&fit=crop'}
                  alt={activeWebinar.instructor.name}
                  className="instructor-avatar-sm"
                />
                <div>
                  <h5 className="instructor-name">{activeWebinar.instructor.name}</h5>
                  <p className="instructor-role">{activeWebinar.instructor.role}</p>
                </div>
              </div>

              {/* Action Button - Clickable and navigates to Google Meet when live or 5 mins early */}
              <div className="webinar-ad-cta-row">
                {(() => {
                  const startMs = getStartTimeMs(activeWebinar);
                  const durationMs = (activeWebinar.schedule?.durationMinutes || activeWebinar.durationMinutes || 60) * 60 * 1000;
                  const endMs = startMs + durationMs;
                  const nowMs = Date.now();
                  const earlyAccessMs = 5 * 60 * 1000;
                  const isLiveNow = timeLeft.isLive || activeWebinar.status === 'live' || (startMs > 0 && nowMs >= (startMs - earlyAccessMs) && nowMs <= endMs);

                  if (isLiveNow) {
                    return (
                      <a
                        href={activeWebinar.meetingUrl || 'https://meet.google.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-mango"
                        style={{
                          boxShadow: '0 4px 16px rgba(232, 167, 16, 0.4)',
                          background: 'linear-gradient(135deg, #f5b027 0%, #d48806 100%)',
                          color: '#1a1a1a',
                          fontWeight: '800',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <VideoCameraOutlined />
                        <span>Join Now</span>
                        <ArrowRightOutlined />
                      </a>
                    );
                  }

                  return (
                    <button
                      disabled
                      className="btn-primary btn-mango"
                      style={{
                        opacity: 0.6,
                        cursor: 'not-allowed',
                        filter: 'grayscale(0.4)',
                        pointerEvents: 'none'
                      }}
                      title="Join Now is enabled when the meeting time starts (or 5 mins early)"
                    >
                      <ClockCircleOutlined />
                      <span>Join Now</span>
                      <ArrowRightOutlined />
                    </button>
                  );
                })()}
              </div>
            </div>

            {/* Right Banner / Countdown Column */}
            <div className="webinar-ad-visual">
              <div className="ad-image-container">
                <img src={activeWebinar.bannerUrl} alt={activeWebinar.title} className="ad-banner-img" />
                <div className="ad-image-overlay"></div>
              </div>

              {/* Real-time Countdown Box */}
              <div className="countdown-container">
                {timeLeft.isLive ? (
                  <div className="live-now-box">
                    <VideoCameraOutlined style={{ fontSize: '26px', color: 'var(--mango-yellow)', flexShrink: 0 }} />
                    <div style={{ textAlign: 'left' }}>
                      <h4 className="live-text-main" style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', color: 'var(--lemon-yellow)' }}>SESSION IS LIVE NOW</h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', opacity: 0.9 }}>Join Google Meet live interactive room!</p>
                    </div>
                  </div>
                ) : (
                  <div className="countdown-grid">
                    <div className="countdown-box">
                      <span className="cd-val">{String(timeLeft.days).padStart(2, '0')}</span>
                      <span className="cd-lbl">DAYS</span>
                    </div>
                    <span className="cd-sep">:</span>
                    <div className="countdown-box">
                      <span className="cd-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="cd-lbl">HOURS</span>
                    </div>
                    <span className="cd-sep">:</span>
                    <div className="countdown-box">
                      <span className="cd-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="cd-lbl">MINS</span>
                    </div>
                    <span className="cd-sep">:</span>
                    <div className="countdown-box">
                      <span className="cd-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="cd-lbl">SECS</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
