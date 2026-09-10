import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookFilled,
  InstagramOutlined,
  WhatsAppOutlined,
  SettingOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-sections-grid">

        {/* Section 1: Contact Details */}
        <div className="footer-section">
          <h4 className="footer-section-title">Reach Us</h4>
          <p className="footer-address">
            Anbazhaghi Bhavanam<br />
            18/21, Vishwanathapuram 3rd Street,<br />
            Kodambakkam, Chennai - 600 024
          </p>

          <h4 className="footer-section-title" style={{ marginTop: '24px' }}>Touch With Us</h4>
          <p className="footer-contact-info">
            <strong>Phone:</strong> <a href="tel:+918939648457" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8939648457</a><br />
            <strong>E-Mail:</strong> <a href="mailto:samsculinaryartclass@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>samsculinaryartclass@gmail.com</a>
          </p>

          <div className="social-links-footer" style={{ marginTop: '20px' }}>
            <a
              href="https://www.facebook.com/SamsCulinaryArtClass/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-footer-btn"
              aria-label="Facebook"
            >
              <FacebookFilled style={{ fontSize: '16px' }} />
            </a>
            <a
              href="https://www.instagram.com/samsculinaryartclassofficial/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="social-footer-btn"
              aria-label="Instagram"
            >
              <InstagramOutlined style={{ fontSize: '16px' }} />
            </a>
            <a
              href="https://wa.me/918939648457"
              target="_blank"
              rel="noopener noreferrer"
              className="social-footer-btn"
              aria-label="WhatsApp"
            >
              <WhatsAppOutlined style={{ fontSize: '16px' }} />
            </a>
          </div>
        </div>

        {/* Section 2: Location Map */}
        <div className="footer-section">
          <h4 className="footer-section-title">Location Map</h4>
          <div className="footer-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8153394118463!2d80.2229660745765!3d13.047423213212394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266f0b949d36f%3A0x75c3bcaba8428ec4!2s3%2F18%2C%20Viswanatha%20Puram%2C%20Kodambakkam%2C%20Chennai%2C%20Greater%20Chennai%2C%20Tamil%20Nadu%20600024!5e0!3m2!1sen!2sin!4v1784567658563!5m2!1sen!2sin"
              className="footer-map-iframe"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sam's Location Map"
            ></iframe>
          </div>
        </div>

        {/* Section 3: Program Categories */}
        <div className="footer-section">
          <h4 className="footer-section-title">Program Categories</h4>
          <div className="footer-categories-split">
            <div className="footer-category-sublist">
              <span className="footer-sublist-title">Cuisines</span>
              <ul>
                <li>South Indian Cuisine</li>
                <li>North Indian Cuisine</li>
                <li>Chinese Cuisine</li>
                <li>Diabetic Special</li>
                <li>Millet Special</li>
                <li>Slimming Diet</li>
                <li>Platters</li>
                <li>Indian Desserts</li>
              </ul>
            </div>
            <div className="footer-category-sublist">
              <span className="footer-sublist-title">Baking</span>
              <ul>
                <li>All Kind of Cakes</li>
                <li>All Kind of Icing</li>
                <li>Healthy Muffins</li>
                <li>Pastries</li>
                <li>Breads &amp; Buns</li>
                <li>Pastas &amp; Pizzas</li>
                <li>Continental Desserts</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div className="container">
        <div className="footer-divider"></div>
        <div className="footer-bottom" style={{ flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <span>&copy; {new Date().getFullYear()} Sam&apos;s Culinary Art Classes. All Rights Reserved.</span>
            <div className="footer-credits" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              {/* <span>Managed by Mrs. M. Vahitha Jeevanandam (MCA, M.Phil., Diploma in Clinical Nutrition and Dietetics)</span> */}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <EnvironmentOutlined style={{ color: 'var(--mango-yellow)', fontSize: '13px' }} />
                <span>Chennai, India</span>
              </span>
              <Link
                to="/admin/webinars"
                className="footer-admin-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.2s ease'
                }}
              >
                <SettingOutlined style={{ fontSize: '13px' }} />
                <span>Admin Portal</span>
              </Link>
            </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px', width: '100%' }}>
            <span><strong>ISO Certification:</strong> 22000 : 2018</span>
            <span>•</span>
            <span><strong>FSSAI Registration No:</strong> 22423544000118</span>
            <span>•</span>
            <span><strong>MSME Registered</strong></span>
            <span>•</span>
            <span><strong>NSDC Affiliated</strong></span>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
}
