import { Component, computed, signal } from '@angular/core';

type Command = 'build' | 'build-dev' | 'serve';

interface Run {
  command: string;
  configuration: 'production' | 'development';
  /** Where the files go */
  output: string[];
}

// WHAT EACH COMMAND READS FROM angular.json
const RUNS: Record<Command, Run> = {
  build: {
    command: 'ng build',
    configuration: 'production',
    output: [
      'dist/my-app/browser/index.html',
      'dist/my-app/browser/main-5Q2XKD7M.js',
      'dist/my-app/browser/styles-PL3NZ4WA.css',
      'dist/my-app/browser/favicon.ico',
      'dist/my-app/3rdpartylicenses.txt',
    ],
  },
  'build-dev': {
    command: 'ng build -c development',
    configuration: 'development',
    output: [
      'dist/my-app/browser/index.html',
      'dist/my-app/browser/main.js',
      'dist/my-app/browser/main.js.map',
      'dist/my-app/browser/styles.css',
      'dist/my-app/browser/favicon.ico',
    ],
  },
  serve: {
    command: 'ng serve',
    configuration: 'development',
    output: ['Nothing on disk: the dev server keeps the build in memory'],
  },
};

// BUDGETS FROM THE PRODUCTION CONFIGURATION (kB)
const BUDGET = { warning: 500, error: 1000 };

/** The same angular.json, read three ways: which settings apply and what we get. */
@Component({
  selector: 'app-angular-json-demo',
  styleUrl: './angular-json-demo.scss',
  templateUrl: './angular-json-demo.html',
})
export default class AngularJsonDemo {
  protected readonly commands = Object.keys(RUNS) as Command[];
  protected readonly runs = RUNS;
  protected readonly budget = BUDGET;

  protected readonly command = signal<Command>('build');
  protected readonly bundleKb = signal(420);

  protected readonly run = computed(() => RUNS[this.command()]);
  protected readonly isProduction = computed(() => this.run().configuration === 'production');

  // RESOLVED OPTIONS (builder defaults + the configuration's overrides)
  protected readonly settings = computed(() => {
    const prod = this.isProduction();
    return [
      {
        key: 'optimization',
        value: prod ? 'true' : 'false',
        note: prod ? 'minified' : 'readable code',
      },
      {
        key: 'outputHashing',
        value: prod ? '"all"' : '"none"',
        note: prod ? 'main-5Q2XKD7M.js' : 'main.js',
      },
      {
        key: 'sourceMap',
        value: prod ? 'false' : 'true',
        note: prod ? 'no .map files' : 'debug TS in DevTools',
      },
      {
        key: 'budgets',
        value: prod ? 'checked' : 'not set',
        note: prod ? '500kB warn, 1MB fail' : 'never fails the build',
      },
    ];
  });

  // BUDGET CHECK: only the production configuration has budgets
  protected readonly budgetResult = computed(() => {
    const size = this.bundleKb();

    if (!this.isProduction()) {
      return { tone: 'muted', text: 'No budgets in development, so nothing is checked.' };
    }
    if (size > BUDGET.error) {
      return { tone: 'danger', text: `Error: ${size} kB is over 1 MB. The build fails.` };
    }
    if (size > BUDGET.warning) {
      return {
        tone: 'warning',
        text: `Warning: ${size} kB is over 500 kB. The build still works.`,
      };
    }
    return { tone: 'success', text: `${size} kB is within budget.` };
  });
}
