import React, { useState, useEffect, useRef } from 'react';
import { SPACING } from '@/components/Page1';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import type { ColorPaletteColor } from '@/components/ProjectGallery';

// ─── Helpers ────────────────────────────────────────────────────────────────

function isDark(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.45;
}

function textColor(hex: string): string {
  return isDark(hex) ? '#FFFFFF' : '#2D2D2A';
}

function subtextColor(hex: string): string {
  return isDark(hex) ? 'rgba(255,255,255,0.7)' : 'rgba(45,45,42,0.6)';
}

// ─── Constants ──────────────────────────────────────────────────────────────

const PAUSE_MS = 1200;       // Dwell time: how long cards sit still between shifts
const SHIFT_MS = 1200;       // Slide duration: how long the shift animation takes
const RESUME_DELAY_MS = 200; // Delay before first shift after mouse leave
const HERO_SCALE = 1.4;      // Hero card scale (1.4 = 140% of original size)

// ─── Card sub-component ─────────────────────────────────────────────────────

interface PaletteCardProps {
  color: ColorPaletteColor;
  isHero: boolean;
  cardWidth: number;
  cardHeight: number;
  /** When true, skip the CSS transition (used during snap resets) */
  suppressTransition: boolean;
}

const PaletteCard = React.memo(({ color, isHero, cardWidth, cardHeight, suppressTransition }: PaletteCardProps) => {
  const fg = textColor(color.hex);
  const fgSub = subtextColor(color.hex);
  const nameParts = color.name.split('\n');

  const transitionValue = suppressTransition
    ? 'none'
    : `transform ${SHIFT_MS}ms ease-in-out, border-color ${SHIFT_MS}ms ease-in-out, margin ${SHIFT_MS}ms ease-in-out`;

  return (
    <div
      style={{
        width: cardWidth,
        height: cardHeight,
        minWidth: cardWidth,
        borderRadius: 16,
        backgroundColor: color.hex,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 20px 20px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        border: isHero ? '1px solid #FFFFFF' : '1px solid transparent',
        transform: isHero ? `scale(${HERO_SCALE})` : 'scale(1)',
        margin: isHero ? '0 40px' : '0',
        transition: transitionValue,
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {/* Top section: icon + headline */}
      <div>
        {color.icon && (
          <img
            src={color.icon}
            alt=""
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              objectFit: 'cover',
              marginBottom: 16,
              display: 'block',
            }}
          />
        )}
        <h4
          style={{
            margin: 0,
            fontSize: 'clamp(22px, 2.4vw, 32px)',
            fontFamily: '"Compadre Narrow", sans-serif',
            fontWeight: 700,
            color: fg,
            lineHeight: 1.15,
            whiteSpace: 'pre-line',
          }}
        >
          {nameParts.length > 1
            ? nameParts.map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i < nameParts.length - 1 && <br />}
                </React.Fragment>
              ))
            : color.name}
        </h4>
      </div>

      {/* Bottom section: color values */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          fontSize: 11,
          fontFamily: '"Vulf Mono", monospace',
          fontWeight: 400,
          color: fgSub,
          lineHeight: 1.5,
        }}
      >
        {color.pms && (
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ width: 40 }}>PMS</span>
            <span style={{ color: fg }}>{color.pms}</span>
          </div>
        )}
        {color.cmyk && (
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ width: 40 }}>CMYK</span>
            <span style={{ color: fg }}>{color.cmyk}</span>
          </div>
        )}
        {color.rgb && (
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ width: 40 }}>RGB</span>
            <span style={{ color: fg }}>{color.rgb}</span>
          </div>
        )}
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ width: 40 }}>HEX</span>
          <span style={{ color: fg }}>{color.hex.toLowerCase()}</span>
        </div>
      </div>
    </div>
  );
});

PaletteCard.displayName = 'PaletteCard';

// ─── Main component ─────────────────────────────────────────────────────────

interface ColorPaletteCarouselProps {
  colors: ColorPaletteColor[];
  title?: string;
}

export const ColorPaletteCarousel = ({ colors, title }: ColorPaletteCarouselProps) => {
  const breakpoint = useBreakpoint();
  const [isPaused, setIsPaused] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // Briefly true during the snap frame to suppress card CSS transitions
  const [isSnapping, setIsSnapping] = useState(false);

  const timerRef = useRef<number | null>(null);

  const n = colors.length;

  // Card sizing
  const cardWidth = breakpoint === 'phone' ? 150 : breakpoint === 'tablet' ? 180 : 200;
  const cardHeight = breakpoint === 'phone' ? 240 : breakpoint === 'tablet' ? 280 : 320;
  const cardGap = breakpoint === 'phone' ? 12 : 20;
  const cardStep = cardWidth + cardGap;

  // How many cards to render on each side of the hero
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const sideCount = Math.ceil(viewportWidth / (2 * cardStep)) + 1;

  // Build the visible card list: hero at position 0, neighbors spread out
  const visibleCards: { colorIndex: number; position: number }[] = [];
  for (let i = -sideCount; i <= sideCount; i++) {
    const colorIndex = (((heroIndex + i) % n) + n) % n;
    visibleCards.push({ colorIndex, position: i });
  }

  // Centering: compute the pixel offset from the track's left edge to the
  // hero card's center, then shift the track so that point aligns with 50vw.
  //
  // In the flex row (with gap), cards before the hero occupy:
  //   sideCount cards × cardStep each = sideCount * cardStep
  // Plus the hero's own left margin (40px) and half its width.
  const HERO_MARGIN = 40;
  const heroCenter = sideCount * cardStep + HERO_MARGIN + cardWidth / 2;
  const restX = viewportWidth / 2 - heroCenter;

  // During animation we shift one full cardStep to the left.
  // The incoming hero also gains 40px margin on each side while the outgoing
  // hero loses its margin — but since we snap-reset after the transition,
  // the animateX only needs to account for the cardStep shift.
  const animateX = restX - cardStep;
  const currentX = isAnimating ? animateX : restX;

  // Background: transitions to next hero's color during animation
  const nextHeroIndex = (heroIndex + 1) % n;
  const heroBg = isAnimating ? colors[nextHeroIndex].hex : colors[heroIndex].hex;
  const titleFg = textColor(heroBg);

  // Track whether we're resuming from a hover pause
  const wasJustPausedRef = useRef(false);

  // Timer cycle: pause → slide → snap → pause → ...
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      wasJustPausedRef.current = true;
      return;
    }

    const scheduleTick = (delay: number) => {
      timerRef.current = window.setTimeout(() => {
        // Begin the slide animation
        setIsAnimating(true);

        timerRef.current = window.setTimeout(() => {
          // Snap: suppress transitions, update hero, reset position
          setIsSnapping(true);
          setIsAnimating(false);
          setHeroIndex((prev) => (prev + 1) % n);

          // Re-enable transitions on the next frame
          requestAnimationFrame(() => {
            setIsSnapping(false);
            scheduleTick(PAUSE_MS);
          });
        }, SHIFT_MS);
      }, delay);
    };

    // Use shorter delay when resuming from hover, full pause otherwise
    const initialDelay = wasJustPausedRef.current ? RESUME_DELAY_MS : PAUSE_MS;
    wasJustPausedRef.current = false;
    scheduleTick(initialDelay);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPaused, n]);

  return (
    <section
      aria-label={title || 'Color palette'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        backgroundColor: heroBg,
        transition: isSnapping ? 'none' : `background-color ${SHIFT_MS}ms ease-in-out`,
        padding: `${SPACING.lg} 0`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Optional title */}
      {title && (
        <div
          style={{
            maxWidth: '1190px',
            width: '100%',
            margin: '0 auto',
            padding: breakpoint === 'phone' ? `0 ${SPACING.xs}` : '0 32px',
            marginBottom: SPACING.sm,
          }}
        >
          <span
            style={{
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              fontFamily: '"Vulf Mono", monospace',
              fontStyle: 'italic',
              fontWeight: 300,
              color: titleFg,
              textTransform: 'lowercase',
              transition: isSnapping ? 'none' : `color ${SHIFT_MS}ms ease-in-out`,
            }}
          >
            {title}
          </span>
        </div>
      )}

      {/* Card container */}
      <div
        style={{
          position: 'relative',
          height: Math.ceil(cardHeight * HERO_SCALE) + 20,
          width: '100%',
        }}
      >
        {/* Sliding track */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: `translate(${currentX}px, -50%)`,
            transition: isAnimating
              ? `transform ${SHIFT_MS}ms ease-in-out`
              : 'none',
            display: 'flex',
            gap: cardGap,
            alignItems: 'center',
          }}
        >
          {visibleCards.map(({ colorIndex, position }) => {
            // During the slide, the card arriving at center (position 1) becomes hero.
            // At rest, position 0 is the hero.
            const isHero = isAnimating ? position === 1 : position === 0;

            return (
              <PaletteCard
                key={`pos-${position}`}
                color={colors[colorIndex]}
                isHero={isHero}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                suppressTransition={isSnapping}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
