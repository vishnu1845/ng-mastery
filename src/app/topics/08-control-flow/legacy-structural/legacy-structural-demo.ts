import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { watchNodes } from '@shared/utils/dom-watch';

type Plan = 'free' | 'pro' | 'team';

interface Todo {
  id: number;
  title: string;
}

const TODOS: Todo[] = [
  { id: 1, title: 'Read the notes' },
  { id: 2, title: 'Try the demo' },
  { id: 3, title: 'Say it out loud' },
  { id: 4, title: 'Mark as done' },
];

/** The same UI in legacy directives and in built-in blocks, then a reload that shows why track is required. */
@Component({
  selector: 'app-legacy-structural-demo',
  // Deprecated since v20. Imported here only to show the old syntax running.
  imports: [NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault],
  styleUrl: './legacy-structural-demo.scss',
  templateUrl: './legacy-structural-demo.html',
})
export default class LegacyStructuralDemo {
  private readonly plainList = viewChild.required<ElementRef<HTMLElement>>('plainList');
  private readonly trackByList = viewChild.required<ElementRef<HTMLElement>>('trackByList');
  private readonly forList = viewChild.required<ElementRef<HTMLElement>>('forList');

  // SAME UI, TWICE
  protected readonly loggedIn = signal(false);
  protected readonly plan = signal<Plan>('free');
  protected readonly plans: Plan[] = ['free', 'pro', 'team'];

  // RELOAD: same todos, new objects
  protected readonly todos = signal(TODOS);
  protected readonly reloads = signal(0);
  protected readonly plainRebuilt = signal(0);
  protected readonly trackByRebuilt = signal(0);
  protected readonly forRebuilt = signal(0);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stops = [
        watchNodes(this.plainList().nativeElement, ({ created }) =>
          this.plainRebuilt.update((count) => count + created),
        ),
        watchNodes(this.trackByList().nativeElement, ({ created }) =>
          this.trackByRebuilt.update((count) => count + created),
        ),
        watchNodes(this.forList().nativeElement, ({ created }) =>
          this.forRebuilt.update((count) => count + created),
        ),
      ];
      destroyRef.onDestroy(() => stops.forEach((stop) => stop()));
    });
  }

  protected reload(): void {
    this.reloads.update((count) => count + 1);
    this.todos.update((todos) => todos.map((todo) => ({ ...todo })));
  }

  // The old way to track: a method with this exact signature
  protected byId(index: number, todo: Todo): number {
    return todo.id;
  }
}
