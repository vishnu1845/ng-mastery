import { Component, computed, contentChildren, inject, input, signal } from '@angular/core';

/** One tab. It asks its Tabs parent (through DI) whether it is the active one. */
@Component({
  selector: 'app-tab',
  template: `
    @if (active()) {
      <ng-content />
    }
  `,
})
export class Tab {
  private readonly tabs = inject(Tabs);
  readonly label = input.required<string>();
  protected readonly active = computed(() => this.tabs.current() === this);
}

/** Builds its header buttons from the <app-tab> elements the parent put inside it. */
@Component({
  selector: 'app-tabs',
  styleUrl: './tabs.scss',
  template: `
    <div class="tablist" role="tablist">
      @for (tab of tabs(); track tab) {
        <button
          type="button"
          role="tab"
          [attr.aria-selected]="tab === current()"
          (click)="chosen.set(tab)"
        >
          {{ tab.label() }}
        </button>
      }
    </div>
    <div class="panel" role="tabpanel">
      <ng-content />
    </div>
    <p class="found">contentChildren found {{ tabs().length }} tabs</p>
  `,
})
export class Tabs {
  /** DEMO ONLY: switches between the two queries below. A real component picks one. */
  readonly deep = input(false);

  private readonly direct = contentChildren(Tab); // descendants: false, the default
  private readonly nested = contentChildren(Tab, { descendants: true });
  protected readonly tabs = computed(() => (this.deep() ? this.nested() : this.direct()));

  protected readonly chosen = signal<Tab | null>(null);
  readonly current = computed(() => {
    const chosen = this.chosen();
    return chosen && this.tabs().includes(chosen) ? chosen : this.tabs()[0];
  });
}
