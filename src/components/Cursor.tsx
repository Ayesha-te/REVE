import { useRef, useEffect, useState } from 'react';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (cursor) {
          const offsetX = 15;
          const offsetY = 15;
          cursor.style.left = `${e.clientX + offsetX}px`;
          cursor.style.top = `${e.clientY + offsetY}px`;
        }
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isTextElement =
        target.matches('h1, h2, h3, h4, h5, h6, p, span, a, button, blockquote, li') ||
        !!target.closest('h1, h2, h3, h4, h5, h6, p, span, a, button, blockquote, li') ||
        target.classList.contains('text-element') ||
        target.classList.contains('font-bold') ||
        target.classList.contains('font-medium') ||
        target.classList.contains('font-semibold') ||
        parseInt(window.getComputedStyle(target).fontWeight) >= 500;

      setIsHoveringText(!!isTextElement);
    };

    const handleMouseOut = () => {
      setIsHoveringText(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999]"
      style={{
        display: isVisible ? 'block' : 'none',
        width: isHoveringText ? '120px' : '20px',
        height: isHoveringText ? '120px' : '20px',
        borderRadius: '50%',
        backgroundColor: isHoveringText ? 'rgba(0, 0, 0, 0.8)' : 'hsl(30, 50%, 47%)', // Bronze color
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: 'translate(-50%, -50%)',
        mixBlendMode: isHoveringText ? 'difference' : 'normal',
        backdropFilter: isHoveringText ? 'blur(1px)' : 'none',
        border: isHoveringText ? '1px solid hsla(30, 50%, 47%, 0.3)' : 'none',
      }}
    />
  );
};

export default Cursor;
