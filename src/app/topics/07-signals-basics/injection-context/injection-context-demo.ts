import { Component, DestroyRef, effect, inject, Injector, signal } from '@angular/core';
import { BeatChild } from './beat-child';
import { EffectLab } from './effect-lab';

interface Attempt {
  ok: boolean;
  text: string;
}

// The dev-mode text of NG0203. Production builds only throw the code.
const NG0203_MESSAGE =
  'effect() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`';

/** Where effect() works, where it throws, and what a leaked effect looks like. */
@Component({
  imports: [BeatChild],
  providers: [EffectLab],
  selector: 'app-injection-context-demo',
  styleUrl: './injection-context-demo.scss',
  templateUrl: './injection-context-demo.html',
})
export default class InjectionContextDemo {
  private readonly injector = inject(Injector);
  protected readonly lab = inject(EffectLab);

  protected readonly ng0203Message = NG0203_MESSAGE;
  protected readonly withInjectorLabel = 'effect(fn, { injector })';
  protected readonly showChild = signal(true);
  protected readonly attempt = signal<Attempt | null>(null);

  // ✅ FIELD INITIALIZER: an injection context, so this just works
  private readonly fieldEffect = effect(() => {
    this.lab.write('demo effect', `saw beat ${this.lab.beats()}`, 'ok');
  });

  constructor() {
    // Clean up anything we leaked on purpose when you leave this page
    inject(DestroyRef).onDestroy(() => this.lab.destroyLeaks());
  }

  // ❌ A click handler is not an injection context
  protected createInHandler(): void {
    try {
      effect(() => this.lab.beats());
      this.attempt.set({ ok: true, text: 'Created (unexpected)' });
    } catch (error) {
      const code = String((error as Error).message).match(/NG0\d+/)?.[0] ?? 'Error';
      this.attempt.set({ ok: false, text: `${code} thrown` });
    }
  }

  // ✅ Same place, but we hand it the component's injector
  protected createWithInjector(): void {
    effect(() => this.lab.write('click effect', `saw beat ${this.lab.beats()}`, 'ok'), {
      injector: this.injector,
    });
    this.attempt.set({ ok: true, text: 'Created with { injector }. It logs on every beat now.' });
  }
}
