import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll('span');
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: 'power2.out',
      fontVariationSettings: `'wght' ${weight}`,
      overwrite: 'auto', // Prevents animation stacking lag
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      const targetWeight = min + (max - min) * intensity;
      animateLetter(letter, targetWeight);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.4);
    });
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function to remove listeners on unmount
  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
  };
};

const Welcome = () => {
  const topTextRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const cleanupTop = setupTextHover(topTextRef.current, 'subtitle');
    const cleanupTitle = setupTextHover(titleRef.current, 'title');
    const cleanupSubtitle = setupTextHover(subtitleRef.current, 'subtitle');

    return () => {
      cleanupTop();
      cleanupTitle();
      cleanupSubtitle();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={topTextRef}>
        {renderText("Hey I am Mahant", 'text-3xl font-georama', 100)}
      </p>
      
      <h1 ref={titleRef} className="mt-7 mb-8">
        {renderText("Portfolio", 'text-9xl italic font-georama', 400)}
      </h1>
      
      <p ref={subtitleRef}>
        {renderText("Bring your Cursor here", 'text-3xl font-georama', 100)}
      </p>

      <div className="small-screen">
        <p>This Portfolio is designed for desktop and mobile screens</p>
      </div>
    </section>
  );
};

export default Welcome;