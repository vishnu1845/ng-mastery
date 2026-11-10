import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { watchHtml, watchNodes, withoutScoping } from '@shared/utils/dom-watch';

interface User {
  name: string;
  plan: 'free' | 'pro';
}

/** One @if chain with its live DOM, then @if against [hidden] on the same note box. */
@Component({
  selector: 'app-if-else-demo',
  styleUrl: './if-else-demo.scss',
  templateUrl: './if-else-demo.html',
})
export default class IfElseDemo {
  private readonly account = viewChild.required<ElementRef<HTMLElement>>('account');
  private readonly ifSide = viewChild.required<ElementRef<HTMLElement>>('ifSide');
  private readonly hiddenSide = viewChild.required<ElementRef<HTMLElement>>('hiddenSide');
  private timer?: ReturnType<typeof setTimeout>;

  // ACCOUNT STATE
  protected readonly loading = signal(false);
  protected readonly user = signal<User | null>(null);
  protected readonly accountHtml = signal('');

  // @IF vs [HIDDEN]
  protected readonly open = signal(true);
  protected readonly ifRebuilt = signal(0);
  protected readonly hiddenRebuilt = signal(0);

  protected readonly ifLabel = '@if (open()) { <label>…</label> }';
  protected readonly hiddenLabel = '<label [hidden]="!open()">…</label>';

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearTimeout(this.timer));

    afterNextRender(() => {
      const stops = [
        watchHtml(this.account().nativeElement, (html) =>
          this.accountHtml.set(withoutScoping(html)),
        ),
        watchNodes(this.ifSide().nativeElement, ({ created }) =>
          this.ifRebuilt.update((count) => count + created),
        ),
        watchNodes(this.hiddenSide().nativeElement, ({ created }) =>
          this.hiddenRebuilt.update((count) => count + created),
        ),
      ];
      destroyRef.onDestroy(() => stops.forEach((stop) => stop()));
    });
  }

  // A fake login that takes a moment, so the loading branch is visible
  protected logIn(): void {
    this.loading.set(true);
    this.timer = setTimeout(() => {
      this.user.set({ name: 'Asha', plan: 'free' });
      this.loading.set(false);
    }, 900);
  }

  protected upgrade(): void {
    this.user.update((user) => user && { ...user, plan: 'pro' });
  }

  protected logOut(): void {
    this.user.set(null);
  }
}
