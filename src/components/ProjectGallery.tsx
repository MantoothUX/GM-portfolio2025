import React from 'react';
import { COLORS, SPACING } from '@/components/Page1';
import { useBreakpoint, type Breakpoint } from '@/hooks/use-breakpoint';
import OptimizedImage from '@/components/OptimizedImage';

// ─── Types ───────────────────────────────────────────────────────────────────

export type RowSize = 'sm' | 'md' | 'lg' | 'xl';

export interface GridImage {
  type: 'image';
  src: string;
  alt: string;
  span: 1 | 2 | 3 | 4;
  objectPosition?: string;
  cloudflareImageId?: string | null;
  cloudflareR2Url?: string | null;
}

export interface GridVideo {
  type: 'video';
  src: string;
  poster?: string;
  span: 1 | 2 | 3 | 4;
  cloudflareR2Url?: string | null;
}

export interface GridText {
  type: 'text';
  heading?: string;
  body?: string;
  span: 1 | 2 | 3 | 4;
}

export type GridItem = GridImage | GridVideo | GridText;

export interface GridRow {
  size: RowSize;
  items: GridItem[];
}

export interface TextBand {
  type: 'text-band';
  heading?: string;
  body?: string;
}

export type GallerySection = GridRow | TextBand;

// ─── Constants ───────────────────────────────────────────────────────────────

const GAP = 16;

// Row heights: [min (phone), max (desktop)]
// clamp() interpolates fluidly between these using viewport width
const ROW_HEIGHT_RANGES: Record<RowSize, { min: number; max: number; vw: number }> = {
  sm: { min: 180, max: 250, vw: 22 },
  md: { min: 220, max: 400, vw: 30 },
  lg: { min: 280, max: 550, vw: 40 },
  xl: { min: 320, max: 700, vw: 50 },
};

function getFluidHeight(size: RowSize): string {
  const { min, max, vw } = ROW_HEIGHT_RANGES[size];
  return `clamp(${min}px, ${vw}vw, ${max}px)`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isTextBand(section: GallerySection): section is TextBand {
  return 'type' in section && (section as TextBand).type === 'text-band';
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
  cloudflareImageId,
  cloudflareR2Url,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  height: string;
  cloudflareImageId?: string | null;
  cloudflareR2Url?: string | null;
}) => (
  <div style={{ width: '100%', height, overflow: 'hidden' }}>
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
}) => (
  <div style={{ width: '100%', height, overflow: 'hidden' }}>
    <video
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
  </div>
);

const GalleryTextCell = ({
  heading,
  body,
  height,
}: {
  heading?: string;
  body?: string;
  height: string;
}) => (
  <div
    style={{
      width: '100%',
      height,
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
}: {
  size: RowSize;
  items: GridItem[];
  breakpoint: Breakpoint;
}) => {
  const height = getFluidHeight(size);

  // Dev warning for misconfigured rows
  if (process.env.NODE_ENV === 'development') {
    const total = items.reduce((sum, item) => sum + item.span, 0);
    if (total !== 4) {
      console.warn(`[ProjectGallery] Row spans sum to ${total}, expected 4`);
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: getGridColumns(breakpoint),
        gap: `${GAP}px`,
      }}
    >
      {items.map((item, idx) => {
        const responsiveSpan = getResponsiveSpan(item.span, breakpoint);

        const cellStyle: React.CSSProperties = {
          gridColumn: `span ${responsiveSpan}`,
        };

        return (
          <div key={idx} style={cellStyle}>
            {item.type === 'image' && (
              <GalleryImage
                src={item.src}
                alt={item.alt}
                objectPosition={item.objectPosition}
                height={height}
                cloudflareImageId={item.cloudflareImageId}
                cloudflareR2Url={item.cloudflareR2Url}
              />
            )}
            {item.type === 'video' && (
              <GalleryVideo
                src={item.src}
                poster={item.poster}
                height={height}
                cloudflareR2Url={item.cloudflareR2Url}
              />
            )}
            {item.type === 'text' && (
              <GalleryTextCell
                heading={item.heading}
                body={item.body}
                height={height}
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

        return (
          <GalleryRow
            key={idx}
            size={section.size}
            items={section.items}
            breakpoint={breakpoint}
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
