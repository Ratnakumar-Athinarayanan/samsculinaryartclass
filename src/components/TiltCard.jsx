import React, { useRef, useCallback, useState } from 'react';

/**
 * Ultra-Luxury 3D Perspective Card with Forward Hover Lift & Dynamic Spotlight Glow
 */
export default function TiltCard({ children, className = '', maxTilt = 8, scaleOnHover = true, style = {}, onClick }) {
  const cardRef = useRef(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (-1 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const centerX = x - 0.5;
    const centerY = y - 0.5;

    // Apply 3D perspective transform popping forward only if maxTilt > 0
    if (maxTilt > 0) {
      const rotateX = centerY * maxTilt * 1.5;
      const rotateY = centerX * -maxTilt * 1.5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(24px) scale3d(1.03, 1.03, 1.03)`;
      card.style.transition = 'transform 100ms ease-out';
    } else if (scaleOnHover) {
      card.style.transform = `scale(1.03)`;
      card.style.transition = 'transform 200ms ease-out';
    }

    // Update cursor spotlight position (%)
    setSpotlightPos({
      x: (x * 100).toFixed(1),
      y: (y * 100).toFixed(1),
      opacity: 1
    });
  }, [maxTilt, scaleOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    if (maxTilt > 0) {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 500ms cubic-bezier(0.03, 0.98, 0.52, 0.99)';
    } else if (scaleOnHover) {
      card.style.transform = `scale(1)`;
      card.style.transition = 'transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)';
    }

    setSpotlightPos(prev => ({ ...prev, opacity: 0 }));
  }, [maxTilt, scaleOnHover]);

  return (
    <div
      ref={cardRef}
      className={`glass-panel tilt-card-3d luxury-spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {/* Real-time Cursor Light Spotlight */}
      <div 
        className="card-spotlight-layer"
        style={{
          background: `radial-gradient(500px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(232, 167, 16, 0.14), transparent 40%)`,
          opacity: spotlightPos.opacity
        }}
      />
      
      {children}
    </div>
  );
}
