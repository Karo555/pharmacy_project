import React, { useEffect, useState } from 'react';
import styles from '../pages/Home/Home.module.css';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input, .interactive').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    return () => {
      removeEventListeners();
    };
  }, []);

  // Don't show custom cursor on touch devices
  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
    return null;
  }

  return (
    <>
      <div
        className={`${styles['custom-cursor']} ${styles['cursor-dot']}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: hidden ? 0 : 1,
          transform: clicked ? 'scale(0.5)' : 'scale(1)',
        }}
      />
      <div
        className={`${styles['custom-cursor']} ${styles['cursor-outline']} ${
          linkHovered ? styles['interactive-hover'] : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: hidden ? 0 : 1,
          transform: clicked ? 'scale(1.5)' : 'scale(1)',
          transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
        }}
      />
    </>
  );
};

export default CustomCursor;
