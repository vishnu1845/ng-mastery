// WHAT `ng generate` CREATES IN ANGULAR 22
// Checked against the real CLI (`ng g ... --dry-run`) in a new project with css styles.
export type SchematicId =
  'component' | 'service' | 'directive' | 'pipe' | 'guard' | 'interceptor' | 'resolver';

export interface Schematic {
  id: SchematicId;
  /** What we type after `ng g` */
  alias: string;
  /** A typical path to try */
  example: string;
  /** Pipes, guards, interceptors and resolvers keep a suffix: truncate-pipe.ts */
  suffix?: string;
  /** Only components get their own folder; everything else is created flat */
  ownFolder?: boolean;
  /** What the generated file exports */
  exportName: (name: string) => string;
}

export interface GenerateOptions {
  skipTests: boolean;
  inlineTemplate: boolean;
  inlineStyle: boolean;
  dryRun: boolean;
}

export interface GenerateResult {
  command: string;
  output: string[];
  exportName: string;
}

export const SCHEMATICS: Schematic[] = [
  {
    id: 'component',
    alias: 'c',
    example: 'features/user-card',
    ownFolder: true,
    exportName: (n) => `class ${classify(n)}`,
  },
  { id: 'service', alias: 's', example: 'core/auth', exportName: (n) => `class ${classify(n)}` },
  {
    id: 'directive',
    alias: 'd',
    example: 'shared/highlight',
    exportName: (n) => `class ${classify(n)}`,
  },
  {
    id: 'pipe',
    alias: 'p',
    example: 'shared/truncate',
    suffix: 'pipe',
    exportName: (n) => `class ${classify(n)}Pipe`,
  },
  {
    id: 'guard',
    alias: 'guard',
    example: 'core/auth',
    suffix: 'guard',
    exportName: (n) => `const ${camelize(n)}Guard: CanActivateFn`,
  },
  {
    id: 'interceptor',
    alias: 'interceptor',
    example: 'core/auth',
    suffix: 'interceptor',
    exportName: (n) => `const ${camelize(n)}Interceptor: HttpInterceptorFn`,
  },
  {
    id: 'resolver',
    alias: 'resolver',
    example: 'core/user',
    suffix: 'resolver',
    exportName: (n) => `const ${camelize(n)}Resolver: ResolveFn`,
  },
];

const DRY_RUN_NOTE = 'NOTE: The "--dry-run" option means no changes were made.';

/** Builds the command we type and the lines the CLI prints back. */
export function generate(
  schematic: Schematic,
  path: string,
  options: GenerateOptions,
): GenerateResult {
  // "features/UserCard" → folder "features", name "user-card"
  const parts = (path.trim() || schematic.example).split('/').filter(Boolean);
  const name = dasherize(parts.pop() ?? 'example');
  const folder = ['src/app', ...parts, ...(schematic.ownFolder ? [name] : [])].join('/');
  const file = schematic.suffix ? `${name}-${schematic.suffix}` : name;
  const isComponent = schematic.id === 'component';

  // FILES, in the order the CLI prints them
  const files = isComponent
    ? [
        !options.inlineStyle && `${file}.css`,
        !options.skipTests && `${file}.spec.ts`,
        `${file}.ts`,
        !options.inlineTemplate && `${file}.html`,
      ]
    : [!options.skipTests && `${file}.spec.ts`, `${file}.ts`];

  const flags = [
    options.skipTests && '--skip-tests',
    isComponent && options.inlineTemplate && '--inline-template',
    isComponent && options.inlineStyle && '--inline-style',
    options.dryRun && '--dry-run',
  ];

  return {
    command: ['ng g', schematic.alias, [...parts, name].join('/'), ...flags]
      .filter(Boolean)
      .join(' '),
    output: [
      ...files.filter(Boolean).map((f) => `CREATE ${folder}/${f}`),
      ...(options.dryRun ? [DRY_RUN_NOTE] : []),
    ],
    exportName: schematic.exportName(name),
  };
}

// NAME HELPERS (the same idea as the CLI's own string utils)
export function dasherize(value: string): string {
  return value
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function classify(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function camelize(name: string): string {
  const classified = classify(name);
  return classified.charAt(0).toLowerCase() + classified.slice(1);
}
