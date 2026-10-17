// AVATAR AS AN SVG DATA URL: the demo needs no image files

export const AVATAR_THEMES = {
  sunset: ['#f0060b', '#7702ff'],
  ocean: ['#22d3ee', '#6d5dfc'],
  forest: ['#a3e635', '#0d9488'],
} as const;

export type AvatarTheme = keyof typeof AVATAR_THEMES;

/** A round avatar with the name's initials, ready for <img [src]>. */
export function avatarUrl(name: string, theme: AvatarTheme): string {
  const [from, to] = AVATAR_THEMES[theme];
  const initials = name
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, '').charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <defs><linearGradient id="g" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
    </linearGradient></defs>
    <rect width="64" height="64" rx="32" fill="url(#g)"/>
    <text x="32" y="41" fill="#fff" font-family="system-ui, sans-serif" font-size="24"
      font-weight="600" text-anchor="middle">${initials || '?'}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
