import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { watchChanges, withoutScoping } from '@shared/utils/dom-watch';

interface Speaker {
  id: number;
  name: string;
  talk: string;
}

const SPEAKERS: Omit<Speaker, 'id'>[] = [
  { name: 'Mikasa', talk: 'Signals in practice' },
  { name: 'Levi', talk: 'Zoneless at scale' },
  { name: 'Hinata', talk: 'Typed forms' },
  { name: 'Naruto', talk: 'Testing with Vitest' },
];

/** One <ng-template> stamped many times, with a host that leaves an element or leaves nothing. */
@Component({
  selector: 'app-ng-template-container-demo',
  imports: [NgTemplateOutlet],
  styleUrl: './ng-template-container-demo.scss',
  templateUrl: './ng-template-container-demo.html',
})
export default class NgTemplateContainerDemo {
  private readonly board = viewChild.required<ElementRef<HTMLElement>>('board');
  private nextId = 1;

  // STATE
  protected readonly host = signal<'container' | 'div'>('container');
  protected readonly cards = signal<Speaker[]>([]);
  protected readonly boardHtml = signal('');

  protected readonly hosts = [
    { id: 'container', label: '<ng-container>' },
    { id: 'div', label: '<div>' },
  ] as const;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const board = this.board().nativeElement;
      const show = () => this.boardHtml.set(readable(board.innerHTML));
      show();
      destroyRef.onDestroy(watchChanges(board, show));
    });
  }

  protected stamp(): void {
    const id = this.nextId++;
    this.cards.update((cards) => [...cards, { id, ...SPEAKERS[(id - 1) % SPEAKERS.length] }]);
  }

  protected clear(): void {
    this.cards.set([]);
  }
}

/** The HTML with Angular's comment markers kept, one element per line. */
function readable(html: string): string {
  return withoutScoping(html)
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .replace(/((?:<!--.*?-->)+|<\/article>|<div><\/div>)/g, '$1\n')
    .trim();
}
