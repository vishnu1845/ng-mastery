import { afterNextRender, Component, ElementRef, signal, viewChild } from '@angular/core';

interface TextSnapshot {
  attribute: string | null;
  property: string;
  defaultValue: string;
}

type Action = 'start' | 'typed' | 'property' | 'attribute' | 'reset';

// NAMES THAT DON'T MATCH
const NAME_PAIRS = [
  { attribute: 'class', property: 'className' },
  { attribute: 'for', property: 'htmlFor' },
  { attribute: 'tabindex', property: 'tabIndex' },
  { attribute: 'readonly', property: 'readOnly' },
  { attribute: 'colspan', property: 'colSpan' },
];

/** Plain browser behaviour, no Angular magic: the attribute is the start value, the property is now. */
@Component({
  selector: 'app-property-vs-attribute-demo',
  styleUrl: './property-vs-attribute-demo.scss',
  templateUrl: './property-vs-attribute-demo.html',
})
export default class PropertyVsAttributeDemo {
  private readonly form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  private readonly cityInput = viewChild.required<ElementRef<HTMLInputElement>>('city');
  private readonly agreeBox = viewChild.required<ElementRef<HTMLInputElement>>('agree');

  protected readonly namePairs = NAME_PAIRS;

  protected readonly text = signal<TextSnapshot | null>(null);
  protected readonly lastAction = signal<Action>('start');
  protected readonly box = signal({ attribute: true, property: true });

  constructor() {
    afterNextRender(() => {
      this.readText('start');
      this.readBox();
    });
  }

  // TEXT INPUT
  protected setProperty(): void {
    this.cityInput().nativeElement.value = 'Mumbai';
    this.readText('property');
  }

  protected setAttribute(): void {
    this.cityInput().nativeElement.setAttribute('value', 'Delhi');
    this.readText('attribute');
  }

  // form.reset() puts every field back to what its attribute says
  protected reset(): void {
    this.cityInput().nativeElement.setAttribute('value', 'Pune');
    this.form().nativeElement.reset();
    this.readText('reset');
    this.readBox();
  }

  protected readText(action: Action): void {
    const input = this.cityInput().nativeElement;
    this.lastAction.set(action);
    this.text.set({
      attribute: input.getAttribute('value'),
      property: input.value,
      defaultValue: input.defaultValue,
    });
  }

  // CHECKBOX
  protected readBox(): void {
    const box = this.agreeBox().nativeElement;
    this.box.set({ attribute: box.hasAttribute('checked'), property: box.checked });
  }
}
