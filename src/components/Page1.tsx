import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Mail, Linkedin, Pin } from 'lucide-react';
import { ProjectGallery, getDefaultLayout } from '@/components/ProjectGallery';
import { GALLERY_LAYOUTS } from '@/data/galleryLayouts';
import OptimizedImage from '@/components/OptimizedImage';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import FooterStars from '@/components/FooterStars';
import projectsData from '@/data/projects.json';

interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Brand color palette
export const COLORS = {
  background: '#DFC6C2', // Off-pink main background
  card1: '#3F3E32',
  card2: '#E0D623',
  card3: '#DFC6C2',
  charcoal: '#2D2D2A',
  warmGray: '#8B8980',
  deepBrown: '#4A3F35',
  white: '#FFFFFF',
  offWhite: '#EAE4DA' // For contrasting text on dark backgrounds and card backgrounds
};

// Helper function to determine if a background color is dark
const isDarkBackground = (backgroundColor: string): boolean => {
  const darkColors = [COLORS.card1, COLORS.charcoal, COLORS.deepBrown];
  return darkColors.includes(backgroundColor);
};

// Spacing constants
export const SPACING = {
  xs: '16px',
  sm: '32px',
  md: '48px',
  lg: '80px',
  xl: '120px',
  xxl: '160px'
};

// Project data - sourced from JSON for Cloudflare integration
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  client: string;
  roles: string[];
  bodyCopy?: string;
  credits?: { name: string; role: string; url?: string }[];
  heroImage: string;
  galleryImages: string[];
  cloudflareImageId: string | null;
  cloudflareGalleryIds: (string | null)[];
  cloudflareR2Url: string | null;
  cloudflareGalleryR2Urls: (string | null)[];
}

export const PROJECTS: ProjectData[] = projectsData.projects as ProjectData[];

// Scroll position storage
let savedHomeScrollPosition = 0;

// TopBar Component
export const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleProjectsClick = () => {
    if (location.pathname === '/') {
      savedHomeScrollPosition = window.scrollY;
    }
    navigate('/projects');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleAboutClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const aboutSection = Array.from(document.querySelectorAll('h2')).find(h2 => h2.textContent === 'About Greta');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const aboutSection = Array.from(document.querySelectorAll('h2')).find(h2 => h2.textContent === 'About Greta');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header style={{
      width: '100%',
      height: '70px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 32px',
      backgroundColor: COLORS.offWhite,
      borderBottom: `1px solid ${COLORS.warmGray}40`,
      boxSizing: 'border-box',
      position: 'sticky',
      top: 0,
      zIndex: 10000
    }}>
      <button onClick={handleLogoClick} style={{
        background: 'none',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <span style={{
          color: COLORS.charcoal,
          fontSize: '14px',
          fontFamily: '"Compadre Extended", sans-serif',
          fontWeight: 400,
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          GRETA MANTOOTH
        </span>
      </button>
      <nav style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '32px',
        padding: '10px'
      }}>
        <button onClick={handleProjectsClick} style={{
          background: 'none',
          border: 'none',
          color: COLORS.charcoal,
          fontSize: '14px',
          fontFamily: '"Vulf Mono", monospace',
          fontStyle: 'italic',
          fontWeight: 300,
          cursor: 'pointer',
          padding: '8px',
          transition: 'color 0.2s ease',
          textTransform: 'lowercase'
        }} onMouseEnter={e => e.currentTarget.style.color = COLORS.warmGray} onMouseLeave={e => e.currentTarget.style.color = COLORS.charcoal}>
          portfolio
        </button>
        <button onClick={handleAboutClick} style={{
          background: 'none',
          border: 'none',
          color: COLORS.charcoal,
          fontSize: '14px',
          fontFamily: '"Vulf Mono", monospace',
          fontStyle: 'italic',
          fontWeight: 300,
          cursor: 'pointer',
          padding: '8px',
          transition: 'color 0.2s ease',
          textTransform: 'lowercase'
        }} onMouseEnter={e => e.currentTarget.style.color = COLORS.warmGray} onMouseLeave={e => e.currentTarget.style.color = COLORS.charcoal}>
          about
        </button>
      </nav>
    </header>
  );
};

// Sticky Card Component
interface CardProps extends BaseComponentProps {
  headline: string;
  description: string;
  backgroundColor: string;
  index: number;
  image: string;
  extraScrollHeight?: number; // additional vh to extend card for scroll dwell
  mobileGap?: number; // override mobile gap between image and text
}

const StickyCard = ({
  headline,
  description,
  backgroundColor,
  index,
  image,
  extraScrollHeight = 0,
  mobileGap
}: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'phone';
  const topOffset = 70 + index * 30; // 30px visible stripe per card (reduced from 60px)

  // Visible viewport portion — used for centering
  const visibleHeight = `calc(100vh - ${topOffset}px - 80px)`;

  return (
    <section ref={cardRef} style={{
      width: '100%',
      height: `calc(${100 + extraScrollHeight}vh - ${topOffset}px - 80px)`,
      backgroundColor,
      boxSizing: 'border-box',
      position: 'sticky',
      top: `${topOffset}px`,
      zIndex: 50 + index,
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* Inner div sized to the visible viewport portion so centering is always correct */}
      <div style={{
        height: visibleHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: isMobile ? '40px' : '60px',
        paddingBottom: isMobile ? '40px' : '60px',
        paddingLeft: 'clamp(24px, 5vw, 60px)',
        paddingRight: 'clamp(24px, 5vw, 60px)',
        boxSizing: 'border-box',
      }}>
        <div style={{
          maxWidth: '1100px',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'center',
          gap: isMobile ? `${mobileGap ?? 24}px` : '48px',
        }}>
          {/* Image — on mobile, rendered first (above text), large and centered */}
          {isMobile && (
            <div style={{
              width: '100%',
              alignSelf: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={image}
                alt=""
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
          {/* Text column */}
          <div style={{
            flex: isMobile ? 'none' : '1 1 0%',
            width: isMobile ? '100%' : undefined,
            alignSelf: isMobile ? 'flex-start' : undefined,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '8px' : '20px',
          }}>
            <h2 style={{
              margin: 0,
              color: isDarkBackground(backgroundColor) ? COLORS.offWhite : COLORS.charcoal,
              fontSize: isMobile ? 'clamp(24px, 7.5vw, 34px)' : 'clamp(32px, 3.5vw, 52px)',
              fontFamily: '"Compadre Extended", sans-serif',
              fontWeight: 700,
              lineHeight: '1.05',
              textTransform: 'uppercase',
            }}>
              {headline}
            </h2>
            <p style={{
              margin: 0,
              color: isDarkBackground(backgroundColor) ? COLORS.offWhite : COLORS.deepBrown,
              fontSize: isMobile ? '15.5px' : 'clamp(15px, 1.4vw, 18px)',
              fontFamily: '"Vulf Mono", monospace',
              fontWeight: 300,
              lineHeight: '1.6',
            }}>
              {description}
            </p>
          </div>
          {/* Image — on desktop, rendered after text (right side) */}
          {!isMobile && (
            <div style={{
              flex: '0 0 auto',
              width: '38%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={image}
                alt=""
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Image Modal Component - for project detail pages

// Gallery image data - sourced from JSON for Cloudflare integration
const galleryImages = projectsData.mediaGallery;

// Column layout for the carousel: squares stack in pairs, verticals/xl are full-height
const CAROUSEL_COLUMNS: Array<{ type: 'stack' | 'vertical' | 'xl'; imageIndices: number[] }> = [
  { type: 'stack', imageIndices: [0, 1] },       // 01 + 02
  { type: 'vertical', imageIndices: [2] },        // 03
  { type: 'stack', imageIndices: [3, 4] },        // 04 + 05
  { type: 'vertical', imageIndices: [5] },        // 06
  { type: 'stack', imageIndices: [6, 7] },        // 07 + 08
  { type: 'stack', imageIndices: [8, 9] },        // 09 + 10
  { type: 'xl', imageIndices: [10] },             // 11
  { type: 'vertical', imageIndices: [11] },       // 12
  { type: 'vertical', imageIndices: [12] },       // 13
  { type: 'stack', imageIndices: [13, 14] },      // 14 + 15
  { type: 'stack', imageIndices: [15, 16] },      // 16 + 17
  { type: 'vertical', imageIndices: [17] },       // 18
  { type: 'stack', imageIndices: [18, 19] },      // 19 + 20
  { type: 'vertical', imageIndices: [20] },       // 21
];

// Width multipliers relative to carousel height: stack=0.5, vertical=0.75 (3:4), xl=1.5 (3:2)
const COL_WIDTH_MULT: Record<string, number> = { stack: 0.5, vertical: 0.75, xl: 1.5 };

// Media Gallery with bidirectional infinite scroll, drag-to-navigate, and touch support
// Uses CSS transform instead of scrollLeft for seamless wrapping in both directions.
// Three copies of the carousel are rendered; offset is kept in [0, 2*setWidth) so there
// is always content visible on both sides of the viewport.
const MediaGallery = () => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'phone';
  const isDesktop = breakpoint === 'desktop';
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef = useRef(false);

  // Apply transform to inner container
  const applyTransform = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
    }
  }, []);

  // Wrap offset to keep it in [0, 2*setWidth) — always has content on both sides
  const wrapOffset = useCallback(() => {
    const w = setWidthRef.current;
    if (w <= 0) return;
    while (offsetRef.current >= 2 * w) offsetRef.current -= w;
    while (offsetRef.current < 0) offsetRef.current += w;
  }, []);

  // Measure the width of one full set of columns
  const measureSetWidth = useCallback(() => {
    if (firstSetRef.current) {
      const oldW = setWidthRef.current;
      setWidthRef.current = firstSetRef.current.offsetWidth;
      if (!initializedRef.current && setWidthRef.current > 0) {
        // Start viewing the middle copy
        offsetRef.current = setWidthRef.current;
        applyTransform();
        initializedRef.current = true;
      } else if (oldW > 0 && setWidthRef.current !== oldW) {
        // On resize, maintain relative position
        offsetRef.current = (offsetRef.current / oldW) * setWidthRef.current;
        wrapOffset();
        applyTransform();
      }
    }
  }, [applyTransform, wrapOffset]);

  useEffect(() => {
    measureSetWidth();
    window.addEventListener('resize', measureSetWidth);
    return () => window.removeEventListener('resize', measureSetWidth);
  }, [measureSetWidth]);

  // Continuous infinite scroll animation
  useEffect(() => {
    const animate = () => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        offsetRef.current += 0.5;
        wrapOffset();
        applyTransform();
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [wrapOffset, applyTransform]);

  // Helper to resume auto-scroll after a delay
  const resumeAfterDelay = useCallback(() => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 300);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    isPausedRef.current = true;
    startXRef.current = e.pageX;
    dragStartOffsetRef.current = offsetRef.current;
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const walk = (e.pageX - startXRef.current) * 1.5;
    offsetRef.current = dragStartOffsetRef.current - walk;
    wrapOffset();
    applyTransform();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
    resumeAfterDelay();
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (containerRef.current) containerRef.current.style.cursor = 'grab';
      resumeAfterDelay();
    }
  };

  // Touch handlers for mobile drag
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    isPausedRef.current = true;
    startXRef.current = e.touches[0].pageX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const walk = (e.touches[0].pageX - startXRef.current) * 1.5;
    offsetRef.current = dragStartOffsetRef.current - walk;
    wrapOffset();
    applyTransform();
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    resumeAfterDelay();
  };

  // Height in vh units: 80vh desktop (down 20% from 100), 64vh phone (down 20% from 80)
  const heightVh = isMobile ? 64 : 80;

  // Per-image object-position overrides (index into galleryImages)
  const imageObjectPosition: Record<number, string> = {
    11: 'top', // Image 12 (Captain America kid) — keep Target logo in upper-right visible
  };

  // Render one set of carousel columns
  const renderColumns = (keyPrefix: string) => {
    return CAROUSEL_COLUMNS.map((col, colIdx) => {
      const widthVh = COL_WIDTH_MULT[col.type] * heightVh;

      return (
        <div
          key={`${keyPrefix}-col-${colIdx}`}
          style={{
            width: `${widthVh}vh`,
            height: '100%',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {col.imageIndices.map((imgIdx, itemIdx) => {
            const img = galleryImages[imgIdx];
            const isStack = col.type === 'stack';

            return (
              <div
                key={`${keyPrefix}-img-${imgIdx}`}
                style={{
                  width: '100%',
                  flex: isStack ? '1 1 0%' : '1 1 100%',
                  minHeight: 0,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                }}
              >
                <OptimizedImage
                  src={img.image}
                  alt=""
                  cloudflareImageId={img.cloudflareImageId ?? undefined}
                  cloudflareR2Url={img.cloudflareR2Url ?? undefined}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  objectPosition={imageObjectPosition[imgIdx]}
                  style={{
                    display: 'block',
                    width: 'calc(100% + 2px)',
                    height: 'calc(100% + 2px)',
                    margin: '-1px',
                    objectFit: 'cover',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            );
          })}
        </div>
      );
    });
  };

  // Desktop: click-and-drag only (no wheel/swipe)
  // Tablet & mobile: touch swipe only (no mouse drag)
  return (
    <div
      ref={containerRef}
      {...(isDesktop ? {
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        onDragStart: (e: React.DragEvent) => e.preventDefault(),
      } : {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
      })}
      style={{
        width: '100%',
        height: `${heightVh}vh`,
        overflow: 'hidden',
        backgroundColor: COLORS.background,
        cursor: isDesktop ? 'grab' : 'default',
        userSelect: 'none',
      }}
    >
      <div
        ref={innerRef}
        style={{
          display: 'flex',
          height: '100%',
          willChange: 'transform',
        }}
      >
        {/* Three copies for seamless bidirectional looping */}
        <div style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
          {renderColumns('set0')}
        </div>
        <div ref={firstSetRef} style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
          {renderColumns('set1')}
        </div>
        <div style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
          {renderColumns('set2')}
        </div>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({
  id,
  title,
  description,
  heroImage,
  cloudflareImageId,
  cloudflareR2Url,
  onClick
}: {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  cloudflareImageId?: string | null;
  cloudflareR2Url?: string | null;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      flex: '1',
      minWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: COLORS.offWhite,
      overflow: 'hidden',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid rgba(30, 36, 22, 0.15)',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'scale(1.02)';
      e.currentTarget.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)';
    }}
  >
    <div style={{
      width: '100%',
      height: '448px',
      backgroundColor: COLORS.offWhite,
      overflow: 'hidden',
    }}>
      <OptimizedImage
        src={heroImage}
        alt={title}
        cloudflareImageId={cloudflareImageId ?? undefined}
        cloudflareR2Url={cloudflareR2Url ?? undefined}
        width={600}
        height={448}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
    <div style={{
      padding: '20px 24px 24px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <h3 style={{
        margin: 0,
        fontSize: 'clamp(18px, 2.5vw, 28px)',
        fontFamily: '"Compadre Narrow", sans-serif',
        fontWeight: 400,
        color: COLORS.charcoal,
        textTransform: 'uppercase'
      }}>
        {title}
      </h3>
      <p style={{
        margin: 0,
        fontSize: '12px',
        fontFamily: '"Vulf Mono", monospace',
        fontWeight: 300,
        color: COLORS.deepBrown,
        letterSpacing: '0.3px'
      }}>
        {description}
      </p>
    </div>
  </div>
);

// Featured Projects Section
const FeaturedProjects = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleProjectClick = (projectId: string) => {
    savedHomeScrollPosition = window.scrollY;
    navigate(`/project/${projectId}`, { state: { from: 'home' } });
  };

  const handleSeeAllClick = () => {
    savedHomeScrollPosition = window.scrollY;
    navigate('/projects');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section id="featured-projects" style={{
      maxWidth: '1190px',
      width: '100%',
      margin: '0 auto',
      padding: `${SPACING.md} 32px 0 32px`,
      backgroundColor: COLORS.card3
    }}>
      <h2 style={{
        fontSize: 'clamp(22px, 3vw, 36px)',
        fontFamily: '"Vulf Mono", monospace',
        fontStyle: 'italic',
        fontWeight: 300,
        marginBottom: '48px',
        color: COLORS.charcoal,
        textTransform: 'lowercase'
      }}>
        Featured projects
      </h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '40px',
        marginBottom: '48px'
      }}>
        {PROJECTS.slice(0, 2).map(project => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            heroImage={project.heroImage}
            cloudflareImageId={project.cloudflareImageId}
            cloudflareR2Url={project.cloudflareR2Url}
            onClick={() => handleProjectClick(project.id)}
          />
        ))}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <button
          onClick={handleSeeAllClick}
          style={{
            width: '220px',
            height: '52px',
            backgroundColor: COLORS.charcoal,
            color: COLORS.white,
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: '"Vulf Mono", monospace',
            fontWeight: 300,
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = COLORS.warmGray}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = COLORS.charcoal}
        >
          See all projects →
        </button>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const socialButtonStyle: React.CSSProperties = {
    height: '52px',
    padding: '0 48px',
    backgroundColor: COLORS.charcoal,
    color: COLORS.white,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: '"Vulf Mono", monospace',
    fontWeight: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'background-color 0.3s ease'
  };

  return (
    <section style={{
      maxWidth: '1020px',
      width: '100%',
      margin: '100px auto',
      padding: '0 32px'
    }}>
      <h2 style={{
        fontSize: 'clamp(22px, 3vw, 36px)',
        fontFamily: '"Vulf Mono", monospace',
        fontStyle: 'italic',
        fontWeight: 300,
        marginBottom: '48px',
        color: COLORS.charcoal,
        textTransform: 'lowercase'
      }}>
        About Greta
      </h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '48px',
        marginBottom: '64px'
      }}>
        <div style={{
          flex: '1',
          minWidth: '300px',
          overflow: 'hidden',
        }}>
          <OptimizedImage
            src={projectsData.about.photo}
            alt="Greta Mantooth"
            cloudflareImageId={projectsData.about.cloudflareImageId ?? undefined}
            cloudflareR2Url={projectsData.about.cloudflareR2Url ?? undefined}
            width={1200}
            height={1657}
            loading="eager"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div style={{
          flex: '1.3',
          minWidth: '300px'
        }}>
          <p style={{
            margin: 0,
            fontSize: 'clamp(15px, 1.6vw, 19px)',
            fontFamily: '"Vulf Mono", monospace',
            fontWeight: 300,
            lineHeight: '1.62',
            color: COLORS.deepBrown,
            whiteSpace: 'pre-line'
          }}>
            {`Greta Mantooth is a brand-obsessed design director with agency roots and in-house expertise. She's led teams on award-winning work for brands big and small — think fancy booze branding, punny holiday campaigns, and fresh design systems. She likes to work smart, choose joy, and surround herself with good humans.

Greta lives in the Texas hill country with her family and two very sweet and annoying rescue dogs. Together, they like to make things, especially breakfast tacos.`}
          </p>
        </div>
      </div>
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <a href="mailto:greta.mantooth@gmail.com" style={{...socialButtonStyle, textDecoration: 'none'}} onMouseEnter={e => e.currentTarget.style.backgroundColor = COLORS.warmGray} onMouseLeave={e => e.currentTarget.style.backgroundColor = COLORS.charcoal}>
          <Mail size={18} />
          Mail
        </a>
        <a href="https://www.linkedin.com/in/gretamantooth/" target="_blank" rel="noopener noreferrer" style={{...socialButtonStyle, textDecoration: 'none'}} onMouseEnter={e => e.currentTarget.style.backgroundColor = COLORS.warmGray} onMouseLeave={e => e.currentTarget.style.backgroundColor = COLORS.charcoal}>
          <Linkedin size={18} />
          LinkedIn
        </a>
        <a href="https://www.pinterest.com/theladytooth/" target="_blank" rel="noopener noreferrer" style={{...socialButtonStyle, textDecoration: 'none'}} onMouseEnter={e => e.currentTarget.style.backgroundColor = COLORS.warmGray} onMouseLeave={e => e.currentTarget.style.backgroundColor = COLORS.charcoal}>
          <Pin size={18} />
          Pinterest
        </a>
      </div>
    </section>
  );
};

// Footer with background and placeholder GIF
const Footer = () => {
  const breakpoint = useBreakpoint();
  const isMobileFooter = breakpoint === 'phone';
  return (
  <footer style={{
    paddingTop: isMobileFooter ? '24px' : '40px',
    paddingBottom: isMobileFooter ? '24px' : '40px',
    backgroundColor: COLORS.charcoal,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0px'
  }}>
    <div style={{ transform: 'scale(0.95)' }}>
      <FooterStars />
    </div>
    <p style={{
      margin: 0,
      color: COLORS.white,
      fontFamily: '"Vulf Mono", monospace',
      fontWeight: 300,
      fontSize: isMobileFooter ? '10px' : '12px',
      letterSpacing: '0.5px',
      textAlign: 'center',
    }}>
      &copy; 2026 Greta Mantooth and respective brands
    </p>
  </footer>
  );
};

// Home Page
export const HomePage = () => {
  useEffect(() => {
    // Restore scroll position when returning to home
    if (savedHomeScrollPosition > 0) {
      window.scrollTo({ top: savedHomeScrollPosition, behavior: 'instant' });
      savedHomeScrollPosition = 0;
    }
  }, []);

  return (
    <main style={{ width: '100%' }}>
      <StickyCard
        index={0}
        headline="Visual Storyteller"
        description="Narrative design direction bringing distinctive brand stories to life"
        backgroundColor={COLORS.card1}
        image="/Projects/Homepage Cards/HomepageCard_01.png"
      />
      <StickyCard
        index={1}
        headline="Creator & Curator"
        description="Crafting and uncovering the visual details that build iconic brands"
        backgroundColor={COLORS.card2}
        image="/Projects/Homepage Cards/HomepageCard_02.png"
      />
      <StickyCard
        index={2}
        headline="Maker & Mentor"
        description="Hands-on design and high-touch design leadership for teams"
        backgroundColor={COLORS.card3}
        image="/Projects/Homepage Cards/HomepageCard_03.png"
        extraScrollHeight={30}
        mobileGap={12}
      />

      {/* Media Wall Section - Scroll-pinned below nav with 30vh extra scroll.
          Outer wrapper is tall (viewport + 30vh dwell); inner sticky div pins the
          carousel to the nav while the wrapper scrolls through, then releases. */}
      <div style={{
        height: 'calc(100vh - 70px + 30vh)',
        position: 'relative',
        zIndex: 100,
      }}>
        <div style={{
          position: 'sticky',
          top: '70px',
          height: 'calc(100vh - 70px)',
          overflow: 'hidden',
          backgroundColor: COLORS.card3,
        }}>
          <MediaGallery />
        </div>
      </div>

      {/* Bottom Content Section */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 100,
        backgroundColor: COLORS.background,
      }}>
        <FeaturedProjects />
        <AboutSection />
        <Footer />
      </section>
    </main>
  );
};

// Projects Page
export const ProjectsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`, { state: { from: 'projects' } });
  };

  return (
    <main style={{
      width: '100%',
      minHeight: 'calc(100vh - 70px)',
      backgroundColor: COLORS.card3
    }}>
      <section style={{
        maxWidth: '1190px',
        width: '100%',
        margin: '0 auto',
        padding: `${SPACING.lg} 32px`
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontFamily: '"Vulf Mono", monospace',
          fontStyle: 'italic',
          fontWeight: 300,
          marginBottom: '64px',
          color: COLORS.charcoal,
          textTransform: 'lowercase'
        }}>
          All Projects
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '40px'
        }}>
          {PROJECTS.map(project => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              heroImage={project.heroImage}
              cloudflareImageId={project.cloudflareImageId}
              cloudflareR2Url={project.cloudflareR2Url}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

// Project Detail Page
export const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  
  const project = PROJECTS.find(p => p.id === id);
  const from = (location.state as { from?: string })?.from;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBack = () => {
    if (from === 'home') {
      navigate('/');
    } else if (from === 'projects') {
      navigate('/projects');
    } else {
      navigate('/');
    }
  };

  if (!project) {
    return (
      <main style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: COLORS.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p>Project not found</p>
      </main>
    );
  }

  return (
    <main style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: COLORS.background
    }}>
      {/* Full bleed hero */}
      <section style={{
        width: '100%',
        height: isMobile ? '50vh' : '70vh',
        position: 'relative',
        backgroundColor: COLORS.charcoal
      }}>
        <OptimizedImage
          src={project.heroImage}
          alt={project.title}
          cloudflareImageId={project.cloudflareImageId ?? undefined}
          cloudflareR2Url={project.cloudflareR2Url ?? undefined}
          width={1440}
          height={700}
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          objectPosition="center"
        />
      </section>

      {/* Content section - responsive layout */}
      <section style={{
        maxWidth: '1190px',
        width: '100%',
        margin: '0 auto',
        padding: isMobile ? `16px ${SPACING.xs} ${SPACING.md}` : `27px 32px ${SPACING.lg}`
      }}>
        {/* Mobile layout: stacked order */}
        {isMobile ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.md
          }}>
            <h1 style={{
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontFamily: '"Compadre Narrow", sans-serif',
              fontWeight: 400,
              color: '#3f3e32',
              margin: '0 0 24px 0',
              textTransform: 'uppercase'
            }}>
              {project.title}
            </h1>

            {/* Client */}
            <div>
              <span style={{
                display: 'block',
                fontSize: '12px',
                fontFamily: '"Compadre Narrow", sans-serif',
                color: COLORS.warmGray,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                Client
              </span>
              <span style={{
                fontSize: '18px',
                fontFamily: '"Vulf Mono", monospace',
                fontWeight: 300,
                color: COLORS.charcoal
              }}>
                {project.client}
              </span>
            </div>

            {/* Role */}
            <div>
              <span style={{
                display: 'block',
                fontSize: '12px',
                fontFamily: '"Compadre Narrow", sans-serif',
                color: COLORS.warmGray,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                Role
              </span>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {project.roles.map((role, idx) => (
                  <span key={idx} style={{
                    fontSize: '14px',
                    fontFamily: '"Compadre Narrow", sans-serif',
                    fontWeight: 400,
                    color: COLORS.charcoal,
                    backgroundColor: COLORS.white,
                    padding: '4px 12px',
                    borderRadius: '2px',
                    textTransform: 'uppercase'
                  }}>
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Headline/Description */}
            <p style={{
              margin: 0,
              fontSize: 'clamp(13px, 1.4vw, 17px)',
              fontFamily: '"Vulf Mono", monospace',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: '1.52',
              color: COLORS.deepBrown
            }}>
              {project.description}
            </p>

            {/* Body copy */}
            {project.bodyCopy && project.bodyCopy.split('\n').map((para, idx) => (
              <p key={idx} style={{
                margin: 0,
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                fontFamily: '"Vulf Mono", monospace',
                fontWeight: 300,
                lineHeight: '1.62',
                color: COLORS.deepBrown
              }}>
                {para}
              </p>
            ))}
          </div>
        ) : (
          /* Desktop layout: side-by-side */
          <>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontFamily: '"Compadre Narrow", sans-serif',
              fontWeight: 400,
              color: '#3f3e32',
              margin: '0 0 32px 0',
              textTransform: 'uppercase'
            }}>
              {project.title}
            </h1>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: SPACING.lg,
              marginBottom: SPACING.xl
            }}>
              {/* Sidebar info */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING.md
              }}>
                <div>
                  <span style={{
                    display: 'block',
                    fontSize: '12px',
                    fontFamily: '"Compadre Narrow", sans-serif',
                    color: COLORS.warmGray,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>
                    Client
                  </span>
                  <span style={{
                    fontSize: '18px',
                    fontFamily: '"Vulf Mono", monospace',
                    fontWeight: 300,
                    color: COLORS.charcoal
                  }}>
                    {project.client}
                  </span>
                </div>
                <div>
                  <span style={{
                    display: 'block',
                    fontSize: '12px',
                    fontFamily: '"Compadre Narrow", sans-serif',
                    color: COLORS.warmGray,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>
                    Role
                  </span>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {project.roles.map((role, idx) => (
                      <span key={idx} style={{
                        fontSize: '14px',
                        fontFamily: '"Compadre Narrow", sans-serif',
                        fontWeight: 400,
                        color: COLORS.charcoal,
                        backgroundColor: COLORS.white,
                        padding: '4px 12px',
                        borderRadius: '2px',
                        textTransform: 'uppercase'
                      }}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p style={{
                  margin: 0,
                  fontSize: 'clamp(15px, 1.7vw, 21px)',
                  fontFamily: '"Vulf Mono", monospace',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: '1.52',
                  color: COLORS.deepBrown
                }}>
                  {project.description}
                </p>
                {project.bodyCopy && project.bodyCopy.split('\n').map((para, idx) => (
                  <p key={idx} style={{
                    marginTop: idx === 0 ? SPACING.md : SPACING.sm,
                    fontSize: 'clamp(13px, 1.4vw, 17px)',
                    fontFamily: '"Vulf Mono", monospace',
                    fontWeight: 300,
                    lineHeight: '1.62',
                    color: COLORS.deepBrown
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      {/* Project gallery grid */}
      <section style={{
        width: '100%',
        paddingTop: isMobile ? SPACING.md : SPACING.lg,
        paddingBottom: isMobile ? SPACING.md : SPACING.lg,
      }}>
        <ProjectGallery
          sections={GALLERY_LAYOUTS[project.id] || getDefaultLayout(project.galleryImages)}
        />
      </section>

      {/* Credits — hidden for now, will enable once all projects have credits data */}
      {false && project.credits && project.credits.length > 0 && (
        <section style={{
          width: '100%',
          paddingTop: isMobile ? SPACING.md : SPACING.lg,
          paddingBottom: isMobile ? SPACING.md : SPACING.lg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <span style={{
            display: 'block',
            fontSize: isMobile ? '14px' : '16px',
            fontFamily: '"Vulf Mono", monospace',
            fontStyle: 'italic',
            fontWeight: 300,
            color: COLORS.warmGray,
            marginBottom: '12px',
            textTransform: 'lowercase',
          }}>
            credits
          </span>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}>
            {project.credits.map((credit, idx) => (
              <li key={idx} style={{
                fontSize: isMobile ? '14px' : '16px',
                fontFamily: '"Vulf Mono", monospace',
                fontWeight: 300,
                color: COLORS.deepBrown,
                textAlign: 'center',
              }}>
                {credit.url ? (
                  <a href={credit.url} style={{
                    fontWeight: 600,
                    color: COLORS.deepBrown,
                    textDecoration: 'none',
                  }}>
                    {credit.name}
                  </a>
                ) : (
                  <span>{credit.name}</span>
                )}
                , {credit.role}
              </li>
            ))}
          </ul>
        </section>
      )}

      <Footer />
    </main>
  );
};

// Layout wrapper
export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: '100%',
    minHeight: '100vh',
    backgroundColor: COLORS.background,
    display: 'flex',
    flexDirection: 'column'
  }}>
    <TopBar />
    {children}
  </div>
);
