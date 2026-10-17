import { afterNextRender, Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BOOT_MARK_PREFIX, BootStep } from '@core/boot/boot-marks';

type Actor = 'network' | 'browser' | 'angular';

interface Step {
  label: string;
  detail: string;
  at: number;
  actor: Actor;
}

// WHAT EACH BOOT MARK MEANS (the marks live in main.ts, app.config.ts and app.ts)
const MARKS: Record<BootStep, { label: string; detail: string }> = {
  main: { label: 'main.ts runs', detail: 'bootstrapApplication(App, appConfig) is called' },
  initializer: {
    label: 'Providers + app initializers',
    detail: 'appConfig providers are set up, provideAppInitializer() runs',
  },
  app: { label: 'App component created', detail: 'the root component, inside <app-root>' },
  render: { label: 'First render done', detail: 'hydration reused the server HTML' },
  route: { label: 'Router finished', detail: 'this lesson is now in <router-outlet>' },
};

const ACTOR_LABELS: Record<Actor, string> = {
  network: 'Network',
  browser: 'Browser',
  angular: 'Angular',
};

/** How this very tab booted, read from the browser's Performance API and our boot marks. */
@Component({
  imports: [DecimalPipe],
  selector: 'app-execution-flow-demo',
  styleUrl: './execution-flow-demo.scss',
  templateUrl: './execution-flow-demo.html',
})
export default class ExecutionFlowDemo {
  protected readonly actorLabels = ACTOR_LABELS;
  protected readonly steps = signal<Step[]>([]);
  protected readonly loadedPath = signal('');
  protected readonly total = computed(() => Math.max(1, ...this.steps().map((s) => s.at)));

  constructor() {
    // Timings only exist in the browser, so read them after the first render
    afterNextRender(() => this.measure());
  }

  protected reload(): void {
    location.reload();
  }

  private measure(): void {
    const nav = performance.getEntriesByType('navigation')[0] as
      PerformanceNavigationTiming | undefined;
    const paint = performance.getEntriesByName('first-contentful-paint')[0];
    const bundle = performance
      .getEntriesByType('resource')
      .find((entry) => /\/main(-\w+)?\.js(\?|$)/.test(entry.name)) as
      PerformanceResourceTiming | undefined;

    // NETWORK + BROWSER STEPS
    const steps: Step[] = [
      {
        label: 'Request sent',
        detail: 'the browser asks the server for the page',
        at: 0,
        actor: 'network',
      },
    ];
    if (nav) {
      steps.push({
        label: 'HTML arrives',
        detail: 'index.html, already filled with this page (prerendered)',
        at: nav.responseEnd,
        actor: 'network',
      });
    }
    if (paint) {
      steps.push({
        label: 'First paint',
        detail: 'you can already see the page, before any Angular code runs',
        at: paint.startTime,
        actor: 'browser',
      });
    }
    if (bundle) {
      const file = bundle.name.split('/').pop()?.split('?')[0] ?? 'main.js';
      steps.push({
        label: `${file} downloaded`,
        detail: 'the bundle the CLI injected into index.html',
        at: bundle.responseEnd,
        actor: 'network',
      });
    }

    // ANGULAR STEPS: the first mark of each kind
    const seen = new Set<string>();
    for (const mark of performance.getEntriesByType('mark')) {
      const step = mark.name.slice(BOOT_MARK_PREFIX.length) as BootStep;
      if (mark.name.startsWith(BOOT_MARK_PREFIX) && MARKS[step] && !seen.has(step)) {
        seen.add(step);
        steps.push({ ...MARKS[step], at: mark.startTime, actor: 'angular' });
      }
    }

    this.steps.set(steps.sort((a, b) => a.at - b.at));
    this.loadedPath.set(nav ? new URL(nav.name).pathname : location.pathname);
  }
}
