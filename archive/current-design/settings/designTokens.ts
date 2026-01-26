// Design Tokens - Base structure for all design iterations
// Each iteration will extend or override these base tokens

export const baseDesignTokens = {
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

// Variation 1: "The Archivist" - Classic Minimalist
export const variation1Tokens = {
  name: 'The Archivist',
  colors: {
    primary: '#FFFFFF',
    secondary: '#F7F7F7',
    accent: '#1A1A1A',
    highlight: '#E5B54F', // Muted Mustard
    border: '#E5E5E5',
  },
  typography: {
    headingFont: 'Inter',
    headingWeight: '500', // Medium
    bodyFont: 'Inter',
    bodyWeight: '300', // Light
    bodyWeightRegular: '400', // Regular
    tracking: '-0.02em',
    lineHeight: '1.6',
  },
  shadows: {
    card: '0 4px 20px rgba(0,0,0,0.03)',
  },
  borders: {
    thin: '1px solid #E5E5E5',
  },
};

// Variation 2: "The Strategist" - Bold Editorial
export const variation2Tokens = {
  name: 'The Strategist',
  colors: {
    primary: '#FDFCF8', // Paper/Off-White
    secondary: '#F0F0F0', // Concrete
    accent: '#000000',
    highlight: '#3A5A8C', // Medium Steel Blue
  },
  typography: {
    headingFont: 'Public Sans',
    headingWeight: '700', // Bold
    bodyFont: 'Source Serif 4',
    bodyWeight: '400',
    bodyStyle: 'italic',
  },
  shadows: {
    card: 'none',
  },
  borders: {
    thin: 'none',
  },
};

// Variation 3: "Modern Artisan" - Mustard & Steel
export const variation3Tokens = {
  name: 'Modern Artisan',
  colors: {
    primary: '#FFFFFF',
    secondary: '#ECECEC', // Light Steel
    accent: '#222222', // Charcoal
    highlight: '#D4A017', // Aged Mustard
    highlight2: '#4682B4', // Steel Blue
  },
  typography: {
    headingFont: 'Hanken Grotesk',
    headingWeight: '600', // SemiBold
    bodyFont: 'Hanken Grotesk',
    bodyWeight: '400',
  },
  shadows: {
    card: 'none',
  },
  borders: {
    card: '1px solid #222222',
  },
};

// Variation 4: "The Studio Noir" - Subtle Depth
export const variation4Tokens = {
  name: 'The Studio Noir',
  colors: {
    primary: '#FFFFFF',
    secondary: '#111111', // Rich Black
    accent: '#6B7280', // Cool Gray
    highlight: '#EAB308', // Bright Mustard
  },
  typography: {
    headingFont: 'Plus Jakarta Sans',
    headingWeight: '800', // ExtraBold
    bodyFont: 'Plus Jakarta Sans',
    bodyWeight: '400',
    navWeight: '500', // Medium
  },
  shadows: {
    card: '0 10px 40px -10px rgba(0,0,0,0.1)',
  },
  borders: {
    thin: 'none',
  },
  borderRadius: {
    button: '2px',
  },
};

