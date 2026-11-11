export interface Channel {
  id: string;
  /** The situation, in the words a developer would use. */
  need: string;
  answer: string;
  why: string;
  code: string;
  lang: 'angular-ts' | 'angular-html';
  lesson: string;
}

/** Every common "how do these two components talk?" question, with its answer. */
export const CHANNELS: Channel[] = [
  {
    id: 'down',
    need: 'A parent sends data down to its child',
    answer: 'input()',
    why: 'The child declares what it accepts. The parent binds a value, and the child reads it as a signal.',
    code: `// child
product = input.required<Product>();

<!-- parent -->
<app-product-card [product]="item" />`,
    lang: 'angular-ts',
    lesson: 'input-output',
  },
  {
    id: 'up',
    need: 'A child tells its parent that something happened',
    answer: 'output()',
    why: 'The child emits an event with a value. The parent listens like a click, and $event is that value.',
    code: `// child
added = output<number>();
this.added.emit(this.qty());

<!-- parent -->
<app-product-card (added)="addToCart($event)" />`,
    lang: 'angular-ts',
    lesson: 'input-output',
  },
  {
    id: 'both',
    need: 'Parent and child keep one value in sync',
    answer: 'model() with [( )]',
    why: 'One model() is an input and an output together. The child can change it, and the parent sees the new value.',
    code: `// child
volume = model(50);

<!-- parent -->
<app-volume-knob [(volume)]="volume" />`,
    lang: 'angular-ts',
    lesson: 'model-two-way',
  },
  {
    id: 'call',
    need: 'A parent calls a child’s method or reads its state, in the template',
    answer: 'Template reference #ref',
    why: 'The reference is the child instance, so the template can call its public methods and read its signals.',
    code: `<app-player #player />
<button (click)="player.play()">Play</button>
<p>{{ player.position() }}s</p>`,
    lang: 'angular-html',
    lesson: 'template-ref',
  },
  {
    id: 'query',
    need: 'A parent needs a child, or all of them, in its class',
    answer: 'viewChild() / viewChildren()',
    why: 'A query gives the child instance as a signal, so computed() and the class can use it.',
    code: `questions = viewChildren(Question);
answered = computed(
  () => this.questions().filter((q) => q.answered()).length,
);`,
    lang: 'angular-ts',
    lesson: 'view-child',
  },
  {
    id: 'far',
    need: 'Siblings, or components far apart in the tree',
    answer: 'A shared service with signals',
    why: 'Both components inject the same service instance. One writes a signal, the other reads it.',
    code: `@Service()
export class Cart {
  readonly items = signal<Item[]>([]);
  readonly count = computed(() => this.items().length);
}`,
    lang: 'angular-ts',
    lesson: 'shared-service',
  },
  {
    id: 'pages',
    need: 'One page passes data to the next page',
    answer: 'The router: params, query params, state',
    why: 'The data travels in the URL (or in the navigation), so it also works for links, bookmarks and the back button.',
    code: `<a [routerLink]="['/orders', order.id]" [queryParams]="{ tab: 'items' }">
  Open
</a>

// target page, with withComponentInputBinding()
id = input.required<string>();`,
    lang: 'angular-ts',
    lesson: 'via-router',
  },
];
