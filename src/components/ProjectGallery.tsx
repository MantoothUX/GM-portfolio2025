import React from 'react';
import { COLORS, SPACING } from '@/components/Page1';
import { useBreakpoint, type Breakpoint } from '@/hooks/use-breakpoint';
import OptimizedImage from '@/components/OptimizedImage';
import { ColorPaletteCarousel } from '@/components/ColorPaletteCarousel';

// ─── Types ───────────────────────────────────────────────────────────────────

export type RowSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface GridImage {
  type: 'image';
  src: string;
  alt: string;
  span: 1 | 2 | 3 | 4;
  rowSpan?: number;        // Span multiple grid rows (used with other items stacked alongside)
  square?: boolean;        // Convenience shorthand for aspectRatio: '1 / 1'
  aspectRatio?: string;    // Any CSS aspect-ratio value (e.g. '3 / 4', '16 / 9'). Overrides row height and square.
  objectPosition?: string;
  cloudflareImageId?: string | null;
  cloudflareR2Url?: string | null;
}

export interface GridVideo {
  type: 'video';
  src: string;
  poster?: string;
  span: 1 | 2 | 3 | 4;
  rowSpan?: number;
  cloudflareR2Url?: string | null;
}

export interface GridText {
  type: 'text';
  heading?: string;
  body?: string;
  span: 1 | 2 | 3 | 4;
  rowSpan?: number;
}

export type GridItem = GridImage | GridVideo | GridText;

export interface GridRow {
  size: RowSize;
  items: GridItem[];
  centered?: boolean; // Center items with negative space on sides (desktop only)
  columns?: number;   // Override grid column count (default: 4 on desktop, 2 on tablet, 1 on phone)
}

export interface TextBand {
  type: 'text-band';
  heading?: string;
  body?: string;
}

export interface ColorPaletteColor {
  name: string;
  hex: string;
  pms?: string;
  cmyk?: string;
  rgb?: string;
  icon?: string; // Image URL for optional icon
}

export interface ColorPaletteSection {
  type: 'color-palette';
  colors: ColorPaletteColor[];
  title?: string; // Optional section title (e.g., "palette")
}

export type GallerySection = GridRow | TextBand | ColorPaletteSection;

// ─── Constants ───────────────────────────────────────────────────────────────

const GAP = 16;

// Row heights: [min (phone), max (desktop)]
// clamp() interpolates fluidly between these using viewport width
const ROW_HEIGHT_RANGES: Record<RowSize, { min: number; max: number; vw: number }> = {
  sm:  { min: 180, max: 250, vw: 22 },
  md:  { min: 220, max: 400, vw: 30 },
  lg:  { min: 280, max: 550, vw: 40 },
  xl:  { min: 320, max: 700, vw: 50 },
  '2xl': { min: 350, max: 780, vw: 58 }, // Full-width landscape rows (e.g. 3:2 images at span 4)
};

function getFluidHeight(size: RowSize): string {
  const { min, max, vw } = ROW_HEIGHT_RANGES[size];
  return `clamp(${min}px, ${vw}vw, ${max}px)`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isTextBand(section: GallerySection): section is TextBand {
  return 'type' in section && (section as TextBand).type === 'text-band';
}

function isColorPalette(section: GallerySection): section is ColorPaletteSection {
  return 'type' in section && (section as ColorPaletteSection).type === 'color-palette';
}

function getResponsiveSpan(span: number, breakpoint: Breakpoint): number {
  if (breakpoint === 'phone') return 1;
  if (breakpoint === 'tablet') return Math.min(span, 2);
  return span;
}

function getGridColumns(breakpoint: Breakpoint): string {
  if (breakpoint === 'phone') return '1fr';
  if (breakpoint === 'tablet') return 'repeat(2, 1fr)';
  return 'repeat(4, 1fr)';
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const GalleryImage = ({
  src,
  alt,
  objectPosition,
  height,
  square,
  aspectRatio,
  cloudflareImageId,
  cloudflareR2Url,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  height: string;
  square?: boolean;
  aspectRatio?: string;
  cloudflareImageId?: string | null;
  cloudflareR2Url?: string | null;
}) => (
  <div style={{ width: '100%', ...(aspectRatio ? { aspectRatio } : square ? { aspectRatio: '1 / 1' } : { height }), overflow: 'hidden' }}>
    <OptimizedImage
      src={src}
      alt={alt}
      cloudflareImageId={cloudflareImageId ?? undefined}
      cloudflareR2Url={cloudflareR2Url ?? undefined}
      loading="lazy"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
      objectPosition={objectPosition || 'center'}
    />
  </div>
);

const GalleryVideo = ({
  src,
  poster,
  height,
  cloudflareR2Url,
}: {
  src: string;
  poster?: string;
  height: string;
  cloudflareR2Url?: string | null;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = React.useState(false);
  const [muted, setMuted] = React.useState(true);
  const [showControls, setShowControls] = React.useState(false);
  const hideTimer = React.useRef<ReturnType<typeof setTimeout>>(null);

  const scheduleHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2500);
  };

  const handlePointerEnter = () => { setShowControls(true); scheduleHide(); };
  const handlePointerLeave = () => { setShowControls(false); if (hideTimer.current) clearTimeout(hideTimer.current); };
  const handlePointerMove = () => { setShowControls(true); scheduleHide(); };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); } else { v.pause(); setPaused(true); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const btnStyle: React.CSSProperties = {
    background: 'rgba(0,0,0,0.45)',
    border: 'none',
    borderRadius: '50%',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#fff',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    transition: 'opacity 0.2s',
  };

  return (
    <div
      style={{ width: '100%', height, overflow: 'hidden', position: 'relative' }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <video
        ref={videoRef}
        src={cloudflareR2Url || src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          display: 'flex',
          gap: 8,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: showControls ? 'auto' : 'none',
        }}
      >
        <button onClick={togglePlay} style={btnStyle} aria-label={paused ? 'Play' : 'Pause'}>
          {paused ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6z" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="4" height="12" rx="1" /><rect x="9" y="2" width="4" height="12" rx="1" /></svg>
          )}
        </button>
        <button onClick={toggleMute} style={btnStyle} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2L4 6H1v4h3l4 4V2z" /><line x1="12" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" /><line x1="11" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="11.5" y1="6" x2="14.5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="14.5" y1="6" x2="11.5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2L4 6H1v4h3l4 4V2z" /><path d="M11 5.5c.8.8 1.2 1.9 1.2 2.5s-.4 1.7-1.2 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M13 3.5C14.3 4.8 15 6.8 15 8s-.7 3.2-2 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>
          )}
        </button>
      </div>
    </div>
  );
};

const GalleryTextCell = ({
  heading,
  body,
}: {
  heading?: string;
  body?: string;
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',  // Fill the grid cell — row height is set by the adjacent image's aspect ratio
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: SPACING.sm,
      boxSizing: 'border-box',
    }}
  >
    {heading && (
      <h3
        style={{
          margin: 0,
          marginBottom: body ? '16px' : 0,
          fontSize: 'clamp(20px, 2.2vw, 28px)',
          fontFamily: '"Compadre Narrow", sans-serif',
          fontWeight: 400,
          color: COLORS.charcoal,
          textTransform: 'uppercase',
        }}
      >
        {heading}
      </h3>
    )}
    {body && (
      <p
        style={{
          margin: 0,
          fontSize: 'clamp(14px, 1.3vw, 16px)',
          fontFamily: '"Vulf Mono", monospace',
          fontWeight: 300,
          lineHeight: '1.7',
          color: COLORS.deepBrown,
        }}
      >
        {body}
      </p>
    )}
  </div>
);

const GalleryTextBand = ({
  heading,
  body,
  breakpoint,
}: {
  heading?: string;
  body?: string;
  breakpoint: Breakpoint;
}) => (
  <div
    style={{
      width: '100%',
      padding: `${SPACING.lg} 0`,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        maxWidth: breakpoint === 'phone' ? '100%' : '65%',
        width: '100%',
      }}
    >
      {heading && (
        <h3
          style={{
            margin: 0,
            marginBottom: body ? '24px' : 0,
            fontSize: 'clamp(24px, 2.8vw, 36px)',
            fontFamily: '"Compadre Narrow", sans-serif',
            fontWeight: 400,
            color: COLORS.charcoal,
            textTransform: 'uppercase',
          }}
        >
          {heading}
        </h3>
      )}
      {body && (
        <p
          style={{
            margin: 0,
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            fontFamily: '"Vulf Mono", monospace',
            fontWeight: 300,
            lineHeight: '1.7',
            color: COLORS.deepBrown,
          }}
        >
          {body}
        </p>
      )}
    </div>
  </div>
);

// ─── Row component ───────────────────────────────────────────────────────────

const GalleryRow = ({
  size,
  items,
  breakpoint,
  centered,
  columns,
}: {
  size: RowSize;
  items: GridItem[];
  breakpoint: Breakpoint;
  centered?: boolean;
  columns?: number;
}) => {
  const height = getFluidHeight(size);
  const effectiveColumns = columns ?? 4;

  // Dev warning for misconfigured rows (skip for rowSpan rows — spans intentionally exceed column count)
  if (process.env.NODE_ENV === 'development') {
    const hasRowSpanItems = items.some(item => item.rowSpan);
    if (!centered && !hasRowSpanItems) {
      const total = items.reduce((sum, item) => sum + item.span, 0);
      if (total !== effectiveColumns) {
        console.warn(`[ProjectGallery] Row spans sum to ${total}, expected ${effectiveColumns}`);
      }
    }
  }

  // On desktop, centered rows use flex so items sit centred with negative space either side.
  // width formula for span S in a 4-col grid: calc(S*25% + GAP*(S/4 - 1))
  const useFlex = centered && breakpoint === 'desktop';

  const gridTemplateColumns = breakpoint === 'desktop'
    ? `repeat(${effectiveColumns}, 1fr)`
    : getGridColumns(breakpoint);

  return (
    <div
      style={
        useFlex
          ? { display: 'flex', justifyContent: 'center', gap: `${GAP}px` }
          : { display: 'grid', gridTemplateColumns, gap: `${GAP}px` }
      }
    >
      {items.map((item, idx) => {
        const responsiveSpan = getResponsiveSpan(item.span, breakpoint);
        const hasRowSpan = !!item.rowSpan && breakpoint === 'desktop';

        const cellStyle: React.CSSProperties = useFlex
          ? { width: `calc(${responsiveSpan * 25}% + ${GAP * (responsiveSpan / 4 - 1)}px)`, flexShrink: 0 }
          : {
              gridColumn: `span ${responsiveSpan}`,
              ...(hasRowSpan ? { gridRow: `span ${item.rowSpan}` } : {}),
            };

        // Items spanning multiple rows fill the full combined grid area height
        const itemHeight = hasRowSpan ? '100%' : height;

        return (
          <div key={idx} style={cellStyle}>
            {item.type === 'image' && (
              <GalleryImage
                src={item.src}
                alt={item.alt}
                objectPosition={item.objectPosition}
                height={itemHeight}
                square={item.square}
                aspectRatio={item.aspectRatio}
                cloudflareImageId={item.cloudflareImageId}
                cloudflareR2Url={item.cloudflareR2Url}
              />
            )}
            {item.type === 'video' && (
              <GalleryVideo
                src={item.src}
                poster={item.poster}
                height={itemHeight}
                cloudflareR2Url={item.cloudflareR2Url}
              />
            )}
            {item.type === 'text' && (breakpoint === 'desktop' || item.heading || item.body) && (
              <GalleryTextCell
                heading={item.heading}
                body={item.body}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────

interface ProjectGalleryProps {
  sections: GallerySection[];
}

export const ProjectGallery = ({ sections }: ProjectGalleryProps) => {
  const breakpoint = useBreakpoint();

  return (
    <div
      style={{
        maxWidth: '1190px',
        width: '100%',
        margin: '0 auto',
        padding: breakpoint === 'phone' ? `0 ${SPACING.xs}` : `0 32px`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${GAP}px`,
      }}
    >
      {sections.map((section, idx) => {
        if (isTextBand(section)) {
          return (
            <GalleryTextBand
              key={idx}
              heading={section.heading}
              body={section.body}
              breakpoint={breakpoint}
            />
          );
        }

        if (isColorPalette(section)) {
          return (
            <ColorPaletteCarousel
              key={idx}
              colors={section.colors}
              title={section.title}
            />
          );
        }

        return (
          <GalleryRow
            key={idx}
            size={section.size}
            items={section.items}
            breakpoint={breakpoint}
            centered={section.centered}
            columns={section.columns}
          />
        );
      })}
    </div>
  );
};

// ─── Default layout helper ───────────────────────────────────────────────────

/**
 * Generates a basic 2-up grid layout from a legacy galleryImages array.
 * Used as fallback for projects that haven't been given a custom layout.
 */
export function getDefaultLayout(galleryImages: string[]): GallerySection[] {
  const sections: GallerySection[] = [];

  for (let i = 0; i < galleryImages.length; i += 2) {
    const items: GridItem[] = [];
    items.push({
      type: 'image',
      src: galleryImages[i],
      alt: `Gallery image ${i + 1}`,
      span: 2,
    });
    if (galleryImages[i + 1]) {
      items.push({
        type: 'image',
        src: galleryImages[i + 1],
        alt: `Gallery image ${i + 2}`,
        span: 2,
      });
    } else {
      // Odd image out — make it full width
      items[0].span = 4;
    }
    sections.push({ size: 'md', items });
  }

  return sections;
}
