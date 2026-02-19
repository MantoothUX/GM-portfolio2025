import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Mail, Linkedin, Pin } from 'lucide-react';
import { ProjectGallery, getDefaultLayout } from '@/components/ProjectGallery';
import { GALLERY_LAYOUTS } from '@/data/galleryLayouts';
import OptimizedImage from '@/components/OptimizedImage';
import projectsData from '@/data/projects.json';

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

// Project data - sourced from JSON for Cloudflare integration
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  client: string;
  roles: string[];
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

// Gallery image data - sourced from JSON for Cloudflare integration
const galleryImages = projectsData.mediaGallery;

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
          overflow: 'hidden',
          pointerEvents: 'none'
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
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            userSelect: 'none',
            pointerEvents: 'none',
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
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)';
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
          overflow: 'hidden',
          position: 'relative'
        }}>
          <OptimizedImage
            src={projectsData.about.photo}
            alt="Greta Mantooth"
            cloudflareImageId={projectsData.about.cloudflareImageId ?? undefined}
            cloudflareR2Url={projectsData.about.cloudflareR2Url ?? undefined}
            width={600}
            height={500}
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
    {/* Animated GIF - served from R2 when available */}
    {(projectsData.footer.gifCloudflareR2Url || projectsData.footer.gifImage) ? (
      <div style={{
        width: '120px',
        height: '120px',
        overflow: 'hidden',
        borderRadius: '8px',
      }}>
        <OptimizedImage
          src={projectsData.footer.gifImage || ''}
          alt="Greta Mantooth animated logo"
          cloudflareR2Url={projectsData.footer.gifCloudflareR2Url ?? undefined}
          width={120}
          height={120}
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    ) : (
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
    )}
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

            <h1 style={{
              fontSize: '36px',
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

            <h1 style={{
              fontSize: '64px',
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

      {/* Project gallery grid */}
      <section style={{
        width: '100%',
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.lg,
      }}>
        <ProjectGallery
          sections={GALLERY_LAYOUTS[project.id] || getDefaultLayout(project.galleryImages)}
        />
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
