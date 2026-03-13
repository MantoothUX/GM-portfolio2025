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
  // ─── Project 1: Indeed Brand Identity ───────────────────────────────────
  '1': [
    // 001–002: portrait pair (3:4)
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_001.png', alt: 'Indeed brand identity 1', span: 2, aspectRatio: '3 / 4' },
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_002.png', alt: 'Indeed brand identity 2', span: 2, aspectRatio: '3 / 4' },
      ],
    },
    // 003–004: portrait pair (3:4)
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_003.png', alt: 'Indeed brand identity 3', span: 2, aspectRatio: '3 / 4' },
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_004.png', alt: 'Indeed brand identity 4', span: 2, aspectRatio: '3 / 4' },
      ],
    },
    // 005–006: wide landscape pair (2:1) — side by side, stacks on mobile
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_005.png', alt: 'Indeed brand identity 5', span: 2, aspectRatio: '2 / 1' },
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_006.png', alt: 'Indeed brand identity 6', span: 2, aspectRatio: '2 / 1' },
      ],
    },
    // 007: landscape full-width (3:2)
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_007.png', alt: 'Indeed brand identity 7', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 008 portrait left spanning 2 rows | 009 video + 010 landscape stacked on right
    {
      size: 'lg',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_008.png', alt: 'Indeed brand identity 8', span: 2, rowSpan: 2 },
        { type: 'video', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_009.mp4', span: 2 },
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_010.png', alt: 'Indeed brand identity 10', span: 2, aspectRatio: '2 / 1' },
      ],
    },
    // 011 left | text right
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_011.png', alt: 'Indeed brand identity 11', span: 2, aspectRatio: '3 / 2' },
        { type: 'text', span: 2, heading: 'Guardrails, with room to grow', body: 'Indeed\u2019s brand identity had to get more disciplined while allowing flex for new concepts and brand extensions. A strict but broad color palette and signature typeface (crafted by Dalton Maag) helped create ownability within an expansive, ever-changing system.' },
      ],
    },
    // 012: full-width XL (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_012.png', alt: 'Indeed brand identity 12', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 013: full-width XL (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_013.png', alt: 'Indeed brand identity 13', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 014–015–016: three equal squares spanning full gallery width (3-col grid)
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_014.png', alt: 'Indeed brand identity 14', span: 1, square: true },
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_015.png', alt: 'Indeed brand identity 15', span: 1, square: true },
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_016.png', alt: 'Indeed brand identity 16', span: 1, square: true },
      ],
    },
    // 017: landscape full-width (3:2)
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_017.png', alt: 'Indeed brand identity 17', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 019 left | text right
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_019.png', alt: 'Indeed brand identity 19', span: 2, aspectRatio: '3 / 2' },
        { type: 'text', span: 2, heading: 'Fan favorites', body: 'Global sport partnerships, such as Indeed\u2019s sponsorship of Eintracht Frankfurt and the Ireland Olympic team, were opportunities for the brand to play nice on the field while letting teams retain their own identities. Greta pushed her design team (and multinational marketing partners) to stretch the edges of Indeed\u2019s brand while making sure Indeed got credit wherever they showed up.' },
      ],
    },
    // 018: full-width XL (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand/Gallery_Indeed_BrandID_018.png', alt: 'Indeed brand identity 18', span: 4, aspectRatio: '3 / 2' },
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
        { type: 'image', src: '/Projects/Stickerbox/Gallery_Stickerbox_009.png', alt: 'Stickerbox brand image 9', span: 4, aspectRatio: '3 / 2' },
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

  // ─── Project 3: FutureWorks Brand Identity ──────────────────────────────
  '3': [
    // 00: video full-width (16:9)
    {
      size: '2xl',
      items: [
        { type: 'video', src: '/Projects/FutureWorks/Gallery_FW_00.mp4', span: 4 },
      ],
    },
    // 01–03: first row of 3 squares
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_01.png', alt: 'FutureWorks brand identity 1', span: 1, square: true },
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_02.png', alt: 'FutureWorks brand identity 2', span: 1, square: true },
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_03.png', alt: 'FutureWorks brand identity 3', span: 1, square: true },
      ],
    },
    // 04–06: second row of 3 squares
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_04.png', alt: 'FutureWorks brand identity 4', span: 1, square: true },
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_05.png', alt: 'FutureWorks brand identity 5', span: 1, square: true },
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_06.png', alt: 'FutureWorks brand identity 6', span: 1, square: true },
      ],
    },
    // 07: super-wide landscape (3:1)
    {
      size: '2xl',
      items: [
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_07.png', alt: 'FutureWorks brand identity 7', span: 4, aspectRatio: '3 / 1' },
      ],
    },
    // 08 left + text right
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_08.png', alt: 'FutureWorks brand identity 8', span: 2, aspectRatio: '3 / 2' },
        { type: 'text', span: 2, heading: 'Immersive + Integrated', body: 'The FutureWorks design system was rolled out across every surface, from pre-event invites and social marketing to on-site wayfinding, screens, swag and interactive experiences. The arrow motif functioned on directional signage and brought visual energy to screens and surfaces.' },
      ],
    },
    // 09+10: square pair
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_09.png', alt: 'FutureWorks brand identity 9', span: 2, square: true },
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_10.png', alt: 'FutureWorks brand identity 10', span: 2, square: true },
      ],
    },
    // 11+12 stacked left | text right
    {
      size: 'lg',
      items: [
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_11.png', alt: 'FutureWorks brand identity 11', span: 2, aspectRatio: '3 / 2' },
        { type: 'text', span: 2, rowSpan: 2, heading: 'The future of work is human', body: 'Josh Goleman brought his signature style to capture the real job seekers behind the future of work for the event\u2019s opening video and photography. Greta and team sourced and captured real job seekers and hiring managers to bring authenticity and warmth to the HR discussions at hand.' },
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_12.png', alt: 'FutureWorks brand identity 12', span: 2, aspectRatio: '3 / 2' },
      ],
    },
    // 13+14+15: square triptych (3-col)
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_13.png', alt: 'FutureWorks brand identity 13', span: 1, square: true },
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_14.png', alt: 'FutureWorks brand identity 14', span: 1, square: true },
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_15.png', alt: 'FutureWorks brand identity 15', span: 1, square: true },
      ],
    },
    // 16: full-width XL (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_16.png', alt: 'FutureWorks brand identity 16', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 17: full-width XL (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/FutureWorks/Gallery_FW_17.png', alt: 'FutureWorks brand identity 17', span: 4, aspectRatio: '3 / 2' },
      ],
    },
  ],

  // ─── Project 4: Gather Round — A Target Holiday ───────────────────────
  '4': [
    // 01: video full-width
    {
      size: 'xl',
      items: [
        { type: 'video', src: '/Projects/Target Holiday/Gallery_TgtHoliday_01.mp4', span: 4 },
      ],
    },
    // 02: video full-width
    {
      size: 'xl',
      items: [
        { type: 'video', src: '/Projects/Target Holiday/Gallery_TgtHoliday_02.mp4', span: 4 },
      ],
    },
    // 03+04: horizontal pair (30:17)
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Target Holiday/Gallery_TgtHoliday_03_Horz.png', alt: 'Target Holiday 3', span: 2, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/Target Holiday/Gallery_TgtHoliday_04_Horz.png', alt: 'Target Holiday 4', span: 2, aspectRatio: '30 / 17' },
      ],
    },
    // 05+06: horizontal pair
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Target Holiday/Gallery_TgtHoliday_05_Horz.png', alt: 'Target Holiday 5', span: 2, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/Target Holiday/Gallery_TgtHoliday_06_Horz.png', alt: 'Target Holiday 6', span: 2, aspectRatio: '30 / 17' },
      ],
    },
    // 07+08: horizontal pair
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Target Holiday/Gallery_TgtHoliday_07_Horz.png', alt: 'Target Holiday 7', span: 2, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/Target Holiday/Gallery_TgtHoliday_08_Horz.png', alt: 'Target Holiday 8', span: 2, aspectRatio: '30 / 17' },
      ],
    },
    // 09+10: horizontal pair
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Target Holiday/Gallery_TgtHoliday_09_Horz.png', alt: 'Target Holiday 9', span: 2, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/Target Holiday/Gallery_TgtHoliday_10_Horz.png', alt: 'Target Holiday 10', span: 2, aspectRatio: '30 / 17' },
      ],
    },
    // Good + Gathered text band
    {
      type: 'text-band',
      heading: 'Good + Gathered',
      body: 'All art direction and styling reinforced the idea of gathering for meaningful moments. Circular, radial compositions and color underscored the brand\u2019s core visual identity: red, white and round.',
    },
    // 11: full-width XL (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Target Holiday/Gallery_TgtHoliday_11_XL.png', alt: 'Target Holiday 11', span: 4, aspectRatio: '3 / 2' },
      ],
    },
  ],

  // ─── Project 5: Indeed Brand Photography ──────────────────────────────
  '5': [
    // 01: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_01_XL.png', alt: 'Indeed Brand Photography 1', span: 4, aspectRatio: '3 / 2', caption: 'Josh Goleman, photographer' },
      ],
    },
    // 02: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_02_XL.png', alt: 'Indeed Brand Photography 2', span: 4, aspectRatio: '3 / 2', caption: 'Josh Goleman, photographer' },
      ],
    },
    // 03+04: portrait pair (3:4)
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_03_Vertical.png', alt: 'Indeed Brand Photography 3', span: 2, aspectRatio: '3 / 4', caption: 'Josh Goleman, photographer' },
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_04_Vertical.png', alt: 'Indeed Brand Photography 4', span: 2, aspectRatio: '3 / 4', caption: 'Josh Goleman, photographer' },
      ],
    },
    // text left + 05 right
    {
      size: 'md',
      items: [
        { type: 'text', span: 1, heading: 'Keeping it real', body: 'Whenever possible, the Indeed team cast and photographed real job seekers and employers, in different cities, at different phases in their careers. The team cast to be inclusive in their choices, representative of the real range within the working world.' },
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_05_XL.png', alt: 'Indeed Brand Photography 5', span: 3, aspectRatio: '3 / 2', caption: 'Josh Goleman, photographer' },
      ],
    },
    // 06+07: portrait pair (3:4)
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_06_Vertical.png', alt: 'Indeed Brand Photography 6', span: 2, aspectRatio: '3 / 4', caption: 'Josh Goleman, photographer' },
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_07_Vertical.png', alt: 'Indeed Brand Photography 7', span: 2, aspectRatio: '3 / 4', caption: 'Josh Goleman, photographer' },
      ],
    },
    // 08: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_08_XL.png', alt: 'Indeed Brand Photography 8', span: 4, aspectRatio: '3 / 2', caption: 'Josh Goleman, photographer' },
      ],
    },
    // 09: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_09_XL.png', alt: 'Indeed Brand Photography 9', span: 4, aspectRatio: '3 / 2', caption: 'Josh Goleman, photographer' },
      ],
    },
    // 10: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_10_XL.png', alt: 'Indeed Brand Photography 10', span: 4, aspectRatio: '3 / 2', caption: 'Adrian O. Walker, photographer' },
      ],
    },
    // 11: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_11_XL.png', alt: 'Indeed Brand Photography 11', span: 4, aspectRatio: '3 / 2', caption: 'Adrian O. Walker, photographer' },
      ],
    },
    // 12+13: landscape pair (3:2)
    {
      size: 'lg',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_12_Span2.png', alt: 'Indeed Brand Photography 12', span: 2, aspectRatio: '3 / 2', caption: 'Adrian O. Walker, photographer' },
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_13_Span2.png', alt: 'Indeed Brand Photography 13', span: 2, aspectRatio: '3 / 2', caption: 'Adrian O. Walker, photographer' },
      ],
    },
    // 14: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/Indeed Brand Photography/Gallery_IndeedPhotog_14_XL.png', alt: 'Indeed Brand Photography 14', span: 4, aspectRatio: '3 / 2', caption: 'Adrian O. Walker, photographer' },
      ],
    },
  ],

  // ─── Project 6: FutureWorks, Refreshed ────────────────────────────────
  '6': [
    // 01: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/FutureWorks 2023/Gallery_FW23_01.png', alt: 'FutureWorks 2023 1', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 02: video full-width (16:9)
    {
      size: 'xl',
      items: [
        { type: 'video', src: '/Projects/FutureWorks 2023/Gallery_FW23_02.mp4', span: 4 },
      ],
    },
    // 03+04: landscape pair (3:2)
    {
      size: 'lg',
      items: [
        { type: 'image', src: '/Projects/FutureWorks 2023/Gallery_FW23_03.png', alt: 'FutureWorks 2023 3', span: 2, aspectRatio: '3 / 2' },
        { type: 'image', src: '/Projects/FutureWorks 2023/Gallery_FW23_04.png', alt: 'FutureWorks 2023 4', span: 2, aspectRatio: '3 / 2' },
      ],
    },
    // 05+06: portrait pair (3:4)
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/FutureWorks 2023/Gallery_FW23_05.png', alt: 'FutureWorks 2023 5', span: 2, aspectRatio: '3 / 4' },
        { type: 'image', src: '/Projects/FutureWorks 2023/Gallery_FW23_06.png', alt: 'FutureWorks 2023 6', span: 2, aspectRatio: '3 / 4' },
      ],
    },
    // 07 left + text right
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/FutureWorks 2023/Gallery_FW23_07.png', alt: 'FutureWorks 2023 7', span: 2, aspectRatio: '3 / 2' },
        { type: 'text', span: 2, heading: 'Lighter + brighter', body: 'FutureWorks\u2019 second year shed the heaviness of that first pre-pandemic event moment. Colors got warmer and more saturated, and there was room to sneak in a little humor.' },
      ],
    },
    // 08+09: landscape pair (3:2)
    {
      size: 'lg',
      items: [
        { type: 'image', src: '/Projects/FutureWorks 2023/Gallery_FW23_08.png', alt: 'FutureWorks 2023 8', span: 2, aspectRatio: '3 / 2' },
        { type: 'image', src: '/Projects/FutureWorks 2023/Gallery_FW23_09.png', alt: 'FutureWorks 2023 9', span: 2, aspectRatio: '3 / 2' },
      ],
    },
  ],

  // ─── Project 7: Target x Disney Mickey Mouse Collection ───────────────
  '7': [
    // 01+02: square pair
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_01_Square_Span2.gif', alt: 'Target x Disney 1', span: 2, square: true },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_02_Square_Span2.png', alt: 'Target x Disney 2', span: 2, square: true },
      ],
    },
    // 03–05: square row (3-col)
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_03_Square_Span3.png', alt: 'Target x Disney 3', span: 1, square: true },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_04_Square_Span3.png', alt: 'Target x Disney 4', span: 1, square: true },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_05_Square_Span3.png', alt: 'Target x Disney 5', span: 1, square: true },
      ],
    },
    // 06–08: square row (3-col)
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_06_Square_Span3.png', alt: 'Target x Disney 6', span: 1, square: true },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_07_Square_Span3.png', alt: 'Target x Disney 7', span: 1, square: true },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_08_Square_Span3.png', alt: 'Target x Disney 8', span: 1, square: true },
      ],
    },
    // 09–11: square row (3-col)
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_09_Square_Span3.png', alt: 'Target x Disney 9', span: 1, square: true },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_10_Square_Span3.png', alt: 'Target x Disney 10', span: 1, square: true },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_11_Square_Span3.png', alt: 'Target x Disney 11', span: 1, square: true },
      ],
    },
    // Color palette
    {
      type: 'color-palette',
      title: 'color palette',
      colors: [
        { name: 'Bright\nWhite',        hex: '#FFFFFF', cmyk: '0/0/0/0',       rgb: '255/255/255' },
        { name: 'Poppy\nPink',          hex: '#F4B5C9', cmyk: '0/26/18/4',     rgb: '244/181/201' },
        { name: 'Pacific\nTeal',        hex: '#3D7E7E', cmyk: '52/0/0/51',     rgb: '61/126/126' },
        { name: 'Wave\nHello',          hex: '#62C8CC', cmyk: '52/2/0/20',     rgb: '98/200/204' },
        { name: 'California\nSunshine', hex: '#F9C624', cmyk: '0/20/86/2',     rgb: '249/198/36' },
        { name: 'Target\nRed',          hex: '#CC0000', cmyk: '0/100/100/20',  rgb: '204/0/0' },
      ],
    },
    // Bright + Bold text band
    {
      type: 'text-band',
      heading: 'Bright + Bold',
      body: 'A juicy, summery color palette offset beautiful photography shot by Julia Johnson and Cody Cloud, adding Target\u2019s signature design sophistication to the childlike playfulness of the Mickey brand.',
    },
    // 12+13: vertical pair (2:3)
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_12_Vertical.png', alt: 'Target x Disney 12', span: 2, aspectRatio: '2 / 3' },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_13_Vertical.png', alt: 'Target x Disney 13', span: 2, aspectRatio: '2 / 3' },
      ],
    },
    // 14+15: vertical pair (2:3)
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_14_Vertical.png', alt: 'Target x Disney 14', span: 2, aspectRatio: '2 / 3' },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_15_Vertical.png', alt: 'Target x Disney 15', span: 2, aspectRatio: '2 / 3' },
      ],
    },
    // 16+17+18: vertical triptych (3-col, 2:3)
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_16_Vertical_Span3.png', alt: 'Target x Disney 16', span: 1, aspectRatio: '2 / 3' },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_17_Vertical_Span3.png', alt: 'Target x Disney 17', span: 1, aspectRatio: '2 / 3' },
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_18_Vertical_Span3.png', alt: 'Target x Disney 18', span: 1, aspectRatio: '2 / 3' },
      ],
    },
    // 19: centered square finale
    {
      size: 'md',
      centered: true,
      items: [
        { type: 'image', src: '/Projects/Target x Disney/Gallery_TgtDisney_19_Square_Center.gif', alt: 'Target x Disney 19', span: 2, square: true },
      ],
    },
  ],

  // ─── Project 8: Back to School with Target ────────────────────────────
  '8': [
    // 01–04: full-width videos
    {
      size: 'xl',
      items: [
        { type: 'video', src: '/Projects/Target BTS/Gallery_TgtBTS_01.mp4', span: 4 },
      ],
    },
    {
      size: 'xl',
      items: [
        { type: 'video', src: '/Projects/Target BTS/Gallery_TgtBTS_02.mp4', span: 4 },
      ],
    },
    {
      size: 'xl',
      items: [
        { type: 'video', src: '/Projects/Target BTS/Gallery_TgtBTS_03.mp4', span: 4 },
      ],
    },
    {
      size: 'xl',
      items: [
        { type: 'video', src: '/Projects/Target BTS/Gallery_TgtBTS_04.mp4', span: 4 },
      ],
    },
  ],

  // ─── Project 9: IDHY — ID Hot Yoga ────────────────────────────────────
  '9': [
    // 01: XL full-width (12:7)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/IDHY/Gallery_IDHY_01_XL.png', alt: 'IDHY 1', span: 4, aspectRatio: '12 / 7' },
      ],
    },
    // 02+03: square pair
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/IDHY/Gallery_IDHY_02_Span2.png', alt: 'IDHY 2', span: 2, square: true },
        { type: 'image', src: '/Projects/IDHY/Gallery_IDHY_03_Span2.png', alt: 'IDHY 3', span: 2, square: true },
      ],
    },
    // 04+05: square pair
    {
      size: 'md',
      items: [
        { type: 'image', src: '/Projects/IDHY/Gallery_IDHY_04_Span2.png', alt: 'IDHY 4', span: 2, square: true },
        { type: 'image', src: '/Projects/IDHY/Gallery_IDHY_05_Span2.png', alt: 'IDHY 5', span: 2, square: true },
      ],
    },
    // 06: XL full-width (12:7)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/IDHY/Gallery_IDHY_06_XL.png', alt: 'IDHY 6', span: 4, aspectRatio: '12 / 7' },
      ],
    },
    // 07: XL full-width (12:7)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/IDHY/Gallery_IDHY_07_XL.png', alt: 'IDHY 7', span: 4, aspectRatio: '12 / 7' },
      ],
    },
  ],

  // ─── Project 10: TED x Target ─────────────────────────────────────────
  '10': [
    // 01: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_01_XL.png', alt: 'TED x Target 1', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 02: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_02_XL.png', alt: 'TED x Target 2', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 03+04+05: 3-col row (30:17)
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_03_Span3.png', alt: 'TED x Target 3', span: 1, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_04_Span3.png', alt: 'TED x Target 4', span: 1, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_05_Span3.png', alt: 'TED x Target 5', span: 1, aspectRatio: '30 / 17' },
      ],
    },
    // 06: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_06_XL.png', alt: 'TED x Target 6', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 07+08: landscape pair (30:17)
    {
      size: 'lg',
      items: [
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_07_Span2.png', alt: 'TED x Target 7', span: 2, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_08_Span2.png', alt: 'TED x Target 8', span: 2, aspectRatio: '30 / 17' },
      ],
    },
    // 09: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_09_XL.png', alt: 'TED x Target 9', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 10+11: landscape pair (30:17)
    {
      size: 'lg',
      items: [
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_10_Span2.png', alt: 'TED x Target 10', span: 2, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_11_Span2.png', alt: 'TED x Target 11', span: 2, aspectRatio: '30 / 17' },
      ],
    },
    // 12+13+14: 3-col row (30:17)
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_12_Span3.png', alt: 'TED x Target 12', span: 1, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_13_Span3.png', alt: 'TED x Target 13', span: 1, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_14_Span3.png', alt: 'TED x Target 14', span: 1, aspectRatio: '30 / 17' },
      ],
    },
    // 15: XL full-width (3:2)
    {
      size: 'xl',
      items: [
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_15_XL.png', alt: 'TED x Target 15', span: 4, aspectRatio: '3 / 2' },
      ],
    },
    // 16+17+18: 3-col row (30:17)
    {
      size: 'md',
      columns: 3,
      items: [
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_16_Span3.png', alt: 'TED x Target 16', span: 1, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_17_Span3.png', alt: 'TED x Target 17', span: 1, aspectRatio: '30 / 17' },
        { type: 'image', src: '/Projects/TED x Target/Gallery_TEDxTGT_18_Span3.png', alt: 'TED x Target 18', span: 1, aspectRatio: '30 / 17' },
      ],
    },
  ],
};
