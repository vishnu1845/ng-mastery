import { Component, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export interface Person {
  name: string;
  team: string;
}

/** What each row's template receives. */
export interface RowContext {
  $implicit: Person;
  index: number;
}

/**
 * The list owns the loop. The parent decides how one row looks, by passing a template in
 * like any other input.
 */
@Component({
  selector: 'app-people-list',
  imports: [NgTemplateOutlet],
  styleUrl: '../_shared/boxes.scss',
  template: `
    @for (person of people(); track person.name; let i = $index) {
      <ng-container
        [ngTemplateOutlet]="row()"
        [ngTemplateOutletContext]="{ $implicit: person, index: i }"
      />
    }
  `,
})
export class PeopleList {
  readonly people = input.required<Person[]>();
  readonly row = input.required<TemplateRef<RowContext>>();
}
