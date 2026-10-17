export interface Release {
  version: number;
  /** Months as YYYY-MM (source: angular.dev/reference/releases). */
  released: string;
  activeEnds: string;
  ltsEnds: string;
  highlights: string;
}

export const RELEASES: Release[] = [
  {
    version: 16,
    released: '2023-05',
    activeEnds: '2023-11',
    ltsEnds: '2024-11',
    highlights: 'Signals (developer preview), required inputs, DestroyRef and takeUntilDestroyed()',
  },
  {
    version: 17,
    released: '2023-11',
    activeEnds: '2024-05',
    ltsEnds: '2025-05',
    highlights:
      '@if / @for / @switch, @defer, standalone in new projects, esbuild + Vite builder, angular.dev',
  },
  {
    version: 18,
    released: '2024-05',
    activeEnds: '2024-11',
    ltsEnds: '2025-11',
    highlights: 'Zoneless (experimental), Material 3, @let (developer preview)',
  },
  {
    version: 19,
    released: '2024-11',
    activeEnds: '2025-05',
    ltsEnds: '2026-05',
    highlights:
      'Standalone by default, input() / output() / model() stable, linkedSignal and resource (experimental)',
  },
  {
    version: 20,
    released: '2025-05',
    activeEnds: '2025-11',
    ltsEnds: '2026-11',
    highlights:
      'Signal APIs stable, zoneless stable (20.2), *ngIf / *ngFor deprecated, new style guide',
  },
  {
    version: 21,
    released: '2025-11',
    activeEnds: '2026-06',
    ltsEnds: '2027-06',
    highlights: 'Zoneless by default, Signal Forms (experimental), Vitest by default, Angular Aria',
  },
  {
    version: 22,
    released: '2026-06',
    activeEnds: '2027-06',
    ltsEnds: '2028-06',
    highlights:
      'OnPush by default, Signal Forms and resources stable, Fetch by default, @Service(), first release on the yearly cycle',
  },
];
