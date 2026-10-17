import { Component, computed, signal } from '@angular/core';

type Approach = 'framework' | 'library';

interface AppNeed {
  need: string;
  framework: string;
  library: string;
}

// What a real app needs, and where each piece comes from
const APP_NEEDS: AppNeed[] = [
  { need: 'Routing', framework: '@angular/router', library: 'React Router or TanStack Router' },
  { need: 'Forms', framework: '@angular/forms', library: 'React Hook Form or Formik' },
  { need: 'HTTP calls', framework: 'HttpClient', library: 'fetch, Axios or TanStack Query' },
  {
    need: 'Dependency injection',
    framework: 'Built into @angular/core',
    library: 'Context API or a DI library',
  },
  {
    need: 'Unit testing',
    framework: 'ng test (Vitest + TestBed)',
    library: 'Vitest or Jest + Testing Library',
  },
  {
    need: 'Build and dev server',
    framework: 'Angular CLI (esbuild + Vite)',
    library: 'Vite, Next.js or another tool',
  },
  {
    need: 'Server-side rendering',
    framework: '@angular/ssr',
    library: 'Next.js or a custom setup',
  },
];

/** Compares building one app with a framework (Angular) vs a UI library (React). */
@Component({
  selector: 'app-framework-vs-library-demo',
  styleUrl: './framework-vs-library-demo.scss',
  templateUrl: './framework-vs-library-demo.html',
})
export default class FrameworkVsLibraryDemo {
  protected readonly needs = APP_NEEDS;
  protected readonly approach = signal<Approach>('framework');

  protected readonly choicesToMake = computed(() =>
    this.approach() === 'framework' ? 0 : APP_NEEDS.length,
  );
}
