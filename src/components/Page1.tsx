import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Mail, Linkedin, Pin } from 'lucide-react';

interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Brand color palette
export const COLORS = {
  background: '#EDD9D6', // Off-pink main background
  card1: '#3F3E32',
  card2: '#E0D623',
  card3: '#EDD9D6',
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

// Project data
export const PROJECTS = [
  {
    id: '1',
    title: 'Brand Identity System',
    description: 'Complete visual identity for a sustainable fashion startup',
    client: 'EcoThread Collective',
    roles: ['Brand Strategy', 'Visual Identity', 'Guidelines'],
    heroImage: '/placeholder.jpg',
    galleryImages: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg']
  },
  {
    id: '2',
    title: 'Digital Experience',
    description: 'Website and app design for an artisan coffee roaster',
    client: 'Morning Ritual Coffee',
    roles: ['UX Design', 'UI Design', 'Art Direction'],
    heroImage: '/placeholder.jpg',
    galleryImages: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg']
  },
  {
    id: '3',
    title: 'Packaging Design',
    description: 'Product packaging for a botanical skincare line',
    client: 'Verdant Botanicals',
    roles: ['Packaging', 'Print Design', 'Brand Extension'],
    heroImage: '/placeholder.jpg',
    galleryImages: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg']
  },
  {
    id: '4',
    title: 'Editorial Design',
    description: 'Magazine layout and art direction for quarterly publication',
    client: 'Slow Living Magazine',
    roles: ['Editorial', 'Typography', 'Layout'],
    heroImage: '/placeholder.jpg',
    galleryImages: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg']
  },
  {
    id: '5',
    title: 'Environmental Graphics',
    description: 'Wayfinding and signage for boutique hotel',
    client: 'The Wanderer Hotel',
    roles: ['Signage', 'Wayfinding', 'Environmental'],
    heroImage: '/placeholder.jpg',
    galleryImages: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg']
  },
  {
    id: '6',
    title: 'Campaign Design',
    description: 'Integrated marketing campaign for wellness brand',
    client: 'Breathe Wellness',
    roles: ['Campaign', 'Digital', 'Print'],
    heroImage: '/placeholder.jpg',
    galleryImages: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg']
  }
];

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
  title: string;
  headline: string;
  description: string;
  backgroundColor: string;
  index: number;
}

const StickyCard = ({
  title,
  headline,
  description,
  backgroundColor,
  index
}: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const topOffset = 70 + index * 30; // 30px visible stripe per card (reduced from 60px)

  return (
    <section ref={cardRef} style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: '180px',
      paddingBottom: '60px',
      paddingLeft: '60px',
      paddingRight: '60px',
      backgroundColor,
      boxSizing: 'border-box',
      position: 'sticky',
      top: `${topOffset}px`,
      zIndex: 50 + index,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{
        maxWidth: '888px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <h2 style={{
            margin: 0,
            color: isDarkBackground(backgroundColor) ? COLORS.offWhite : COLORS.charcoal,
            fontSize: '48px',
            fontFamily: '"Vulf Mono", monospace',
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: '1.2',
            textTransform: 'lowercase'
          }}>
            {headline}
          </h2>
          <p style={{
            margin: 0,
            maxWidth: '727px',
            color: isDarkBackground(backgroundColor) ? COLORS.offWhite : COLORS.deepBrown,
            fontSize: '20px',
            fontFamily: '"Vulf Mono", monospace',
            fontWeight: 300,
            lineHeight: '1.6'
          }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

// Image Modal Component - for project detail pages
const ImageModal = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '80vw',
          height: '70vh',
          maxWidth: '1000px',
          backgroundColor: COLORS.offWhite,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          style={{
            maxWidth: '200px',
            maxHeight: '200px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            opacity: 0.3
          }}
        />
      </div>
      
      <button onClick={onClose} style={{
        position: 'absolute',
        top: '32px',
        right: '32px',
        background: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        cursor: 'pointer',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        zIndex: 10
      }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        ×
      </button>
      
      <button onClick={e => { e.stopPropagation(); onPrev(); }} style={{
        position: 'absolute',
        left: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        cursor: 'pointer',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 'bold'
      }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}>
        ←
      </button>
      
      <button onClick={e => { e.stopPropagation(); onNext(); }} style={{
        position: 'absolute',
        right: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        cursor: 'pointer',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 'bold'
      }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}>
        →
      </button>
      
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '8px 16px',
        borderRadius: '20px',
        fontFamily: '"Courier New", "Courier", monospace',
        fontSize: '12px',
        color: COLORS.charcoal,
        letterSpacing: '0.5px'
      }}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// Gallery image data - duplicated for seamless infinite scroll
// Using image placeholders instead of colors
const galleryImages = [
  { image: '/placeholder.jpg', width: 378, height: 378, top: 0, left: 0 },
  { image: '/placeholder.jpg', width: 378, height: 378, top: 378, left: 0 },
  { image: '/placeholder.jpg', width: 583, height: 756, top: 0, left: 378 },
  { image: '/placeholder.jpg', width: 378, height: 378, top: 0, left: 961 },
  { image: '/placeholder.jpg', width: 378, height: 378, top: 378, left: 961 },
  { image: '/placeholder.jpg', width: 825, height: 756, top: 0, left: 1339 },
  { image: '/placeholder.jpg', width: 378, height: 378, top: 0, left: 2164 },
  { image: '/placeholder.jpg', width: 378, height: 378, top: 378, left: 2164 },
];

const GALLERY_WIDTH = 2542;

// Media Gallery with infinite scroll and drag-to-navigate (no click functionality)
const MediaGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const scrollPosRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Continuous infinite scroll animation
  useEffect(() => {
    const animate = () => {
      if (!isPausedRef.current && !isDraggingRef.current && containerRef.current) {
        scrollPosRef.current += 0.5;
        
        // Reset seamlessly when we've scrolled one full set
        if (scrollPosRef.current >= GALLERY_WIDTH) {
          scrollPosRef.current = 0;
        }
        
        containerRef.current.scrollLeft = scrollPosRef.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    isPausedRef.current = true;
    startXRef.current = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeftRef.current = containerRef.current?.scrollLeft || 0;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startXRef.current) * 1.5;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeftRef.current - walk;
      scrollPosRef.current = containerRef.current.scrollLeft;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      scrollPosRef.current = containerRef.current.scrollLeft;
    }
    setTimeout(() => {
      isPausedRef.current = false;
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
        scrollPosRef.current = containerRef.current.scrollLeft;
      }
      setTimeout(() => {
        isPausedRef.current = false;
      }, 3000);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    isPausedRef.current = true;
    if (containerRef.current) {
      scrollPosRef.current = containerRef.current.scrollLeft;
    }
    setTimeout(() => {
      isPausedRef.current = false;
    }, 3000);
  };

  // Render gallery images (duplicated for seamless loop) - no click handlers
  const renderGalleryImages = (offset: number, keyPrefix: string) => {
    return galleryImages.map((img, idx) => (
      <div
        key={`${keyPrefix}-${idx}`}
        style={{
          position: 'absolute',
          left: `${img.left + offset}px`,
          top: `${img.top}px`,
          width: `${img.width}px`,
          height: `${img.height}px`,
          backgroundColor: COLORS.offWhite,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        <img
          src={img.image}
          alt=""
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          style={{
            maxWidth: '60px',
            maxHeight: '60px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            userSelect: 'none',
            opacity: 0.3
          }}
        />
      </div>
    ));
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onDragStart={(e) => e.preventDefault()}
      style={{
        width: '100%',
        height: '100vh',
        overflowX: 'auto',
        overflowY: 'hidden',
        backgroundColor: COLORS.background,
        scrollbarWidth: 'none',
        cursor: 'grab',
        userSelect: 'none'
      }}
    >
      <div style={{
        display: 'flex',
        height: '100%',
        width: `${GALLERY_WIDTH * 2}px`,
        position: 'relative'
      }}>
        {/* First set of images */}
        {renderGalleryImages(0, 'set1')}
        {/* Duplicate set for seamless loop */}
        {renderGalleryImages(GALLERY_WIDTH, 'set2')}
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
  onClick
}: {
  id: string;
  title: string;
  description: string;
  heroImage: string;
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
      cursor: 'pointer',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: `1px solid ${COLORS.warmGray}30`
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{
      width: '100%',
      height: '448px',
      backgroundColor: COLORS.offWhite,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <img
        src="/placeholder.jpg"
        alt={title}
        style={{
          maxWidth: '80px',
          maxHeight: '80px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          opacity: 0.3
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
        fontSize: '28px',
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
        fontSize: '36px',
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
      maxWidth: '1190px',
      width: '100%',
      margin: '100px auto',
      padding: '0 32px'
    }}>
      <h2 style={{
        fontSize: '36px',
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
          height: '500px',
          backgroundColor: COLORS.offWhite,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src="/placeholder.jpg"
            alt="Greta Mantooth"
            style={{
              maxWidth: '100px',
              maxHeight: '100px',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              opacity: 0.3
            }}
          />
        </div>
        <div style={{
          flex: '1',
          minWidth: '300px'
        }}>
          <p style={{
            margin: 0,
            fontSize: '20px',
            fontFamily: '"Vulf Mono", monospace',
            fontWeight: 300,
            lineHeight: '1.7',
            color: COLORS.deepBrown,
            whiteSpace: 'pre-line'
          }}>
            {`As a graphic designer, Greta Mantooth merges creativity with strategic thinking to craft compelling visual identities. She specializes in helping tech startups stand out in crowded markets.

Greta's design philosophy centers on clear communication and emotional connection. She believes that effective design should not only look good but also tell a story that resonates with the target audience.

Her passion lies in empowering businesses to articulate their unique value proposition through impactful branding.`}
          </p>
        </div>
      </div>
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <button style={socialButtonStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = COLORS.warmGray} onMouseLeave={e => e.currentTarget.style.backgroundColor = COLORS.charcoal}>
          <Mail size={18} />
          Mail
        </button>
        <button style={socialButtonStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = COLORS.warmGray} onMouseLeave={e => e.currentTarget.style.backgroundColor = COLORS.charcoal}>
          <Linkedin size={18} />
          LinkedIn
        </button>
        <button style={socialButtonStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = COLORS.warmGray} onMouseLeave={e => e.currentTarget.style.backgroundColor = COLORS.charcoal}>
          <Pin size={18} />
          Pinterest
        </button>
      </div>
    </section>
  );
};

// Footer with background and placeholder GIF
const Footer = () => (
  <footer style={{
    padding: `${SPACING.lg} 0`,
    backgroundColor: COLORS.charcoal,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm
  }}>
    {/* Placeholder for animated GIF */}
    <div style={{
      width: '120px',
      height: '120px',
      backgroundColor: COLORS.white,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Vulf Mono", monospace',
      fontSize: '10px',
      color: COLORS.charcoal,
      textAlign: 'center',
      padding: '8px'
    }}>
      [animated gif placeholder]
    </div>
    <p style={{
      margin: 0,
      color: COLORS.white,
      fontFamily: '"Vulf Mono", monospace',
      fontWeight: 300,
      fontSize: '12px',
      letterSpacing: '0.5px'
    }}>
      © 2024 Greta Mantooth
    </p>
  </footer>
);

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
        title="Vision"
        headline="A really stylish headline will go here"
        description="A bunch of really nice supporting text will go here. It will probably be several lines and that is neat. How about a third line for the children? Let's bring it on home with a fourth line, for good measure."
        backgroundColor={COLORS.card1}
      />
      <StickyCard
        index={1}
        title="Craft"
        headline="A really stylish headline will go here"
        description="A bunch of really nice supporting text will go here. It will probably be several lines and that is neat. How about a third line for the children? Let's bring it on home with a fourth line, for good measure."
        backgroundColor={COLORS.card2}
      />
      <StickyCard
        index={2}
        title="Elevate"
        headline="A really stylish headline will go here"
        description="A bunch of really nice supporting text will go here. It will probably be several lines and that is neat. How about a third line for the children? Let's bring it on home with a fourth line, for good measure."
        backgroundColor={COLORS.card3}
      />

      {/* Media Wall Section - Full bleed, no padding */}
      <section style={{
        height: '100vh',
        position: 'sticky',
        top: '70px',
        zIndex: 100,
        backgroundColor: COLORS.card3
      }}>
        <MediaGallery />
      </section>

      {/* Bottom Content Section */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 100,
        backgroundColor: COLORS.background,
        paddingTop: SPACING.lg
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
          fontSize: '64px',
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
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const handleNextImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.galleryImages.length);
    }
  };

  const handlePrevImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.galleryImages.length) % project.galleryImages.length);
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
      {/* Image Modal */}
      {modalOpen && (
        <ImageModal
          images={project.galleryImages}
          currentIndex={currentImageIndex}
          onClose={() => setModalOpen(false)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      )}

      {/* Full bleed hero */}
      <section style={{
        width: '100%',
        height: isMobile ? '50vh' : '70vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        padding: isMobile ? SPACING.sm : SPACING.lg
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.charcoal,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0
        }}>
          <img
            src="/placeholder.jpg"
            alt={project.title}
            style={{
              maxWidth: '120px',
              maxHeight: '120px',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              opacity: 0.3
            }}
          />
        </div>
        <div style={{
          maxWidth: '1190px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{
            fontSize: isMobile ? '36px' : '64px',
            fontFamily: '"Compadre Narrow", sans-serif',
            fontWeight: 400,
            color: COLORS.white,
            marginBottom: SPACING.sm,
            textTransform: 'uppercase',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {project.title}
          </h1>
        </div>
      </section>

      {/* Content section - responsive layout */}
      <section style={{
        maxWidth: '1190px',
        width: '100%',
        margin: '0 auto',
        padding: isMobile ? `${SPACING.md} ${SPACING.xs}` : `${SPACING.lg} 32px`
      }}>
        {/* Mobile layout: stacked order */}
        {isMobile ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.md
          }}>
            {/* Back button */}
            <button
              onClick={handleBack}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: '"Vulf Mono", monospace',
                fontWeight: 300,
                color: COLORS.charcoal,
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.2s ease'
              }}
            >
              ← Back to {from === 'projects' ? 'all projects' : 'home'}
            </button>

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
              fontSize: '20px',
              fontFamily: '"Vulf Mono", monospace',
              fontWeight: 300,
              lineHeight: '1.6',
              color: COLORS.deepBrown
            }}>
              {project.description}
            </p>

            {/* Body copy */}
            <p style={{
              margin: 0,
              fontSize: '16px',
              fontFamily: '"Vulf Mono", monospace',
              fontWeight: 300,
              lineHeight: '1.7',
              color: COLORS.deepBrown
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p style={{
              margin: 0,
              fontSize: '16px',
              fontFamily: '"Vulf Mono", monospace',
              fontWeight: 300,
              lineHeight: '1.7',
              color: COLORS.deepBrown
            }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>
        ) : (
          /* Desktop layout: side-by-side */
          <>
            {/* Back button */}
            <button
              onClick={handleBack}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: '"Vulf Mono", monospace',
                fontWeight: 300,
                color: COLORS.charcoal,
                marginBottom: SPACING.lg,
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.warmGray}
              onMouseLeave={e => e.currentTarget.style.color = COLORS.charcoal}
            >
              ← Back to {from === 'projects' ? 'all projects' : 'home'}
            </button>

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
                  fontSize: '24px',
                  fontFamily: '"Vulf Mono", monospace',
                  fontWeight: 300,
                  lineHeight: '1.6',
                  color: COLORS.deepBrown
                }}>
                  {project.description}
                </p>
                <p style={{
                  marginTop: SPACING.md,
                  fontSize: '18px',
                  fontFamily: '"Vulf Mono", monospace',
                  fontWeight: 300,
                  lineHeight: '1.7',
                  color: COLORS.deepBrown
                }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p style={{
                  marginTop: SPACING.sm,
                  fontSize: '18px',
                  fontFamily: '"Vulf Mono", monospace',
                  fontWeight: 300,
                  lineHeight: '1.7',
                  color: COLORS.deepBrown
                }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Gallery wall - 2x2 grid, clickable, responsive */}
      <section style={{
        width: '100%',
        padding: isMobile ? `${SPACING.md} 0` : `${SPACING.lg} 0`
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '4px'
        }}>
          {project.galleryImages.map((image, idx) => (
            <div
              key={idx}
              onClick={() => handleImageClick(idx)}
              style={{
                width: '100%',
                height: isMobile ? '250px' : '400px',
          backgroundColor: COLORS.offWhite,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'opacity 0.2s ease'
        }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <img
                src={image}
                alt={`${project.title} gallery image ${idx + 1}`}
                style={{
                  maxWidth: '80px',
                  maxHeight: '80px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  opacity: 0.3
                }}
              />
            </div>
          ))}
        </div>
      </section>

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
