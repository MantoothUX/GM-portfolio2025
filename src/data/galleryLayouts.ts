import type { GallerySection } from '@/components/ProjectGallery';

/**
 * Per-project gallery layout configurations.
 * Keyed by project ID from the PROJECTS array in Page1.tsx.
 *
 * Each project's layout is an array of GallerySection items:
 *   - GridRow: { size: 'sm'|'md'|'lg'|'xl', items: [...] }  (item spans must sum to 4)
 *   - TextBand: { type: 'text-band', heading?, body? }
 *
 * Projects without an entry here will fall back to getDefaultLayout(),
 * which generates a simple 2-up grid from the legacy galleryImages array.
 */
export const GALLERY_LAYOUTS: Record<string, GallerySection[]> = {
  // Project 1: Brand Identity System — EcoThread Collective
  '1': [
    // Full-width hero image
    {
      size: 'lg',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/10/1400/700', alt: 'Brand identity overview', span: 4 },
      ],
    },
    // Two half-width images side by side
    {
      size: 'md',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/11/700/500', alt: 'Logo design', span: 2 },
        { type: 'image', src: 'https://picsum.photos/id/12/700/500', alt: 'Color palette', span: 2 },
      ],
    },
    // Text band break
    {
      type: 'text-band',
      heading: 'The Approach',
      body: 'We developed a comprehensive brand identity system rooted in sustainability and craft. Every element — from the wordmark to the color palette — was designed to communicate EcoThread\'s commitment to ethical fashion without sacrificing visual sophistication.',
    },
    // Text cell + image side by side
    {
      size: 'md',
      items: [
        {
          type: 'text',
          heading: 'Typography',
          body: 'A custom type pairing balances warmth and precision, reflecting the brand\'s handcrafted ethos.',
          span: 2,
        },
        { type: 'image', src: 'https://picsum.photos/id/13/700/500', alt: 'Typography samples', span: 2 },
      ],
    },
    // Four quarter-width images
    {
      size: 'sm',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/14/350/300', alt: 'Icon set 1', span: 1 },
        { type: 'image', src: 'https://picsum.photos/id/15/350/300', alt: 'Icon set 2', span: 1 },
        { type: 'image', src: 'https://picsum.photos/id/16/350/300', alt: 'Icon set 3', span: 1 },
        { type: 'image', src: 'https://picsum.photos/id/17/350/300', alt: 'Icon set 4', span: 1 },
      ],
    },
    // Three-quarter image + quarter text
    {
      size: 'md',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/18/1050/500', alt: 'Brand guidelines spread', span: 3 },
        {
          type: 'text',
          heading: 'Guidelines',
          body: 'A 48-page brand book ensures consistency across all touchpoints.',
          span: 1,
        },
      ],
    },
    // Full-width closing image
    {
      size: 'xl',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/19/1400/800', alt: 'Final brand application', span: 4 },
      ],
    },
  ],
};
