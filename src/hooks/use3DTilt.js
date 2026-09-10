import { useRef, useCallback } from 'react';

/**
 * Custom hook for smooth 3D Perspective Hover Lift & Forward Tilt.
 * Pulls card forward towards the user's eyes on mouse hover.
 */
export default function use3DTilt(maxTilt = 8, perspective = 1000) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (-1 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const centerX = x - 0.5;
    const centerY = y - 0.5;

    // Calculate forward rotation angles (mouse pulls card side towards user)
    const rotateX = centerY * maxTilt * 1.5;
    const rotateY = centerX * -maxTilt * 1.5;

    // Apply 3D perspective transform popping forward (translateZ 24px)
    card.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(24px) scale3d(1.03, 1.03, 1.03)`;
    card.style.transition = 'transform 100ms ease-out';
  }, [maxTilt, perspective]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    // Smooth reset
    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 500ms cubic-bezier(0.03, 0.98, 0.52, 0.99)';
  }, [perspective]);

  return {
    ref: cardRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  };
}
