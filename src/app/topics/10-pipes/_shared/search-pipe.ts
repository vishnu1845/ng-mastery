import { inject, Pipe, PipeTransform } from '@angular/core';
import { RunCounter } from './run-counter';

export interface Person {
  id: number;
  name: string;
}

/** Keeps the people whose name contains the search text. Pure, like every pipe by default. */
@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  private readonly counter = inject(RunCounter, { optional: true });

  transform(people: Person[], term: string): Person[] {
    this.counter?.add('search');
    return filterPeople(people, term);
  }
}

// Always returns a new array, like any filter
export function filterPeople(people: Person[], term: string): Person[] {
  const text = term.trim().toLowerCase();
  return people.filter((person) => person.name.toLowerCase().includes(text));
}
