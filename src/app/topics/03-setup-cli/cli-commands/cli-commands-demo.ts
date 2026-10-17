import { Component, computed, signal } from '@angular/core';
import { generate, GenerateOptions, SCHEMATICS } from './schematics';

type OptionKey = keyof GenerateOptions;

interface Flag {
  key: OptionKey;
  label: string;
  componentOnly?: boolean;
}

const FLAGS: Flag[] = [
  { key: 'skipTests', label: '--skip-tests' },
  { key: 'inlineTemplate', label: '--inline-template', componentOnly: true },
  { key: 'inlineStyle', label: '--inline-style', componentOnly: true },
  { key: 'dryRun', label: '--dry-run' },
];

/** Build an `ng generate` command and see exactly which files Angular 22 creates. */
@Component({
  selector: 'app-cli-commands-demo',
  styleUrl: './cli-commands-demo.scss',
  templateUrl: './cli-commands-demo.html',
})
export default class CliCommandsDemo {
  protected readonly schematics = SCHEMATICS;
  protected readonly flags = FLAGS;

  // FORM STATE
  protected readonly schematic = signal(SCHEMATICS[0]);
  protected readonly path = signal(SCHEMATICS[0].example);
  protected readonly options = signal<GenerateOptions>({
    skipTests: false,
    inlineTemplate: false,
    inlineStyle: false,
    dryRun: false,
  });

  protected readonly isComponent = computed(() => this.schematic().id === 'component');

  // WHAT THE TERMINAL SHOWS
  protected readonly result = computed(() =>
    generate(this.schematic(), this.path(), this.options()),
  );

  protected choose(id: string): void {
    const next = SCHEMATICS.find((s) => s.id === id)!;
    this.schematic.set(next);
    this.path.set(next.example);
  }

  protected toggle(key: OptionKey): void {
    this.options.update((options) => ({ ...options, [key]: !options[key] }));
  }
}
