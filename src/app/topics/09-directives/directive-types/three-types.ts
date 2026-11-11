import {
  Component,
  computed,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

// 1 COMPONENT: a directive with its own template
@Component({
  selector: 'app-initials',
  template: `<span>{{ initials() }}</span>`,
  styles: `
    :host {
      display: inline-grid;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: var(--radius-pill);
      background: var(--accent);
      color: var(--bg);
      font-weight: 600;
      place-items: center;
    }
  `,
})
export class Initials {
  readonly name = input.required<string>();

  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join(''),
  );
}

// 2 ATTRIBUTE DIRECTIVE: no template, changes the element it sits on
@Directive({
  selector: '[appTint]',
  host: { '[style.background-color]': 'color()' },
})
export class Tint {
  readonly color = input.required<string>({ alias: 'appTint' });
}

// 3 STRUCTURAL DIRECTIVE: adds or removes its element (the opposite of an if)
@Directive({ selector: '[appUnless]' })
export class Unless {
  private readonly template = inject(TemplateRef);
  private readonly container = inject(ViewContainerRef);

  readonly hidden = input.required<boolean>({ alias: 'appUnless' });

  constructor() {
    effect(() => {
      this.container.clear();
      if (!this.hidden()) this.container.createEmbeddedView(this.template);
    });
  }
}
