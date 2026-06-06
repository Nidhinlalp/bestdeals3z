// =============================================================================
// @ecom/ui — Shared UI Component Library
// =============================================================================
// Design System: Airbnb-style (see docs/DESIGN-airbnb.md)
// Font:          Inter (open-source substitute for Airbnb Cereal VF / Circular)
// Brand color:   Rausch #ff385c — the single CTA voltage
// Canvas:        Pure white #ffffff
// =============================================================================

// ---------------------------------------------------------------------------
// Design Tokens (JS/TS constants — mirrors packages/ui/styles/globals.css)
// ---------------------------------------------------------------------------

export const colors = {
  // Brand
  primary:         '#ff385c',  // Rausch
  primaryActive:   '#e00b41',
  primaryDisabled: '#ffd1da',
  errorText:       '#c13515',
  luxe:            '#460479',  // Sub-brand — Luxe only
  plus:            '#92174d',  // Sub-brand — Plus only

  // Text
  ink:         '#222222',
  body:        '#3f3f3f',
  muted:       '#6a6a6a',
  mutedSoft:   '#929292',
  onPrimary:   '#ffffff',
  onDark:      '#ffffff',
  starRating:  '#222222',  // Ink — Airbnb intentionally avoids yellow stars
  legalLink:   '#428bff',

  // Surface
  canvas:        '#ffffff',
  surfaceSoft:   '#f7f7f7',
  surfaceCard:   '#ffffff',
  surfaceStrong: '#f2f2f2',

  // Hairlines
  hairline:      '#dddddd',
  hairlineSoft:  '#ebebeb',
  borderStrong:  '#c1c1c1',

  // Scrim
  scrim:         '#000000',  // Apply at 50% opacity
} as const;

export type Color = keyof typeof colors;

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

export const radius = {
  none: '0px',
  xs:   '4px',
  sm:   '8px',    // buttons, inputs
  md:   '14px',   // property cards
  lg:   '20px',
  xl:   '32px',   // category strip pills
  full: '9999px', // search bar, orbs, pills
} as const;

export type Radius = keyof typeof radius;

// ---------------------------------------------------------------------------
// Spacing (4px base system)
// ---------------------------------------------------------------------------

export const spacing = {
  xxs:     '2px',
  xs:      '4px',
  sm:      '8px',
  md:      '12px',
  base:    '16px',
  lg:      '24px',
  xl:      '32px',
  xxl:     '48px',
  section: '64px',
} as const;

export type Spacing = keyof typeof spacing;

// ---------------------------------------------------------------------------
// Typography Scale
// ---------------------------------------------------------------------------

export const typography = {
  displayXl:    { fontSize: '1.75rem',   fontWeight: 700, lineHeight: 1.43, letterSpacing: '0' },
  displayLg:    { fontSize: '1.375rem',  fontWeight: 500, lineHeight: 1.18, letterSpacing: '-0.44px' },
  displayMd:    { fontSize: '1.3125rem', fontWeight: 700, lineHeight: 1.43, letterSpacing: '0' },
  displaySm:    { fontSize: '1.25rem',   fontWeight: 600, lineHeight: 1.20, letterSpacing: '-0.18px' },
  titleMd:      { fontSize: '1rem',      fontWeight: 600, lineHeight: 1.25, letterSpacing: '0' },
  titleSm:      { fontSize: '1rem',      fontWeight: 500, lineHeight: 1.25, letterSpacing: '0' },
  ratingDisplay:{ fontSize: '4rem',      fontWeight: 700, lineHeight: 1.10, letterSpacing: '-1px' },
  bodyMd:       { fontSize: '1rem',      fontWeight: 400, lineHeight: 1.5,  letterSpacing: '0' },
  bodySm:       { fontSize: '0.875rem',  fontWeight: 400, lineHeight: 1.43, letterSpacing: '0' },
  caption:      { fontSize: '0.875rem',  fontWeight: 500, lineHeight: 1.29, letterSpacing: '0' },
  captionSm:    { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.23, letterSpacing: '0' },
  badge:        { fontSize: '0.6875rem', fontWeight: 600, lineHeight: 1.18, letterSpacing: '0' },
  microLabel:   { fontSize: '0.75rem',   fontWeight: 700, lineHeight: 1.33, letterSpacing: '0' },
  uppercaseTag: { fontSize: '0.5rem',    fontWeight: 700, lineHeight: 1.25, letterSpacing: '0.32px', textTransform: 'uppercase' as const },
  buttonMd:     { fontSize: '1rem',      fontWeight: 500, lineHeight: 1.25, letterSpacing: '0' },
  buttonSm:     { fontSize: '0.875rem',  fontWeight: 500, lineHeight: 1.29, letterSpacing: '0' },
  link:         { fontSize: '0.875rem',  fontWeight: 400, lineHeight: 1.43, letterSpacing: '0' },
  navLink:      { fontSize: '1rem',      fontWeight: 600, lineHeight: 1.25, letterSpacing: '0' },
} as const;

// ---------------------------------------------------------------------------
// Elevation — single shadow tier (Airbnb uses one shadow definition)
// ---------------------------------------------------------------------------

export const shadows = {
  card: 'rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.10) 0 4px 8px 0',
  none: 'none',
} as const;

// ---------------------------------------------------------------------------
// Component sizing
// ---------------------------------------------------------------------------

export const componentSizes = {
  navHeight:       80,
  searchBarHeight: 64,
  searchOrbSize:   48,
  buttonHeightMd:  48,
  buttonHeightSm:  40,
  iconBtnSize:     32,
  inputHeight:     56,
  dateCellSize:    40,
} as const;

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export const layout = {
  containerMax:    1280,
  containerDetail: 1080,
  breakpoints: {
    mobile:  744,
    tablet:  1128,
    desktop: 1440,
  },
} as const;

// ---------------------------------------------------------------------------
// TODO: Export components as they are built
// ---------------------------------------------------------------------------
// export { Button } from './components/button';
// export { Card } from './components/card';
// export { Badge } from './components/badge';
// export { SearchBar } from './components/search-bar';
// export { ProductCard } from './components/product-card';

// ---------------------------------------------------------------------------
// TODO: Export hooks as they are built
// ---------------------------------------------------------------------------
// export { useMediaQuery } from './hooks/use-media-query';
// export { useDebounce } from './hooks/use-debounce';
