import type { GallerySection } from '@/components/ProjectGallery';

/**
 * Per-project gallery layout configurations.
 * Keyed by project ID from the PROJECTS array in Page1.tsx.
 *
 * Each project's layout is an array of GallerySection items:
 *   - GridRow: { size: 'sm'|'md'|'lg'|'xl'|'2xl', items: [...], centered?: boolean }
 *       · Item spans must sum to 4 (unless centered: true, which allows partial rows)
 *       · centered: true — desktop only; items sit centred with negative space on each side
 *       · GridImage extras: square (1:1 crop), aspectRatio (any CSS value), objectPosition
 *   - TextBand: { type: 'text-band', heading?, body? }
 *   - ColorPaletteSection: { type: 'color-palette', colors: [...], title? }
 *
 * Projects without an entry here will fall back to getDefaultLayout(),
 * which generates a simple 2-up grid from the legacy galleryImages array.
 */
export const GALLERY_LAYOUTS: Record<string, GallerySection[]> = {
  // ─── Project 1: Brand Identity System — EcoThread Collective ────────────
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
    // Color palette carousel
    {
      type: 'color-palette',
      title: 'color palette',
      colors: [
        {
          name: 'Black\nLicorice',
          hex: '#2D2D2A',
          pms: '2043 C',
          cmyk: '0/22/0/0',
          rgb: '247/212/229',
          icon: undefined,
        },
        {
          name: 'String\nCheese',
          hex: '#f7d4e5',
          pms: '716 C',
          cmyk: '6/68/100/0',
          rgb: '216/117/43',
          icon: undefined,
        },
        {
          name: 'Stickerbox\nRed',
          hex: '#e4002b',
          pms: '185 C',
          cmyk: '0/100/96/0',
          rgb: '228/0/43',
          icon: undefined,
        },
        {
          name: 'Double\nBubble',
          hex: '#ea94bd',
          pms: '1905 C',
          cmyk: '0/56/0/0',
          rgb: '234/148/189',
          icon: undefined,
        },
        {
          name: 'Pink\nMilk',
          hex: '#f7d4e5',
          pms: '2043 C',
          cmyk: '0/22/0/0',
          rgb: '247/212/229',
          icon: undefined,
        },
        {
          name: 'Punkin\nPie',
          hex: '#d8752b',
          pms: '716 C',
          cmyk: '6/68/100/0',
          rgb: '216/117/43',
          icon: undefined,
        },
        {
          name: 'Circus\nPeanut',
          hex: '#efc8aa',
          pms: '4030 C',
          cmyk: '2/24/34/0',
          rgb: '239/200/170',
          icon: undefined,
        },
      ],
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

  // ─── Project 2: Startup Brand Identity — Stickerbox by Hapiko ──────────
  '2': [
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_001.gif', alt: 'Stickerbox brand image 1', span: 2, square: true },
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_002.png', alt: 'Stickerbox brand image 2', span: 2, square: true },
      ],
    },
    {
      type: 'color-palette',
      title: 'color palette',
      colors: [
        { name: 'Stickerbox\nRed',    hex: '#e4002b', pms: '185 C',              cmyk: '0/100/96/0',   rgb: '228/0/43'    },
        { name: 'Button\nWhite',      hex: '#ffffff',  pms: '',                   cmyk: '0/0/0/0',      rgb: '255/255/255' },
        { name: 'String\nCheese',     hex: '#f6eedf',  pms: '7500 C 40% tint',    cmyk: '2/5/12/0',     rgb: '246/238/223' },
        { name: 'Black\nLicorice',    hex: '#231f20',  pms: '419 C',              cmyk: '69/68/64/74',  rgb: '35/31/32'    },
        { name: 'Double\nBubble',     hex: '#ea94bd',  pms: '1905 C',             cmyk: '0/56/0/0',     rgb: '234/148/189' },
        { name: 'Pink\nMilk',         hex: '#f7d4e5',  pms: '2043 C',             cmyk: '0/22/0/0',     rgb: '247/212/229' },
        { name: 'Punkin\nPie',        hex: '#d8752b',  pms: '716 C',              cmyk: '6/68/100/0',   rgb: '216/117/43'  },
        { name: 'Circus\nPeanut',     hex: '#efc8aa',  pms: '4030 C',             cmyk: '2/24/34/0',    rgb: '239/200/170' },
        { name: 'Candy\nShell',       hex: '#037f59',  pms: '340 C',              cmyk: '98/23/84/10',  rgb: '3/127/89'    },
        { name: 'Taffy\nPull',        hex: '#a4d1c3',  pms: '565 C',              cmyk: '40/1/28/0',    rgb: '164/209/195' },
        { name: 'Gummy\nBear',        hex: '#f4d242',  pms: '7405 C',             cmyk: '3/14/100/0',   rgb: '244/210/66'  },
        { name: 'Banana\nFana',       hex: '#fbedb3',  pms: '7401 C',             cmyk: '2/4/39/0',     rgb: '251/237/179' },
        { name: 'Rocket\nPop',        hex: '#49a3e2',  pms: '2995 C',             cmyk: '72/20/0/0',    rgb: '73/163/226'  },
        { name: 'Brain\nFreeze',      hex: '#9fdaf4',  pms: '2975 C',             cmyk: '39/0/1/0',     rgb: '159/218/244' },
      ],
    },
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_003.png', alt: 'Stickerbox brand image 3', span: 2, square: true },
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_004.png', alt: 'Stickerbox brand image 4', span: 2, square: true },
      ],
    },
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_005.png', alt: 'Stickerbox brand image 5', span: 2, square: true },
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_006.png', alt: 'Stickerbox brand image 6', span: 2, square: true },
      ],
    },
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_007.png', alt: 'Stickerbox brand image 7', span: 2, square: true },
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_008.gif', alt: 'Stickerbox brand image 8', span: 2, square: true },
      ],
    },
    {
      size: '2xl',
      items: [
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_009.png', alt: 'Stickerbox brand image 9', span: 4 },
      ],
    },
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_010.png', alt: 'Stickerbox brand image 10', span: 2, aspectRatio: '3 / 4' },
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_011.png', alt: 'Stickerbox brand image 11', span: 2, aspectRatio: '3 / 4' },
      ],
    },
    {
      size: 'md',
      centered: true,
      items: [
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_012.gif', alt: 'Stickerbox brand image 12', span: 2, square: true },
      ],
    },
  ],

  // ─── Project 3: Packaging Design — Verdant Botanicals ──────────────────
  '3': [
    {
      size: 'md',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/38/800/600', alt: 'Gallery image 1', span: 2 },
        { type: 'image', src: 'https://picsum.photos/id/39/800/600', alt: 'Gallery image 2', span: 2 },
      ],
    },
    {
      type: 'color-palette',
      title: 'color palette',
      colors: [
        { name: 'Forest\nFloor', hex: '#2D4A22', pms: '364 C', cmyk: '72/24/100/11', rgb: '45/74/34' },
        { name: 'Petal\nBlush', hex: '#F2D7D5', pms: '503 C', cmyk: '2/16/9/0', rgb: '242/215/213' },
        { name: 'Ivory', hex: '#FFFEF2', pms: '7499 C', cmyk: '1/0/6/0', rgb: '255/254/242' },
        { name: 'Terracotta', hex: '#C4704B', pms: '7522 C', cmyk: '14/62/72/2', rgb: '196/112/75' },
        { name: 'Deep\nMoss', hex: '#5A7247', pms: '5753 C', cmyk: '55/23/69/5', rgb: '90/114/71' },
        { name: 'Warm\nSand', hex: '#D4C5A9', pms: '4525 C', cmyk: '12/15/32/0', rgb: '212/197/169' },
      ],
    },
    {
      size: 'md',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/40/800/600', alt: 'Gallery image 3', span: 2 },
        { type: 'image', src: 'https://picsum.photos/id/41/800/600', alt: 'Gallery image 4', span: 2 },
      ],
    },
  ],

  // ─── Project 4: Editorial Design — Slow Living Magazine ────────────────
  '4': [
    {
      size: 'md',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/42/800/600', alt: 'Gallery image 1', span: 2 },
        { type: 'image', src: 'https://picsum.photos/id/43/800/600', alt: 'Gallery image 2', span: 2 },
      ],
    },
    {
      type: 'color-palette',
      title: 'color palette',
      colors: [
        { name: 'Ink', hex: '#1A1A2E', pms: '2768 C', cmyk: '86/78/36/32', rgb: '26/26/46' },
        { name: 'Linen', hex: '#F0EBE3', pms: '7534 C', cmyk: '4/5/9/0', rgb: '240/235/227' },
        { name: 'Dusty\nRose', hex: '#C9A9A6', pms: '5015 C', cmyk: '15/30/21/0', rgb: '201/169/166' },
        { name: 'Slate\nBlue', hex: '#6B7A8D', pms: '5425 C', cmyk: '48/30/22/2', rgb: '107/122/141' },
        { name: 'Gold\nLeaf', hex: '#C9A96E', pms: '4515 C', cmyk: '15/24/60/0', rgb: '201/169/110' },
      ],
    },
    {
      size: 'md',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/44/800/600', alt: 'Gallery image 3', span: 2 },
        { type: 'image', src: 'https://picsum.photos/id/45/800/600', alt: 'Gallery image 4', span: 2 },
      ],
    },
  ],

  // ─── Project 5: Environmental Graphics — The Wanderer Hotel ────────────
  '5': [
    {
      size: 'md',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/46/800/600', alt: 'Gallery image 1', span: 2 },
        { type: 'image', src: 'https://picsum.photos/id/47/800/600', alt: 'Gallery image 2', span: 2 },
      ],
    },
    {
      type: 'color-palette',
      title: 'color palette',
      colors: [
        { name: 'Midnight', hex: '#0D1B2A', pms: '296 C', cmyk: '100/75/34/40', rgb: '13/27/42' },
        { name: 'Brass', hex: '#B5936B', pms: '4515 C', cmyk: '18/34/56/2', rgb: '181/147/107' },
        { name: 'Marble', hex: '#F2F2F2', pms: '663 C', cmyk: '3/2/2/0', rgb: '242/242/242' },
        { name: 'Rust', hex: '#A44A3F', pms: '7609 C', cmyk: '18/76/72/6', rgb: '164/74/63' },
        { name: 'Olive', hex: '#606C38', pms: '5753 C', cmyk: '47/20/88/5', rgb: '96/108/56' },
        { name: 'Warm\nWhite', hex: '#FAF8F0', pms: '7527 C', cmyk: '1/1/5/0', rgb: '250/248/240' },
      ],
    },
    {
      size: 'md',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/48/800/600', alt: 'Gallery image 3', span: 2 },
        { type: 'image', src: 'https://picsum.photos/id/49/800/600', alt: 'Gallery image 4', span: 2 },
      ],
    },
  ],

  // ─── Project 6: Campaign Design — Breathe Wellness ─────────────────────
  '6': [
    {
      size: 'md',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/50/800/600', alt: 'Gallery image 1', span: 2 },
        { type: 'image', src: 'https://picsum.photos/id/51/800/600', alt: 'Gallery image 2', span: 2 },
      ],
    },
    {
      type: 'color-palette',
      title: 'color palette',
      colors: [
        { name: 'Ocean\nDeep', hex: '#1B4965', pms: '302 C', cmyk: '90/48/24/8', rgb: '27/73/101' },
        { name: 'Sky\nWash', hex: '#BEE9E8', pms: '317 C', cmyk: '22/0/6/0', rgb: '190/233/232' },
        { name: 'Coral', hex: '#E07A5F', pms: '7416 C', cmyk: '6/62/62/0', rgb: '224/122/95' },
        { name: 'Cloud', hex: '#F8F4F0', pms: '7527 C', cmyk: '2/3/4/0', rgb: '248/244/240' },
        { name: 'Eucalyptus', hex: '#5B8C5A', pms: '7740 C', cmyk: '58/15/68/2', rgb: '91/140/90' },
      ],
    },
    {
      size: 'md',
      items: [
        { type: 'image', src: 'https://picsum.photos/id/52/800/600', alt: 'Gallery image 3', span: 2 },
        { type: 'image', src: 'https://picsum.photos/id/53/800/600', alt: 'Gallery image 4', span: 2 },
      ],
    },
  ],
};
