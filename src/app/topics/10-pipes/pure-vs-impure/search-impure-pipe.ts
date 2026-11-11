import { inject, Pipe, PipeTransform } from '@angular/core';
import { RunCounter } from '../_shared/run-counter';
import { filterPeople, Person } from '../_shared/search-pipe';

/** The same search, marked impure: Angular runs it on every refresh of the view. */
@Pipe({ name: 'searchImpure', pure: false })
export class SearchImpurePipe implements PipeTransform {
  private readonly counter = inject(RunCounter, { optional: true });

  transform(people: Person[], term: string): Person[] {
    this.counter?.add('searchImpure');
    return filterPeople(people, term);
  }
}
