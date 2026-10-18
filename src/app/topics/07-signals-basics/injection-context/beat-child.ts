import { Component, DestroyRef, effect, EnvironmentInjector, inject } from '@angular/core';
import { EffectLab } from './effect-lab';

/** Creates two effects: one tied to this component, one tied to an injector that outlives it. */
@Component({
  selector: 'app-beat-child',
  template: `<p class="alive">Child component is alive. It created two effects.</p>`,
  styles: `
    .alive {
      margin: 0;
      padding: var(--space-3);
      border: 1px dashed var(--border-strong);
      border-radius: var(--radius-sm);
      font-size: var(--fs-sm);
    }
  `,
})
export class BeatChild {
  private readonly lab = inject(EffectLab);
  private alive = true;

  constructor() {
    inject(DestroyRef).onDestroy(() => (this.alive = false));

    // ✅ NORMAL: created in the constructor, destroyed together with this component
    effect(() => {
      this.lab.write('child effect', `saw beat ${this.lab.beats()}`, 'ok');
    });

    // ⚠️ LEAK: attached to the environment injector, which lives longer than this component
    const leaked = effect(
      () => {
        const beat = this.lab.beats();
        const note = this.alive ? '' : ', but the child is already destroyed';
        this.lab.write('leaky effect', `saw beat ${beat}${note}`, 'leak');
      },
      { injector: inject(EnvironmentInjector) },
    );
    this.lab.keepLeak(leaked);
  }
}
