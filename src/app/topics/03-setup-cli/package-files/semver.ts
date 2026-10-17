// A TINY SEMVER MATCHER: the three range styles we meet in package.json
// (Real npm handles many more forms. For majors ≥ 1 these rules are the same as npm's.)

/** '2.4.5' → [2, 4, 5] */
function parse(version: string): number[] {
  return version.split('.').map(Number);
}

/** Negative if a < b, 0 if equal, positive if a > b */
export function compare(a: string, b: string): number {
  const [x, y] = [parse(a), parse(b)];
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
}

/**
 * ^2.4.0 → same major, at least 2.4.0 (minor + patch updates)
 * ~2.4.0 → same major and minor, at least 2.4.0 (patch updates only)
 * 2.4.0  → exactly that version
 */
export function satisfies(version: string, range: string): boolean {
  const base = range.replace(/^[\^~]/, '');
  const [v, r] = [parse(version), parse(base)];

  if (range.startsWith('^')) return v[0] === r[0] && compare(version, base) >= 0;
  if (range.startsWith('~')) return v[0] === r[0] && v[1] === r[1] && v[2] >= r[2];
  return version === base;
}

/** What `npm install` picks: the highest published version that matches the range */
export function maxSatisfying(versions: string[], range: string): string | undefined {
  return versions
    .filter((version) => satisfies(version, range))
    .sort(compare)
    .at(-1);
}
