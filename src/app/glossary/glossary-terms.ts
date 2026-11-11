import { CodeLang } from '@core/content/code-highlighter';

/** One glossary entry. Lesson notes link to it with [[slug]] or [[slug|text]]. */
export interface GlossaryTerm {
  slug: string;
  term: string;
  /** One sentence. Shown in the hover preview and the A–Z list. `code` is allowed. */
  short: string;
  /** More explanation, in markdown. */
  body?: string;
  example?: { code: string; lang: CodeLang };
  /** Slugs of other glossary terms. */
  related?: string[];
  /** Lesson URLs that teach this term, like '/signals-basics/computed'. */
  lessons?: string[];
}

// THE GLOSSARY: kept in A–Z order by slug
export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'angular-cli',
    term: 'Angular CLI',
    short:
      'The official command-line tool, `ng`, that creates, runs, generates, builds, tests and updates Angular apps.',
    body: "Inside a project folder, `ng` hands over to the project's own local CLI version from `node_modules`, so one global install works with old and new projects.",
    example: {
      lang: 'bash',
      code: 'ng new my-app\nng serve\nng g c features/user-card\nng build',
    },
    related: ['angular-json', 'node-js', 'npm'],
    lessons: ['/setup-cli/cli-commands'],
  },
  {
    slug: 'angular-json',
    term: 'angular.json',
    short:
      'The workspace config file the Angular CLI reads to know how to build, serve and test each project.',
    body: 'It holds the entry file (`main.ts`), assets, global styles, budgets, and the production and development configurations.',
    related: ['angular-cli', 'bundle'],
    lessons: ['/setup-cli/angular-json'],
  },
  {
    slug: 'aot-compilation',
    term: 'AOT compilation',
    short:
      'Ahead-of-Time compilation: Angular turns templates into JavaScript at build time, so the browser never has to compile them.',
    body: 'AOT has been the default since Angular 9. Because templates are compiled during `ng build`, template mistakes show up as build errors, the browser downloads less code and the app starts faster. The old alternative, JIT (Just-in-Time), compiled templates in the browser.',
    related: ['angular-cli', 'bundle', 'template'],
    lessons: ['/bootstrapping/execution-flow'],
  },
  {
    slug: 'aria',
    term: 'ARIA',
    short:
      'Accessible Rich Internet Applications: HTML attributes like `role` and `aria-label` that describe a page to screen readers.',
    body: "ARIA adds meaning plain HTML can't express, like `aria-checked` on a custom switch or `aria-busy` while something loads. In Angular, we usually bind them with `[attr.aria-*]`.",
    example: {
      lang: 'angular-html',
      code: '<div role="progressbar" [attr.aria-valuenow]="percent()"></div>',
    },
    related: ['attribute-binding', 'html-attribute'],
    lessons: ['/data-binding/attribute', '/components/host-bindings'],
  },
  {
    slug: 'async-pipe',
    term: 'async pipe',
    short:
      'A pipe that subscribes to an Observable or Promise in the template, shows its latest value, and unsubscribes when the view is destroyed.',
    body: 'Every `| async` in a template is its own subscription. To use one value in several places, save it once with [[let-declaration|@let]].',
    example: {
      lang: 'angular-html',
      code: '@let user = user$ | async;\n<p>{{ user?.name }}</p>',
    },
    related: ['observable', 'let-declaration'],
    lessons: ['/control-flow/let'],
  },
  {
    slug: 'attribute-binding',
    term: 'Attribute binding',
    short:
      'Setting an HTML attribute with `[attr.name]`, for attributes that have no DOM property, like `colspan` or `aria-*`.',
    body: 'Binding `null` or `undefined` removes the attribute completely.',
    example: { lang: 'angular-html', code: '<td [attr.colspan]="span()">Total</td>' },
    related: ['html-attribute', 'dom-property', 'property-binding', 'aria'],
    lessons: ['/data-binding/attribute'],
  },
  {
    slug: 'attribute-directive',
    term: 'Attribute directive',
    short:
      'A directive that changes the look or behavior of an existing element. It is added to the element like an attribute.',
    body: '`ngClass`, `ngStyle` and `ngModel` are built-in ones. A custom one has a selector in square brackets, like `[appHighlight]`.',
    example: {
      lang: 'angular-html',
      code: '<p [appHighlight]="\'gold\'">Hover me</p>',
    },
    related: ['directive', 'structural-directive', 'host-element'],
    lessons: ['/directives/directive-types', '/directives/custom-attribute'],
  },
  {
    slug: 'bootstrapping',
    term: 'Bootstrapping',
    short:
      'Starting an Angular app: loading the entry file, setting up app-wide providers and rendering the root component into `index.html`.',
    example: { lang: 'angular-ts', code: 'bootstrapApplication(App, appConfig);' },
    related: ['standalone-component', 'provider', 'ngmodule'],
    lessons: ['/bootstrapping/execution-flow', '/bootstrapping/main-ts'],
  },
  {
    slug: 'bundle',
    term: 'Bundle',
    short:
      'The optimized JavaScript and CSS files the build produces, which the browser downloads to run the app.',
    body: 'The Angular CLI builds bundles with esbuild. The initial bundle loads first; lazy-loaded code goes into separate chunks that load only when needed.',
    related: ['tree-shaking', 'lazy-loading', 'aot-compilation'],
    lessons: ['/setup-cli/angular-json'],
  },
  {
    slug: 'change-detection',
    term: 'Change detection',
    short:
      'How Angular keeps the screen in sync with the data: it re-checks templates and updates the DOM where values changed.',
    body: 'With Zone.js, Angular checked the component tree after every async event. With signals in a zoneless app, it refreshes only the components whose signals changed, that handled an event, or that called `markForCheck()`.',
    related: ['zone-js', 'zoneless', 'onpush', 'signal'],
    lessons: ['/signals-basics/what-is-a-signal', '/signals-basics/signal-vs-property'],
  },
  {
    slug: 'component',
    term: 'Component',
    short:
      'The main building block of an Angular app: a class, a template, styles and `@Component` metadata that together control one part of the UI.',
    example: {
      lang: 'angular-ts',
      code: "@Component({\n  selector: 'app-user-card',\n  template: `<h3>Hello {{ name() }}</h3>`,\n})\nexport class UserCard {\n  name = signal('Vishnu');\n}",
    },
    related: ['decorator', 'metadata', 'template', 'selector', 'standalone-component'],
    lessons: ['/components/anatomy'],
  },
  {
    slug: 'computed',
    term: 'computed()',
    short:
      'A read-only signal derived from other signals. It is lazy and cached, and recalculates only when a signal it read changes.',
    example: { lang: 'angular-ts', code: 'total = computed(() => this.price() * this.qty());' },
    related: ['signal', 'effect'],
    lessons: ['/signals-basics/computed'],
  },
  {
    slug: 'control-flow',
    term: 'Control flow',
    short:
      'The template blocks `@if`, `@for` and `@switch` that decide what is shown, hidden or repeated. Built into Angular since v17.',
    body: 'They are part of the template syntax, so nothing is imported. They replaced the [[structural-directive|structural directives]] `*ngIf`, `*ngFor` and `ngSwitch`.',
    example: {
      lang: 'angular-html',
      code: '@if (user(); as user) {\n  <p>Hi {{ user.name }}</p>\n} @else {\n  <p>Please log in</p>\n}',
    },
    related: ['template', 'track', 'structural-directive'],
    lessons: ['/control-flow/if-else', '/control-flow/for-track', '/control-flow/switch'],
  },
  {
    slug: 'data-binding',
    term: 'Data binding',
    short:
      'The communication between a component class (TS) and its template (HTML): interpolation, property binding, event binding and two-way binding.',
    related: ['interpolation', 'property-binding', 'event-binding', 'two-way-binding'],
    lessons: ['/data-binding/overview'],
  },
  {
    slug: 'decorator',
    term: 'Decorator',
    short:
      'A TypeScript feature, written with `@`, that attaches metadata to a class, property, method or parameter, telling Angular how to treat it.',
    body: 'Under the hood, a decorator is just a function. Modern Angular replaces most property and parameter decorators with functions like `input()`, `output()` and `inject()`, but class decorators like `@Component` stay.',
    example: {
      lang: 'angular-ts',
      code: "@Component({ selector: 'app-user', template: '<p>Hi</p>' })\nexport class User {}",
    },
    related: ['metadata', 'component', 'typescript'],
    lessons: ['/typescript/decorators', '/components/decorator-types'],
  },
  {
    slug: 'dependency-injection',
    term: 'Dependency injection (DI)',
    short:
      'A design pattern where Angular creates the objects a class needs, like services, and hands them over, instead of the class creating them itself.',
    body: 'We ask for a dependency with `inject()`, and Angular looks it up through its injectors using the registered providers. Topic 15 goes deep into it.',
    example: {
      lang: 'angular-ts',
      code: 'export class Cart {\n  private http = inject(HttpClient);\n}',
    },
    related: ['provider', 'service', 'injection-context'],
    lessons: ['/components/metadata'],
  },
  {
    slug: 'directive',
    term: 'Directive',
    short:
      'A class that adds behaviour to elements in a template. A component is a directive with a template; an attribute directive changes an existing element.',
    body: '`ngModel` is an attribute directive. The built-in `@if` and `@for` blocks replaced the old structural directives `*ngIf` and `*ngFor`. Topic 09 covers writing our own.',
    related: ['component', 'attribute-directive', 'structural-directive', 'host-directives'],
    lessons: ['/directives/directive-types', '/data-binding/template-refs'],
  },
  {
    slug: 'dom',
    term: 'DOM',
    short:
      "Document Object Model: the browser's tree of objects that represents the page, which JavaScript (and Angular) reads and changes.",
    body: 'Our templates describe the DOM. Angular creates the elements once, then changes only the nodes whose values changed.',
    related: ['dom-property', 'html-attribute', 'change-detection'],
    lessons: ['/data-binding/property-vs-attribute', '/signals-basics/signals-in-templates'],
  },
  {
    slug: 'dom-property',
    term: 'DOM property',
    short:
      "A value on an element's JavaScript object, like `input.value` or `button.disabled`. It holds the current value and can be any type.",
    related: ['html-attribute', 'property-binding', 'dom'],
    lessons: ['/data-binding/property-vs-attribute', '/data-binding/property'],
  },
  {
    slug: 'effect',
    term: 'effect()',
    short:
      'A function that runs automatically whenever the signals it reads change. We use it only for side effects, like logging or saving to localStorage.',
    body: 'An effect must be created in an injection context. It runs once at the start, then again (asynchronously) after the signals it read change.',
    example: {
      lang: 'angular-ts',
      code: "constructor() {\n  effect(() => localStorage.setItem('draft', this.draft()));\n}",
    },
    related: ['signal', 'computed', 'injection-context'],
    lessons: ['/signals-basics/effect', '/signals-basics/injection-context'],
  },
  {
    slug: 'element-ref',
    term: 'ElementRef',
    short:
      'An Angular service that wraps the actual DOM element. Its `nativeElement` is the real HTML element.',
    body: 'Use it to read from the DOM or to call `focus()`, inside `afterNextRender`. For changing the DOM, a binding or [[renderer2|Renderer2]] comes first.',
    related: ['renderer2', 'dom', 'host-element'],
    lessons: ['/directives/renderer2', '/directives/custom-attribute'],
  },
  {
    slug: 'event-binding',
    term: 'Event binding',
    short:
      'Listening to a DOM event or a component output with `(event)="handler()"`, so data flows from the view back to TS.',
    body: 'Inside the handler, `$event` holds the event data: the browser event for DOM events, or the emitted value for a component `output()`.',
    example: { lang: 'angular-html', code: '<button (click)="save()">Save</button>' },
    related: ['data-binding', 'two-way-binding'],
    lessons: ['/data-binding/events', '/data-binding/key-events'],
  },
  {
    slug: 'export-as',
    term: 'exportAs',
    short:
      'A name a directive publishes, so a template reference like `#ref="name"` points at the directive instead of the element.',
    example: {
      lang: 'angular-html',
      code: '<input [(ngModel)]="email" #state="ngModel" />\n<p>Valid: {{ state.valid }}</p>',
    },
    related: ['template-reference-variable', 'directive'],
    lessons: ['/directives/export-as'],
  },
  {
    slug: 'first-class-function',
    term: 'First-class function',
    short:
      'Functions are values: they can be stored in variables, passed as arguments and returned from other functions. JavaScript has this.',
    body: 'Angular uses it everywhere: `loadComponent: () => import(...)` passes a function, `count.update(fn)` takes one, and so do `computed()` and `effect()`.',
    example: {
      lang: 'angular-ts',
      code: 'const double = (n: number) => n * 2; // stored in a variable\n[1, 2, 3].map(double); // passed as an argument',
    },
    related: ['computed', 'lazy-loading'],
  },
  {
    slug: 'framework',
    term: 'Framework',
    short:
      'A complete set of tools with its own rules and structure for building whole apps. It calls our code, not the other way round.',
    related: ['library', 'spa'],
    lessons: ['/introduction/framework-vs-library'],
  },
  {
    slug: 'generics',
    term: 'Generics',
    short:
      'TypeScript type parameters, like `<T>`, that let one function, class or interface work with many types while staying type-safe.',
    example: {
      lang: 'angular-ts',
      code: "users = signal<User[]>([]);\nthis.http.get<User[]>('/api/users');",
    },
    related: ['typescript'],
    lessons: ['/typescript/generics'],
  },
  {
    slug: 'host-directives',
    term: 'Host directives',
    short:
      'Directives that a component or directive applies to its own host element through `hostDirectives`. Also called the directive composition API.',
    related: ['directive', 'host-element'],
    lessons: ['/directives/host-directives'],
  },
  {
    slug: 'host-element',
    term: 'Host element',
    short:
      "A component's own tag in the DOM, like `<app-toggle>`. The `host` metadata adds attributes, classes and listeners to it.",
    related: ['component', 'selector', 'view-encapsulation'],
    lessons: ['/components/host-bindings', '/components/host-styling'],
  },
  {
    slug: 'html-attribute',
    term: 'HTML attribute',
    short:
      'A name and value written in HTML, like `value="Pune"`. It sets the initial value and is always a string.',
    related: ['dom-property', 'attribute-binding'],
    lessons: ['/data-binding/property-vs-attribute'],
  },
  {
    slug: 'hydration',
    term: 'Hydration',
    short:
      'The browser reusing the HTML the server already rendered, instead of re-creating it, then making it interactive.',
    body: 'Turned on with `provideClientHydration()`. It avoids a flicker and makes server-rendered pages usable sooner. Topic 40 covers it.',
    related: ['ssr', 'prerendering'],
    lessons: ['/bootstrapping/app-config'],
  },
  {
    slug: 'immutability',
    term: 'Immutability',
    short:
      'Never changing an existing object or array, and creating a new one with the change instead, so reference checks like `Object.is` can see it.',
    example: { lang: 'angular-ts', code: "items.update((list) => [...list, 'Eggs']);" },
    related: ['signal'],
    lessons: ['/signals-basics/immutable-updates'],
  },
  {
    slug: 'injection-context',
    term: 'Injection context',
    short:
      'The places where `inject()`, `effect()` and similar functions are allowed: constructors, field initializers, factory functions and `runInInjectionContext()`.',
    body: 'Calling them anywhere else, like in a click handler or `ngOnInit`, throws NG0203.',
    related: ['dependency-injection', 'effect'],
    lessons: ['/signals-basics/injection-context'],
  },
  {
    slug: 'interpolation',
    term: 'Interpolation',
    short:
      'Showing component data in a template with `{{ }}`. Angular evaluates the expression and inserts the result as text.',
    example: { lang: 'angular-html', code: '<p>Hello {{ name() }}</p>' },
    related: ['data-binding', 'property-binding'],
    lessons: ['/data-binding/interpolation'],
  },
  {
    slug: 'lazy-loading',
    term: 'Lazy loading',
    short:
      "Downloading a piece of the app only when it's needed, like a route's component, instead of in the initial bundle.",
    body: 'Routes lazy-load with `loadComponent` (topic 19), and `@defer` lazy-loads parts of a template (topic 37).',
    example: {
      lang: 'angular-ts',
      code: "{ path: 'admin', loadComponent: () => import('./admin') }",
    },
    related: ['bundle', 'tree-shaking', 'first-class-function'],
    lessons: ['/bootstrapping/standalone-vs-ngmodule'],
  },
  {
    slug: 'let-declaration',
    term: '@let',
    short:
      'A read-only variable declared inside a template, to compute a value once and reuse it below.',
    example: {
      lang: 'angular-html',
      code: '@let total = price() * qty();\n<p>Total ₹{{ total }}</p>',
    },
    related: ['template', 'async-pipe', 'template-reference-variable'],
    lessons: ['/control-flow/let'],
  },
  {
    slug: 'library',
    term: 'Library',
    short:
      "Code we call for a specific task, like Chart.js for charts. We stay in control of the app's structure.",
    related: ['framework'],
    lessons: ['/introduction/framework-vs-library'],
  },
  {
    slug: 'lts',
    term: 'LTS (Long-Term Support)',
    short:
      'The period after active development when a version only gets security and critical fixes. Each Angular major gets 12 months of LTS.',
    related: ['semver'],
    lessons: ['/introduction/release-cycle'],
  },
  {
    slug: 'metadata',
    term: 'Metadata',
    short:
      'The configuration object passed into a decorator, like `selector` and `templateUrl` in `@Component`, which tells Angular how to create and render the class.',
    related: ['decorator', 'component'],
    lessons: ['/components/metadata'],
  },
  {
    slug: 'mpa',
    term: 'MPA (Multi Page Application)',
    short:
      'A website that loads a brand-new HTML page from the server every time the user navigates.',
    related: ['spa', 'ssr'],
    lessons: ['/introduction/spa-vs-mpa'],
  },
  {
    slug: 'mutation-observer',
    term: 'MutationObserver',
    short:
      'A browser API that reports every change made to a part of the DOM: nodes added, nodes removed, text and attributes changed.',
    body: 'The demos use it to count what Angular really did to the page, instead of guessing.',
    related: ['dom'],
    lessons: ['/control-flow/for-track'],
  },
  {
    slug: 'ng-container',
    term: '<ng-container>',
    short: 'A grouping tag that creates no element in the DOM. Only its content is rendered.',
    body: 'It is the right place for a directive when an extra `<div>` would break the layout.',
    related: ['ng-template', 'directive'],
    lessons: ['/control-flow/ng-template-container'],
  },
  {
    slug: 'ng-template',
    term: '<ng-template>',
    short:
      'A piece of template that Angular does not render by itself. It appears only when something stamps it, like `ngTemplateOutlet`.',
    example: {
      lang: 'angular-html',
      code: '<ng-template #card let-name>\n  <strong>{{ name }}</strong>\n</ng-template>\n\n<ng-container [ngTemplateOutlet]="card" [ngTemplateOutletContext]="{ $implicit: \'Asha\' }" />',
    },
    related: ['ng-container', 'structural-directive'],
    lessons: ['/control-flow/ng-template-container'],
  },
  {
    slug: 'ngmodule',
    term: 'NgModule',
    short:
      'A class marked with `@NgModule` that groups components, directives, pipes and providers. Required before standalone components, legacy today.',
    related: ['standalone-component', 'bootstrapping'],
    lessons: ['/bootstrapping/standalone-vs-ngmodule'],
  },
  {
    slug: 'node-js',
    term: 'Node.js',
    short:
      'A JavaScript runtime that runs JS outside the browser. The Angular CLI and build tools run on it; the built app runs in the browser.',
    related: ['npm', 'angular-cli'],
    lessons: ['/setup-cli/node-npm'],
  },
  {
    slug: 'npm',
    term: 'npm',
    short:
      'The package manager that comes with Node.js. It installs the libraries listed in `package.json` and locks exact versions in `package-lock.json`.',
    related: ['node-js', 'semver'],
    lessons: ['/setup-cli/node-npm', '/setup-cli/package-files'],
  },
  {
    slug: 'observable',
    term: 'Observable',
    short:
      'An RxJS stream that can deliver many values over time, like HTTP responses or user events. Nothing happens until someone subscribes.',
    body: 'Topics 27 to 32 cover RxJS, and topic 35 connects observables with signals.',
    related: ['promise', 'signal'],
  },
  {
    slug: 'onpush',
    term: 'OnPush',
    short:
      'A change detection strategy: Angular refreshes a component only when its inputs change, an event fires in it, a signal it reads changes, or `markForCheck()` is called. The default in Angular 22.',
    related: ['change-detection', 'signal', 'zoneless'],
    lessons: ['/components/metadata', '/signals-basics/signal-vs-property'],
  },
  {
    slug: 'prerendering',
    term: 'Prerendering (SSG)',
    short:
      'Rendering pages to static HTML files at build time, so they can be served instantly without rendering on the server per request.',
    body: 'This site is prerendered: every lesson and glossary page is plain HTML before Angular even starts in the browser.',
    related: ['ssr', 'hydration'],
  },
  {
    slug: 'promise',
    term: 'Promise',
    short:
      'A JavaScript object for a value that arrives later, or fails. We wait for it with `await` or `.then()`.',
    body: '`bootstrapApplication()` returns a Promise, and an app initializer can return one to make Angular wait before rendering.',
    related: ['observable'],
    lessons: ['/bootstrapping/main-ts', '/bootstrapping/app-initializer'],
  },
  {
    slug: 'property-binding',
    term: 'Property binding',
    short:
      'Setting a DOM property or a component input with `[property]="value"`, keeping the real type of the value.',
    example: { lang: 'angular-html', code: '<button [disabled]="isSaving()">Save</button>' },
    related: ['dom-property', 'interpolation', 'attribute-binding'],
    lessons: ['/data-binding/property'],
  },
  {
    slug: 'provider',
    term: 'Provider',
    short:
      "An instruction that tells Angular's dependency injection how to create a dependency, registered in a `providers` array or with a `provideXxx()` function.",
    example: {
      lang: 'angular-ts',
      code: 'providers: [provideRouter(routes), provideHttpClient()]',
    },
    related: ['dependency-injection', 'service', 'injection-context'],
    lessons: ['/bootstrapping/app-config', '/components/metadata'],
  },
  {
    slug: 'renderer2',
    term: 'Renderer2',
    short:
      "Angular's own API for changing the DOM from code: creating elements, setting styles, adding listeners.",
    body: "Elements it creates get the component's scoped styles. It does not clean unsafe HTML. Only template bindings are [[sanitization|sanitized]].",
    related: ['element-ref', 'dom', 'sanitization'],
    lessons: ['/directives/renderer2'],
  },
  {
    slug: 'sanitization',
    term: 'Sanitization',
    short:
      'Cleaning a value before it goes into the DOM, so it cannot run a script. Angular does it automatically for template bindings like `[innerHTML]`.',
    related: ['renderer2', 'dom'],
    lessons: ['/directives/renderer2'],
  },
  {
    slug: 'selector',
    term: 'Selector',
    short:
      'The CSS-style pattern in `@Component` that tells Angular where to place a component: an element (`app-user`), an attribute (`[appUser]`) or a class.',
    related: ['component', 'host-element'],
    lessons: ['/components/selectors'],
  },
  {
    slug: 'semver',
    term: 'Semantic versioning',
    short:
      'Version numbers in the form `major.minor.patch`. Only a major release may contain breaking changes.',
    body: 'In `package.json`, `^22.0.0` allows minor and patch updates, and `~7.8.0` allows only patches.',
    related: ['npm', 'lts'],
    lessons: ['/introduction/release-cycle', '/setup-cli/package-files'],
  },
  {
    slug: 'service',
    term: 'Service',
    short:
      'A class that holds logic or data shared across components, like an API client or a cart, handed to them through dependency injection.',
    body: "Angular 22 adds the `@Service()` decorator, a shorter way to create an automatically provided service. Older code uses `@Injectable({ providedIn: 'root' })`.",
    example: {
      lang: 'angular-ts',
      code: '@Service()\nexport class Cart {\n  readonly items = signal<Item[]>([]);\n}',
    },
    related: ['dependency-injection', 'provider'],
    lessons: ['/components/metadata'],
  },
  {
    slug: 'shadow-dom',
    term: 'Shadow DOM',
    short:
      "A browser feature that attaches a separate, hidden DOM tree to an element, with styles that don't leak in or out.",
    related: ['view-encapsulation', 'dom'],
    lessons: ['/components/view-encapsulation'],
  },
  {
    slug: 'signal',
    term: 'Signal',
    short:
      'A reactive state variable. We read it by calling it, `count()`, and change it with `.set()` or `.update()`; Angular then updates exactly what depends on it.',
    example: { lang: 'angular-ts', code: 'count = signal(0);\nthis.count.update((n) => n + 1);' },
    related: ['computed', 'effect', 'change-detection', 'zoneless'],
    lessons: ['/signals-basics/what-is-a-signal', '/signals-basics/signal-set-update'],
  },
  {
    slug: 'spa',
    term: 'SPA (Single Page Application)',
    short:
      'A web app that loads once, then updates the page with JavaScript as the user navigates, without full page reloads.',
    related: ['mpa', 'ssr', 'framework'],
    lessons: ['/introduction/spa-vs-mpa'],
  },
  {
    slug: 'ssr',
    term: 'SSR (Server-Side Rendering)',
    short:
      "Rendering a page's HTML on the server for each request, so users and search engines get real content before the JavaScript loads.",
    body: 'We add it with `ng new --ssr` or `ng add @angular/ssr`. Topic 40 covers SSR, prerendering and hydration together.',
    related: ['hydration', 'prerendering', 'spa'],
    lessons: ['/introduction/spa-vs-mpa', '/setup-cli/cli-commands'],
  },
  {
    slug: 'standalone-component',
    term: 'Standalone component',
    short:
      'A component that lists its own dependencies in its `imports` array and needs no NgModule. The default since Angular 19.',
    related: ['ngmodule', 'component'],
    lessons: ['/bootstrapping/standalone-vs-ngmodule'],
  },
  {
    slug: 'strict-mode',
    term: 'Strict mode',
    short:
      'The `"strict": true` TypeScript setting that turns on all strong type checks. New Angular projects use it, plus `strictTemplates` for HTML.',
    related: ['typescript', 'type-narrowing'],
    lessons: ['/typescript/tsconfig-strict'],
  },
  {
    slug: 'structural-directive',
    term: 'Structural directive',
    short:
      'A directive that adds or removes elements in the DOM, written with a `*` like `*ngIf` and `*ngFor`.',
    body: 'The `*` is short for wrapping the element in an [[ng-template|<ng-template>]]. The built-in ones are deprecated since v20 in favour of [[control-flow|control flow]] blocks. We can still write our own.',
    related: ['directive', 'control-flow', 'ng-template'],
    lessons: ['/directives/custom-structural', '/control-flow/legacy-structural'],
  },
  {
    slug: 'template',
    term: 'Template',
    short: 'The HTML of a component, extended with Angular syntax like bindings, `@if` and `@for`.',
    related: ['component', 'control-flow', 'data-binding', 'interpolation'],
    lessons: ['/components/anatomy'],
  },
  {
    slug: 'template-ref',
    term: 'TemplateRef',
    short:
      'A reference to an `<ng-template>`: a piece of template that can be rendered later, any number of times.',
    related: ['ng-template', 'view-container-ref', 'structural-directive'],
    lessons: ['/directives/custom-structural'],
  },
  {
    slug: 'template-reference-variable',
    term: 'Template reference variable',
    short:
      'A name given to an element, component or directive in a template with `#name`, so the template can use it directly.',
    example: {
      lang: 'angular-html',
      code: '<input #email />\n<button (click)="subscribe(email.value)">Subscribe</button>',
    },
    related: ['directive', 'dom'],
    lessons: ['/data-binding/template-refs'],
  },
  {
    slug: 'track',
    term: 'track',
    short:
      'The required part of `@for` that gives each item a unique key, so Angular can match items with their DOM rows when the list changes.',
    body: 'Track by a unique id from the data. `track $index` keeps rows in place and only suits lists that never reorder.',
    example: {
      lang: 'angular-html',
      code: '@for (user of users(); track user.id) {\n  <li>{{ user.name }}</li>\n}',
    },
    related: ['control-flow', 'dom'],
    lessons: ['/control-flow/for-track'],
  },
  {
    slug: 'transpile',
    term: 'Transpile',
    short:
      'Compiling source code into another language at a similar level, like TypeScript into JavaScript.',
    related: ['typescript', 'aot-compilation'],
    lessons: ['/typescript/why-typescript'],
  },
  {
    slug: 'tree-shaking',
    term: 'Tree shaking',
    short:
      'Removing code that is never used from the bundle at build time, so users download less.',
    body: 'Standalone components and `provideXxx()` functions tree-shake better than NgModules, because pieces nobody references never reach the bundle.',
    related: ['bundle', 'lazy-loading'],
    lessons: ['/bootstrapping/standalone-vs-ngmodule'],
  },
  {
    slug: 'two-way-binding',
    term: 'Two-way binding',
    short:
      'Keeping a value in sync in both directions with `[( )]`, the "banana in a box". `[(ngModel)]` is the classic example.',
    example: { lang: 'angular-html', code: '<input [(ngModel)]="name" />' },
    related: ['property-binding', 'event-binding', 'data-binding'],
    lessons: ['/data-binding/two-way'],
  },
  {
    slug: 'type-inference',
    term: 'Type inference',
    short: "TypeScript working out a type by itself from the value, so we don't have to write it.",
    example: { lang: 'angular-ts', code: "let title = 'Angular'; // inferred as string" },
    related: ['typescript'],
    lessons: ['/typescript/basic-types'],
  },
  {
    slug: 'type-narrowing',
    term: 'Type narrowing',
    short:
      "TypeScript refining a broad type to a specific one inside a check, like `typeof value === 'string'`.",
    related: ['union-type', 'typescript'],
    lessons: ['/typescript/narrowing'],
  },
  {
    slug: 'typescript',
    term: 'TypeScript',
    short:
      'JavaScript with static types, made by Microsoft. It compiles to plain JavaScript, and Angular itself is written in it.',
    related: ['transpile', 'strict-mode', 'decorator', 'generics'],
    lessons: ['/typescript/why-typescript'],
  },
  {
    slug: 'union-type',
    term: 'Union type',
    short:
      "A type that can be one of several types, written with `|`, like `string | number` or `'sm' | 'md' | 'lg'`.",
    related: ['type-narrowing', 'typescript'],
    lessons: ['/typescript/union-intersection'],
  },
  {
    slug: 'view-container-ref',
    term: 'ViewContainerRef',
    short:
      'A place in the DOM where views can be added and removed from code, with `createEmbeddedView()` and `clear()`.',
    related: ['template-ref', 'structural-directive'],
    lessons: ['/directives/custom-structural'],
  },
  {
    slug: 'view-encapsulation',
    term: 'View encapsulation',
    short:
      "How Angular keeps a component's styles inside that component: `Emulated` (the default), `None` or `ShadowDom`.",
    related: ['shadow-dom', 'component', 'host-element'],
    lessons: ['/components/view-encapsulation'],
  },
  {
    slug: 'zone-js',
    term: 'Zone.js',
    short:
      'A library that patched browser async APIs (timers, events, HTTP) so Angular knew when to run change detection. New apps no longer use it.',
    body: 'Since v21, new apps are zoneless by default. Older apps can keep Zone.js with `provideZoneChangeDetection()`.',
    related: ['zoneless', 'change-detection'],
    lessons: ['/signals-basics/signal-vs-property'],
  },
  {
    slug: 'zoneless',
    term: 'Zoneless',
    short:
      'Running Angular without Zone.js. Angular updates the screen when signals change, events fire or `markForCheck()` is called. The default for new apps since v21.',
    related: ['zone-js', 'signal', 'change-detection', 'onpush'],
    lessons: ['/signals-basics/signal-vs-property', '/signals-basics/what-is-a-signal'],
  },
];

/** Glossary URL for a term slug. */
export function glossaryUrl(slug: string): string {
  return `/glossary/${slug}`;
}

export function findTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((entry) => entry.slug === slug);
}
