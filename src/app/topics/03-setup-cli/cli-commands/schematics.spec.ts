import { generate, GenerateOptions, SCHEMATICS, SchematicId } from './schematics';

const DEFAULTS: GenerateOptions = {
  skipTests: false,
  inlineTemplate: false,
  inlineStyle: false,
  dryRun: false,
};

const schematic = (id: SchematicId) => SCHEMATICS.find((s) => s.id === id)!;

// Expected lines come from the real Angular 22.2 CLI (`ng g ... --dry-run`)
describe('generate', () => {
  it('puts a component in its own folder with four files', () => {
    const result = generate(schematic('component'), 'features/user-card', DEFAULTS);

    expect(result.command).toBe('ng g c features/user-card');
    expect(result.output).toEqual([
      'CREATE src/app/features/user-card/user-card.css',
      'CREATE src/app/features/user-card/user-card.spec.ts',
      'CREATE src/app/features/user-card/user-card.ts',
      'CREATE src/app/features/user-card/user-card.html',
    ]);
    expect(result.exportName).toBe('class UserCard');
  });

  it('drops the spec and template files for --skip-tests --inline-template', () => {
    const result = generate(schematic('component'), 'features/user-card', {
      ...DEFAULTS,
      skipTests: true,
      inlineTemplate: true,
    });

    expect(result.output).toEqual([
      'CREATE src/app/features/user-card/user-card.css',
      'CREATE src/app/features/user-card/user-card.ts',
    ]);
  });

  it('creates services flat, without a suffix', () => {
    expect(generate(schematic('service'), 'core/auth', DEFAULTS).output).toEqual([
      'CREATE src/app/core/auth.spec.ts',
      'CREATE src/app/core/auth.ts',
    ]);
  });

  it('keeps the suffix for pipes and guards', () => {
    expect(generate(schematic('pipe'), 'shared/truncate', DEFAULTS).output[1]).toBe(
      'CREATE src/app/shared/truncate-pipe.ts',
    );
    expect(generate(schematic('guard'), 'core/auth', DEFAULTS).exportName).toBe(
      'const authGuard: CanActivateFn',
    );
  });

  it('turns any name into kebab-case and adds the dry-run note', () => {
    const result = generate(schematic('component'), 'UserCard', { ...DEFAULTS, dryRun: true });

    expect(result.command).toBe('ng g c user-card --dry-run');
    expect(result.output.at(-1)).toContain('no changes were made');
  });
});
