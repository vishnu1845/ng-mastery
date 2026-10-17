import {
  Component,
  computed,
  EnvironmentProviders,
  Injector,
  Provider,
  provideBrowserGlobalErrorListeners,
  signal,
} from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter, Router, Routes } from '@angular/router';
import { createApplication } from '@angular/platform-browser';
import { CodeBlock } from '@shared/ui/code-block/code-block';

type FeatureId = 'errors' | 'router' | 'http';

interface Feature {
  id: FeatureId;
  code: string;
  providers: () => (Provider | EnvironmentProviders)[];
}

interface Check {
  ask: string;
  run: (injector: Injector) => string;
}

interface Result {
  ask: string;
  ok: boolean;
  text: string;
}

// TWO ROUTES FOR THE MINI APP (no components needed to register them)
const MINI_ROUTES: Routes = [
  { path: 'home', children: [] },
  { path: 'about', children: [] },
];

// THE PROVIDERS YOU CAN TICK
const FEATURES: Feature[] = [
  {
    id: 'errors',
    code: 'provideBrowserGlobalErrorListeners()',
    providers: () => [provideBrowserGlobalErrorListeners()],
  },
  { id: 'router', code: 'provideRouter(routes)', providers: () => [provideRouter(MINI_ROUTES)] },
  { id: 'http', code: 'provideHttpClient()', providers: () => [provideHttpClient()] },
];

// WHAT WE ASK THE NEW APP'S INJECTOR FOR
const CHECKS: Check[] = [
  {
    ask: 'inject(Router)',
    run: (injector) => `a Router with ${injector.get(Router).config.length} routes`,
  },
  {
    ask: 'inject(ActivatedRoute)',
    run: (injector) => {
      injector.get(ActivatedRoute);
      return 'the current route';
    },
  },
  {
    ask: 'inject(HttpClient)',
    run: (injector) => {
      injector.get(HttpClient);
      return 'an HttpClient';
    },
  },
];

/** Builds a real app from the providers you pick, then asks its injector for each feature. */
@Component({
  imports: [CodeBlock],
  selector: 'app-app-config-demo',
  styleUrl: './app-config-demo.scss',
  templateUrl: './app-config-demo.html',
})
export default class AppConfigDemo {
  protected readonly features = FEATURES;
  protected readonly picked = signal<Record<FeatureId, boolean>>({
    errors: true,
    router: true,
    http: false,
  });
  protected readonly results = signal<Result[]>([]);
  protected readonly busy = signal(false);

  // WHAT THE LAST RUN TEACHES (based on the providers it was built with)
  private readonly lastRun = signal<Record<FeatureId, boolean> | null>(null);
  protected readonly insights = computed(() => {
    const run = this.lastRun();
    if (!run) return [];
    return [
      !run.http &&
        'HttpClient works without provideHttpClient(): it is injectable by default since v21. provideHttpClient() is for configuring it (interceptors, withXhr(), XSRF).',
      !run.router &&
        'Router exists without provideRouter(), but with 0 routes and no ActivatedRoute. provideRouter(routes) is what turns routing on.',
    ].filter((text): text is string => !!text);
  });

  // THE app.config.ts FOR THE CURRENT PICK
  protected readonly code = computed(() => {
    const lines = FEATURES.filter((f) => this.picked()[f.id]).map((f) => `    ${f.code},`);
    return [
      'export const appConfig: ApplicationConfig = {',
      `  providers: [${lines.length ? '' : ']'}`,
      ...(lines.length ? [...lines, '  ],'] : []),
      '};',
    ].join('\n');
  });

  protected toggle(id: FeatureId): void {
    this.picked.update((picked) => ({ ...picked, [id]: !picked[id] }));
    this.results.set([]);
    this.lastRun.set(null);
  }

  protected async run(): Promise<void> {
    this.busy.set(true);
    const providers = FEATURES.filter((f) => this.picked()[f.id]).flatMap((f) => f.providers());

    // A REAL, SEPARATE APP: only the providers you picked
    const appRef = await createApplication({ providers });
    this.results.set(CHECKS.map((check) => ask(check, appRef.injector)));
    this.lastRun.set(this.picked());
    appRef.destroy();

    this.busy.set(false);
  }
}

function ask(check: Check, injector: Injector): Result {
  try {
    return { ask: check.ask, ok: true, text: check.run(injector) };
  } catch (error) {
    // Keep Angular's own message, without the docs link at the end
    const message = error instanceof Error ? error.message : String(error);
    return { ask: check.ask, ok: false, text: message.split(' Find more at')[0] };
  }
}
