import React, { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import {
  LeftOutlined,
  RightOutlined,
  BookOutlined,
  DownloadOutlined,
  CloseOutlined
} from '@ant-design/icons';

const BROCHURE_PAGES = [
  { page: 1, title: "Cover Page — Sam's Culinary Art Class", src: "/sams_brochure_pdf/page_1.webp" },
  { page: 2, title: "Academy Overview & Vision Statement", src: "/sams_brochure_pdf/page_2.webp" },
  { page: 3, title: "South Indian Vegetarian 30 Dishes Syllabus", src: "/sams_brochure_pdf/page_3.webp" },
  { page: 4, title: "South Indian Non-Vegetarian 30 Dishes Special", src: "/sams_brochure_pdf/page_4.webp" },
  { page: 5, title: "Specialized Programs — Kids Camps & Couple Cooking", src: "/sams_brochure_pdf/page_5.webp" },
  { page: 6, title: "Studio Infrastructure & Teaching Methodology", src: "/sams_brochure_pdf/page_6.webp" },
  { page: 7, title: "Celebrity Students & Alumni Cloud Kitchens", src: "/sams_brochure_pdf/page_7.webp" },
  { page: 8, title: "Super MOM Signature Competition (Since 2015)", src: "/sams_brochure_pdf/page_8.webp" },
  { page: 9, title: "Super MOM Hall of Fame & Best Teacher Award 2025", src: "/sams_brochure_pdf/page_9.webp" },
  { page: 10, title: "World Record: Fireless Cooking for 150 Special Children", src: "/sams_brochure_pdf/page_10.webp" },
  { page: 11, title: "Institutional Collaborations & CISF Guest Speaker", src: "/sams_brochure_pdf/page_11.webp" },
  { page: 12, title: "Expert Faculty & Specialist Instructors Team", src: "/sams_brochure_pdf/page_12.webp" },
  { page: 13, title: "Internship & Hands-on Kitchen Exposure", src: "/sams_brochure_pdf/page_13.webp" }
];

const SYLLABUS_PAGES = [
  { page: 1, title: "Cover Page - Sam's Culinary Art Class", src: "/sams_brochure_pdf/page_1.webp" },
  { page: 2, title: "Founder Vision & Welcome Message", src: "/sams_brochure_pdf/page_2.webp" },
  { page: 3, title: "Cuisines & Masterclasses Overview", src: "/sams_brochure_pdf/page_3.webp" },
  { page: 4, title: "South Indian Veg 30 Dishes Syllabus", src: "/sams_brochure_pdf/page_4.webp" },
  { page: 5, title: "South Indian Veg & Non-Veg Special", src: "/sams_brochure_pdf/page_5.webp" },
  { page: 6, title: "South Indian Non-Veg 30 Dishes Syllabus", src: "/sams_brochure_pdf/page_6.webp" },
  { page: 7, title: "North Indian Veg 30 Dishes Syllabus", src: "/sams_brochure_pdf/page_7.webp" },
  { page: 8, title: "North Indian Veg & Non-Veg Masterclass", src: "/sams_brochure_pdf/page_8.webp" },
  { page: 9, title: "North Indian Non-Veg 25 Dishes Syllabus", src: "/sams_brochure_pdf/page_9.webp" },
  { page: 10, title: "Continental & Asian Fusion 30 Dishes", src: "/sams_brochure_pdf/page_10.webp" },
  { page: 11, title: "Multicuisine 50 Dishes Diploma", src: "/sams_brochure_pdf/page_11.webp" },
  { page: 12, title: "Baking, Cupcakes & Icing Workshops", src: "/sams_brochure_pdf/page_12.webp" },
  { page: 13, title: "Kebabs & Indian Breads Workshop", src: "/sams_brochure_pdf/page_13.webp" }
];

const ABOUT_PAGES = [
  { page: 1, title: "Cover Page — Sam's Culinary Art Class", src: "/about_pdf/page-01.jpg" },
  { page: 2, title: "Academy Overview & Vision Statement", src: "/about_pdf/page-02.jpg" },
  { page: 3, title: "South Indian & North Indian Cuisine Syllabus", src: "/about_pdf/page-03.jpg" },
  { page: 4, title: "Continental & Multicuisine Masterclasses", src: "/about_pdf/page-04.jpg" },
  { page: 5, title: "Baking, Pastries & Icing Workshops", src: "/about_pdf/page-05.jpg" },
  { page: 6, title: "Preservatives, Juices & Gourmet Pickles", src: "/about_pdf/page-06.jpg" },
  { page: 7, title: "Diabetic Special & Slimming Salads", src: "/about_pdf/page-07.jpg" },
  { page: 8, title: "Specialized Batches — Kids Camp & Couples", src: "/about_pdf/page-08.jpg" },
  { page: 9, title: "Bachelor's & Men's Dedicated Batches", src: "/about_pdf/page-09.jpg" },
  { page: 10, title: "Customized Classes & Restaurant Advisory", src: "/about_pdf/page-10.jpg" },
  { page: 11, title: "Working Women Quick Cooking Hacks", src: "/about_pdf/page-11.jpg" },
  { page: 12, title: "Studio Infrastructure & Accreditations", src: "/about_pdf/page-12.jpg" },
  { page: 13, title: "Celebrity Students & Cloud Kitchen Placements", src: "/about_pdf/page-13.jpg" },
  { page: 14, title: "Awards, Convocation & Contact Details", src: "/about_pdf/page-14.jpg" }
];

export default function FlipBookViewer({ pdfType = 'syllabus', pdfPath, pdfName, hideDownload = false, onClose }) {
  const flipBookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const pagesData = pdfType === 'about' ? ABOUT_PAGES : (pdfType === 'brochure' ? BROCHURE_PAGES : SYLLABUS_PAGES);
  const totalPages = pagesData.length;
  const downloadLink = pdfPath || (pdfType === 'about' ? '/Mrs. M. Vahitha Jeevanatham.pdf' : (pdfType === 'brochure' ? '/Sams culinary Arts.pdf' : '/SAM-CULINARY_LQ.pdf'));
  const downloadFileName = pdfName || (pdfType === 'about' ? 'Mrs. M. Vahitha Jeevanatham.pdf' : (pdfType === 'brochure' ? 'Sams_Culinary_Arts_Brochure.pdf' : 'SAM-CULINARY-Syllabus.pdf'));
  const documentTitle = pdfType === 'about' ? "Sam's Culinary Art Class — About Academy Brochure" : (pdfType === 'brochure' ? "Sam's Culinary Art Class — 3D Brochure" : "Sam's Culinary Art Class — 3D Course Syllabus");

  const handleNext = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  }, []);

  const handlePrev = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  }, []);

  const onFlip = useCallback((e) => {
    setCurrentPage(e.data);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#09120b', color: '#fff', overflow: 'hidden' }}>

      {/* Single Unified Header Bar */}
      <div style={{
        padding: '10px 18px',
        background: 'linear-gradient(135deg, #132717 0%, #0c1a0f 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        flexShrink: 0
      }}>
        {/* Left: Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOutlined style={{ color: 'var(--mango-yellow)', fontSize: '18px' }} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#f0f7f2', fontFamily: 'var(--font-serif)' }}>
              {documentTitle}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#90a894' }}>
              {pagesData[currentPage]?.title || `${totalPages} Pages Document`}
            </div>
          </div>
        </div>

        {/* Center: Flip Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            style={{
              background: currentPage === 0 ? 'rgba(255,255,255,0.05)' : 'var(--green-primary)',
              color: currentPage === 0 ? '#666' : '#fff',
              border: '1px solid rgba(255,255,255,0.18)',
              padding: '6px 14px',
              borderRadius: '9999px',
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
              fontSize: '0.8rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 200ms ease'
            }}
          >
            <LeftOutlined style={{ fontSize: '11px' }} /> <span>Prev</span>
          </button>

          <span style={{ fontSize: '0.84rem', color: 'var(--lemon-yellow)', fontWeight: '700', padding: '0 4px' }}>
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            style={{
              background: currentPage >= totalPages - 1 ? 'rgba(255,255,255,0.05)' : 'var(--green-primary)',
              color: currentPage >= totalPages - 1 ? '#666' : '#fff',
              border: '1px solid rgba(255,255,255,0.18)',
              padding: '6px 14px',
              borderRadius: '9999px',
              cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.8rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 200ms ease'
            }}
          >
            <span>Next</span> <RightOutlined style={{ fontSize: '11px' }} />
          </button>
        </div>

        {/* Right: Actions (Download & Close) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!hideDownload && (
            <a
              href={downloadLink}
              download={downloadFileName}
              style={{
                background: 'var(--mango-yellow)',
                color: '#1a241c',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              <DownloadOutlined /> <span>Download PDF</span>
            </a>
          )}

          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 200ms ease'
              }}
            >
              <CloseOutlined />
            </button>
          )}
        </div>
      </div>

      {/* 3D Interactive FlipBook Canvas */}
      <div className="flipbook-container-wrapper">
        <HTMLFlipBook
          width={360}
          height={510}
          minWidth={260}
          maxWidth={550}
          minHeight={370}
          maxHeight={780}
          size="stretch"
          usePortrait={true}
          maxShadowOpacity={0.6}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          ref={flipBookRef}
          className="flipbook-canvas"
        >
          {pagesData.map((item, index) => (
            <div key={index} className="flip-page-sheet">
              <div className="flip-page-img-wrapper">
                <img
                  src={item.src}
                  alt={item.title}
                  className="flip-page-img"
                />
                <div className="flip-page-badge">
                  Page {item.page}
                </div>
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

    </div>
  );
}
