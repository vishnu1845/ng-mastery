import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { flash, watchChanges } from '@shared/utils/dom-watch';

const NEW_POSTS = ['Signals finally clicked', 'Zoneless in prod 🚀', 'OnPush is the default now'];
const NAMES = ['Vishnu Bandgar', 'Arjun Mehta'];

/** Change one signal and see exactly which DOM nodes Angular wrote to. */
@Component({
  selector: 'app-signals-in-templates-demo',
  styleUrl: './signals-in-templates-demo.scss',
  templateUrl: './signals-in-templates-demo.html',
})
export default class SignalsInTemplatesDemo {
  private readonly card = viewChild.required<ElementRef<HTMLElement>>('card');
  private postIndex = 0;

  // STATE THE TEMPLATE READS
  protected readonly name = signal(NAMES[0]);
  protected readonly followers = signal(128);
  protected readonly online = signal(true);
  protected readonly posts = signal(['Shipped Topic 06 🎉']);

  protected readonly forgotCall = '<p>{{ followers }}</p>   <!-- missing () -->';

  // WHAT ANGULAR WROTE TO, LAST TIME
  protected readonly written = signal<string[] | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const card = this.card().nativeElement;
      const stop = watchChanges(card, (changed) => {
        card.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
        changed.forEach(flash);
        this.written.set(changed.map(describe));
      });
      destroyRef.onDestroy(stop);
    });
  }

  protected follow(): void {
    this.followers.update((count) => count + 1);
  }

  protected toggleOnline(): void {
    this.online.update((online) => !online);
  }

  protected rename(): void {
    this.name.update((name) => (name === NAMES[0] ? NAMES[1] : NAMES[0]));
  }

  protected addPost(): void {
    const post = NEW_POSTS[this.postIndex++ % NEW_POSTS.length];
    this.posts.update((posts) => [post, ...posts]);
  }
}

/** "<dd>" or "<span.status>", short enough to list. */
function describe(element: Element): string {
  const className = element.classList[0];
  return `<${element.tagName.toLowerCase()}${className ? '.' + className : ''}>`;
}
