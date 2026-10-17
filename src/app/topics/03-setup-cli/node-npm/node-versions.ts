// ANGULAR → NODE.JS SUPPORT
// Ranges copied exactly from angular.dev → Reference → Versions (newest minor of each major).
export interface AngularRelease {
  angular: number;
  node: string;
}

export const ANGULAR_RELEASES: AngularRelease[] = [
  { angular: 22, node: '^22.22.3 || ^24.15.0 || ^26.0.0' },
  { angular: 21, node: '^20.19.0 || ^22.12.0 || ^24.0.0' },
  { angular: 20, node: '^20.19.0 || ^22.12.0 || ^24.0.0' },
  { angular: 19, node: '^18.19.1 || ^20.11.1 || ^22.0.0' },
  { angular: 18, node: '^18.19.1 || ^20.11.1 || ^22.0.0' },
  { angular: 17, node: '^18.13.0 || ^20.9.0' },
  { angular: 16, node: '^16.14.0 || ^18.10.0' },
  { angular: 9, node: '^10.13.0 || ^12.11.0' },
];

// Node.js release lines (even numbers are the LTS lines teams use)
export const NODE_MAJORS = [10, 12, 14, 16, 18, 20, 22, 24, 26];

export interface NodeSupport {
  major: number;
  /** The lowest version Angular accepts on this Node line, e.g. '24.15.0' */
  minimum: string;
}

/** '^22.22.3 || ^24.15.0' → [{ major: 22, minimum: '22.22.3' }, { major: 24, minimum: '24.15.0' }] */
export function supportedNodes(range: string): NodeSupport[] {
  return range.split('||').map((part) => {
    const minimum = part.trim().replace('^', '');
    return { major: Number(minimum.split('.')[0]), minimum };
  });
}
