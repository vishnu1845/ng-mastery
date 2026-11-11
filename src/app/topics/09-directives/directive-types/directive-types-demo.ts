import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { tidyHtml, watchChanges, withoutScoping } from '@shared/utils/dom-watch';
import { Initials, Tint, Unless } from './three-types';

/** One card that uses all three kinds of directive, with the real HTML each one produces. */
@Component({
  selector: 'app-directive-types-demo',
  imports: [Initials, Tint, Unless],
  styleUrl: './directive-types-demo.scss',
  templateUrl: './directive-types-demo.html',
})
export default class DirectiveTypesDemo {
  private readonly card = viewChild.required<ElementRef<HTMLElement>>('card');

  // CONTROLS
  protected readonly name = signal('Asha Kulkarni');
  protected readonly tint = signal('#7c3aed55');
  protected readonly soldOut = signal(false);

  protected readonly tints = [
    { label: 'Violet', value: '#7c3aed55' },
    { label: 'Teal', value: '#0d948855' },
    { label: 'Amber', value: '#d9770655' },
  ];

  // THE REAL HTML OF EACH PART
  protected readonly componentHtml = signal('');
  protected readonly attributeHtml = signal('');
  protected readonly structuralHtml = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const card = this.card().nativeElement;
      const read = () => {
        this.componentHtml.set(html(card.querySelector('app-initials')));
        this.attributeHtml.set(html(card.querySelector('.course')));
        this.structuralHtml.set(html(card.querySelector('.buy')));
      };
      read();
      destroyRef.onDestroy(watchChanges(card, read));
    });
  }
}

function html(element: Element | null): string {
  return element ? tidyHtml(withoutScoping(element.outerHTML)) : '(not in the DOM)';
}
