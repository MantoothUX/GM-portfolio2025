import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SPACING } from '@/components/Page1';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import type { ColorPaletteColor } from '@/components/ProjectGallery';

// ─── Helpers ────────────────────────────────────────────────────────────────

function isDark(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.45;
}

function textColor(hex: string): string {
  return isDark(hex) ? '#FFFFFF' : '#2D2D2A';
}

function subtextColor(hex: string): string {
  return isDark(hex) ? 'rgba(255,255,255,0.7)' : 'rgba(45,45,42,0.6)';
}

// ─── Constants ──────────────────────────────────────────────────────────────

const PAUSE_MS = 1200;
const SHIFT_MS = 1200;
const RESUME_DELAY_MS = 100;
const MOBILE_TAP_PAUSE_MS = 2400;
const HERO_SCALE = 1.4;
const CLICK_SCALE_BOOST = 0.4;

// ─── Card (pure presentation) ───────────────────────────────────────────────

interface PaletteCardProps {
  color: ColorPaletteColor;
  isHero: boolean;
  isPressed: boolean;
  cardWidth: number;
  cardHeight: number;
  suppressTransition: boolean;
}

const COLOR_FIELDS = ['pms', 'cmyk', 'rgb', 'hex'] as const;

const PaletteCard = React.memo(({ color, isHero, isPressed, cardWidth, cardHeight, suppressTransition }: PaletteCardProps) => {
  const fg = textColor(color.hex);
  const fgSub = subtextColor(color.hex);
  const s = cardWidth / 200;
  const baseScale = isHero ? HERO_SCALE : 1;
  const currentScale = isPressed ? baseScale + CLICK_SCALE_BOOST : baseScale;

  return (
    <div
      style={{
        pointerEvents: 'none',
        width: cardWidth,
        height: cardHeight,
        minWidth: cardWidth,
        borderRadius: Math.round(16 * s),
        backgroundColor: color.hex,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: `${Math.round(24 * s)}px ${Math.round(20 * s)}px ${Math.round(20 * s)}px`,
        boxSizing: 'border-box',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        border: isHero ? '1px solid #FFFFFF' : '1px solid transparent',
        transform: `scale(${currentScale})`,
        transformOrigin: 'center center',
        transition: suppressTransition
          ? 'none'
          : `transform ${SHIFT_MS}ms ease-in-out, border-color ${SHIFT_MS}ms ease-in-out`,
      }}
    >
      <div>
        {color.icon && (
          <img
            src={color.icon}
            alt=""
            style={{
              width: Math.round(40 * s),
              height: Math.round(40 * s),
              borderRadius: Math.round(8 * s),
              objectFit: 'cover',
              marginBottom: Math.round(16 * s),
              display: 'block',
            }}
          />
        )}
        <h4
          style={{
            margin: 0,
            fontSize: Math.round(26 * s),
            fontFamily: '"Compadre Narrow", sans-serif',
            fontWeight: 700,
            color: fg,
            lineHeight: 1.15,
            whiteSpace: 'pre-line',
          }}
        >
          {color.name}
        </h4>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: Math.round(4 * s),
          fontSize: Math.round(11 * s),
          fontFamily: '"Vulf Mono", monospace',
          fontWeight: 400,
          color: fgSub,
          lineHeight: 1.5,
        }}
      >
        {COLOR_FIELDS.map((field) => {
          const value = field === 'hex' ? color.hex.toLowerCase() : color[field];
          if (!value) return null;
          return (
            <div key={field} style={{ display: 'flex', gap: Math.round(12 * s) }}>
              <span style={{ width: Math.round(40 * s) }}>{field.toUpperCase()}</span>
              <span style={{ color: fg }}>{value}</span>
            </div>
          );
        })}
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
  const [heroIndex, setHeroIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [pressedPosition, setPressedPosition] = useState<number | null>(null);

  const n = colors.length;

  // Pause mechanism: a ref the loop checks, plus a token to restart it.
  const pausedRef = useRef(false);
  const resumingRef = useRef(false);
  const loopTimer = useRef<number | null>(null);
  const snapTimer = useRef<number | null>(null);
  const snapRaf = useRef<number | null>(null);
  const tapTimer = useRef<number | null>(null);
  const pressTimer = useRef<number | null>(null);
  const [loopToken, setLoopToken] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth : 1200),
  );

  // Card sizing
  const cardWidth = breakpoint === 'phone' ? 150 : breakpoint === 'tablet' ? 180 : 200;
  const cardHeight = breakpoint === 'phone' ? 240 : breakpoint === 'tablet' ? 280 : 320;
  const cardGap = breakpoint === 'phone' ? 12 : 20;
  const cardStep = cardWidth + cardGap;
  const heroMargin = Math.round(40 * (cardWidth / 200));

  // Visible cards
  const sideCount = Math.ceil(viewportWidth / (2 * cardStep)) + 1;
  const visibleCards: { colorIndex: number; position: number }[] = [];
  for (let i = -sideCount; i <= sideCount; i++) {
    visibleCards.push({ colorIndex: (((heroIndex + i) % n) + n) % n, position: i });
  }

  // Centering
  const heroCenter = sideCount * cardStep + heroMargin + cardWidth / 2;
  const restX = viewportWidth / 2 - heroCenter;
  const currentX = isAnimating ? restX - cardStep : restX;

  // Background
  const nextHeroIndex = (heroIndex + 1) % n;
  const heroBg = isAnimating ? colors[nextHeroIndex].hex : colors[heroIndex].hex;
  const titleFg = textColor(heroBg);

  // ── Animation loop ──
  //
  // 1. Wait PAUSE_MS
  // 2. If paused, stop. Otherwise start slide.
  // 3. Wait SHIFT_MS for CSS transition.
  // 4. Snap-reset (suppress transitions, bump heroIndex).
  // 5. Next frame: re-enable transitions, go to 1.
  //
  // If paused mid-slide, the CSS transition finishes visually.
  // The snap still fires so state stays in sync. We just don't
  // start the next slide.

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      const delay = resumingRef.current ? RESUME_DELAY_MS : PAUSE_MS;
      resumingRef.current = false;

      loopTimer.current = window.setTimeout(() => {
        if (cancelled || pausedRef.current) return;

        setIsAnimating(true);

        snapTimer.current = window.setTimeout(() => {
          if (cancelled) return;

          setIsSnapping(true);
          setIsAnimating(false);
          setHeroIndex((prev) => (prev + 1) % n);

          snapRaf.current = requestAnimationFrame(() => {
            if (cancelled) return;
            snapRaf.current = null;
            setIsSnapping(false);

            if (pausedRef.current) return;
            run();
          });
        }, SHIFT_MS);
      }, delay);
    };

    run();

    return () => {
      cancelled = true;
      if (loopTimer.current !== null) clearTimeout(loopTimer.current);
      if (snapTimer.current !== null) clearTimeout(snapTimer.current);
      if (snapRaf.current !== null) cancelAnimationFrame(snapRaf.current);
      loopTimer.current = null;
      snapTimer.current = null;
      snapRaf.current = null;
    };
  }, [n, loopToken]);

  // Restart the loop (clears old timers via effect cleanup)
  const restart = useCallback(() => {
    pausedRef.current = false;
    setLoopToken((t) => t + 1);
  }, []);

  // ── Hover: desktop + tablet, only hero can START a pause ──
  // Any card leaving can END one (fixes stale-closure when hero
  // shifts out from under the cursor mid-animation).
  const handleHoverIn = useCallback(() => {
    if (breakpoint === 'phone') return;
    pausedRef.current = true;
  }, [breakpoint]);

  const handleHoverOut = useCallback(() => {
    if (breakpoint === 'phone') return;
    if (!pausedRef.current) return;
    resumingRef.current = true;
    restart();
  }, [breakpoint, restart]);

  // ── Tap: tablet + phone, hero only ──
  // First tap pauses (with auto-resume after MOBILE_TAP_PAUSE_MS).
  // Second tap while paused cancels the timer and resumes immediately.
  const handleTap = useCallback((isHero: boolean) => {
    if (breakpoint === 'desktop' || !isHero) return;

    // Click scale (fires on both pause and play)
    setPressedPosition(0);
    if (pressTimer.current !== null) clearTimeout(pressTimer.current);
    pressTimer.current = window.setTimeout(() => {
      setPressedPosition(null);
      pressTimer.current = null;
    }, 200);

    // Toggle: if already paused, resume immediately
    if (pausedRef.current) {
      if (tapTimer.current !== null) { clearTimeout(tapTimer.current); tapTimer.current = null; }
      restart();
      return;
    }

    // Otherwise pause with auto-resume
    pausedRef.current = true;
    if (tapTimer.current !== null) clearTimeout(tapTimer.current);
    tapTimer.current = window.setTimeout(() => {
      tapTimer.current = null;
      restart();
    }, MOBILE_TAP_PAUSE_MS);
  }, [breakpoint, restart]);

  // ── Pause during resize (recalculating layout mid-animation is jumpy) ──
  const resizeTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      pausedRef.current = true;
      if (resizeTimer.current !== null) clearTimeout(resizeTimer.current);
      resizeTimer.current = window.setTimeout(() => {
        resizeTimer.current = null;
        setViewportWidth(window.innerWidth);
        restart();
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimer.current !== null) clearTimeout(resizeTimer.current);
    };
  }, [restart]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (tapTimer.current !== null) clearTimeout(tapTimer.current);
      if (pressTimer.current !== null) clearTimeout(pressTimer.current);
    };
  }, []);

  // ── Render ──
  const wrapperTransition = isSnapping ? 'none' : `margin ${SHIFT_MS}ms ease-in-out`;

  return (
    <section
      aria-label={title || 'Color palette'}
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

      <div style={{ position: 'relative', height: Math.ceil(cardHeight * HERO_SCALE) + 20, width: '100%' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: `translate(${currentX}px, -50%)`,
            transition: isAnimating ? `transform ${SHIFT_MS}ms ease-in-out` : 'none',
            display: 'flex',
            gap: cardGap,
            alignItems: 'center',
          }}
        >
          {visibleCards.map(({ colorIndex, position }) => {
            const isHero = isAnimating ? position === 1 : position === 0;
            return (
              <div
                key={`pos-${position}`}
                onMouseEnter={isHero ? handleHoverIn : undefined}
                onMouseLeave={handleHoverOut}
                onClick={isHero ? () => handleTap(true) : undefined}
                style={{
                  cursor: isHero ? 'pointer' : 'default',
                  width: cardWidth,
                  height: cardHeight,
                  minWidth: cardWidth,
                  flexShrink: 0,
                  margin: isHero ? `0 ${heroMargin}px` : '0',
                  transition: wrapperTransition,
                  overflow: 'visible',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                }}
              >
                <PaletteCard
                  color={colors[colorIndex]}
                  isHero={isHero}
                  isPressed={pressedPosition === position}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  suppressTransition={isSnapping}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
