import React from 'react';

const STAR_COLORS = {
  red: '#de533a',
  pink: '#dfc6c2',
  yellow: '#ded54e',
  teal: '#3f786d',
};

const stars = [
  {
    id: 'star1',
    viewBox: '0 0 29.08 28.01',
    points:
      '13.31 0 9.18 9.3 0 4.65 4 17.18 0 26.13 11.77 20.95 18.12 28.01 18.12 19.54 29.08 8.87 17.2 10.45 13.31 0',
    left: '2%',
    top: '52%',
    width: '14%',
    colors: [STAR_COLORS.red, STAR_COLORS.yellow, STAR_COLORS.teal],
    twinkleDelay: 0,
    floatDuration: 6,
    floatDelay: 0,
    floatY: 3,
    rotate: 4,
  },
  {
    id: 'star2',
    viewBox: '0 0 67.17 57.97',
    points:
      '25.08 20.07 25.08 0 37.9 14.49 67.17 12.82 49.61 32.33 54.07 57.97 31.77 39.02 21.18 57.97 21.18 39.02 0 35.12 25.08 20.07',
    left: '13%',
    top: '2%',
    width: '28%',
    colors: [STAR_COLORS.pink, STAR_COLORS.teal, STAR_COLORS.yellow],
    twinkleDelay: -3.2,
    floatDuration: 7,
    floatDelay: -1.2,
    floatY: 2,
    rotate: -3,
  },
  {
    id: 'star3',
    viewBox: '0 0 62.99 54.63',
    points:
      '0 20.07 16.72 32.89 11.71 48.5 26.76 39.58 35.68 54.63 38.93 35.29 62.99 20.07 37.86 23.56 35.68 0 21.74 22.85 0 20.07',
    left: '40%',
    top: '22%',
    width: '24%',
    colors: [STAR_COLORS.yellow, STAR_COLORS.red, STAR_COLORS.pink],
    twinkleDelay: -2.4,
    floatDuration: 6.5,
    floatDelay: -0.8,
    floatY: 2.5,
    rotate: 3,
  },
  {
    id: 'star4',
    viewBox: '0 0 60.76 56.3',
    points:
      '0 29.54 15.61 26.2 24.53 0 34.56 18.39 60.76 14.77 42.92 29.54 47.38 56.3 27.31 37.9 17.84 53.51 16.17 37.9 0 29.54',
    left: '60%',
    top: '0%',
    width: '25%',
    colors: [STAR_COLORS.red, STAR_COLORS.pink, STAR_COLORS.yellow],
    twinkleDelay: -1.6,
    floatDuration: 7.5,
    floatDelay: -2,
    floatY: 2,
    rotate: -4,
  },
  {
    id: 'star5',
    viewBox: '0 0 23.75 27.86',
    points:
      '8.75 9.64 11.96 0 14.46 10.18 22.5 5.09 17.32 16.07 23.75 27.86 12.86 22.68 3.57 27.86 6.61 16.07 0 7.05 8.75 9.64',
    left: '85%',
    top: '35%',
    width: '10%',
    colors: [STAR_COLORS.pink, STAR_COLORS.red, STAR_COLORS.teal],
    twinkleDelay: -0.8,
    floatDuration: 5.5,
    floatDelay: -1.5,
    floatY: 3,
    rotate: 3,
  },
];

// Generate keyframes for color cycling and floating motion
const generateStyles = () => {
  let css = '';
  stars.forEach((star) => {
    // Color twinkle: 4s total — hold frame 1 for 2s (50%), 1s each for frames 2 & 3
    css += `
      @keyframes twinkle-${star.id} {
        0%, 47% { fill: ${star.colors[0]}; }
        53%, 72% { fill: ${star.colors[1]}; }
        78%, 97% { fill: ${star.colors[2]}; }
        100% { fill: ${star.colors[0]}; }
      }
    `;
    // Gentle float + rotation
    css += `
      @keyframes float-${star.id} {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-${star.floatY}px) rotate(${star.rotate}deg); }
      }
    `;
  });
  // Respect reduced motion preference
  css += `
    @media (prefers-reduced-motion: reduce) {
      ${stars.map((s) => `.footer-star-${s.id}`).join(', ')} {
        animation: none !important;
      }
      ${stars.map((s) => `.footer-star-${s.id} polygon`).join(', ')} {
        animation: none !important;
      }
    }
  `;
  return css;
};

const FooterStars: React.FC = () => {
  return (
    <div
      style={{ position: 'relative', width: '240px', height: '100px' }}
      aria-hidden="true"
    >
      <style>{generateStyles()}</style>
      {stars.map((star) => (
        <svg
          key={star.id}
          className={`footer-star-${star.id}`}
          viewBox={star.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: star.width,
            height: 'auto',
            animation: `float-${star.id} ${star.floatDuration}s ease-in-out ${star.floatDelay}s infinite`,
          }}
        >
          <polygon
            points={star.points}
            style={{
              animation: `twinkle-${star.id} 4s ease-in-out ${star.twinkleDelay}s infinite`,
            }}
          />
        </svg>
      ))}
    </div>
  );
};

export default FooterStars;
