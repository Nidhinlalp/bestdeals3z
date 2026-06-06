// Inline brand SVGs (lucide removed brand glyphs). Minimal, currentColor-driven.
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 8.5h2.2V5.4c-.4-.05-1.6-.17-3-.17-3 0-5 1.8-5 5.1V13H5.4v3.3H8.2V24h3.4v-7.7h2.8l.5-3.3h-3.3v-2.3c0-1 .3-1.7 1.4-1.7Z" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.2 3h3.3l-7.2 8.3L22.8 21h-6.6l-5.2-6.8L5.1 21H1.8l7.7-8.8L1.5 3h6.8l4.7 6.2L18.2 3Zm-1.2 16h1.8L7.1 4.8H5.2L17 19Z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.6.4 8.9.4 8.9.4s7.3 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12ZM9.8 15.1V8.9l5.3 3.1-5.3 3.1Z" />
    </svg>
  );
}

export const socialIconMap: Record<string, (p: IconProps) => React.ReactElement> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  Youtube: YoutubeIcon,
};
