import { JsonPipe } from '@angular/common';
import { Component, signal, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Collapse } from './collapse';

/** Template references that point at a directive instance instead of an element. */
@Component({
  selector: 'app-export-as-demo',
  imports: [Collapse, FormsModule, JsonPipe],
  styleUrl: './export-as-demo.scss',
  templateUrl: './export-as-demo.html',
})
export default class ExportAsDemo {
  // In the class, we get the same directive instances with a query
  private readonly panels = viewChildren(Collapse);

  protected readonly faqs = [
    {
      question: 'What does exportAs do?',
      answer: 'It gives a directive a name, so a template reference can point at the directive.',
    },
    {
      question: 'What do we get without it?',
      answer: 'A plain #ref on an element gives the DOM element, not the directive on it.',
    },
    {
      question: 'Where have we used it already?',
      answer: 'With #name="ngModel" in forms. NgModel exports itself under the name ngModel.',
    },
  ];

  protected readonly email = signal('');

  protected setAll(open: boolean): void {
    this.panels().forEach((panel) => panel.open.set(open));
  }
}
