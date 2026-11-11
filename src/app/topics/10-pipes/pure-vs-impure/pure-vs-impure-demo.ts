import { Component, signal } from '@angular/core';
import { RunCount } from '../_shared/run-count';
import { RunCounter } from '../_shared/run-counter';
import { Person, SearchPipe } from '../_shared/search-pipe';
import { SearchImpurePipe } from './search-impure-pipe';

const TEAM: Person[] = [
  { id: 1, name: 'Mikasa' },
  { id: 2, name: 'Levi' },
  { id: 3, name: 'Hinata' },
];
const MORE = ['Naruto', 'Nezuko', 'Goku', 'Asuna'];

/** One list through a pure and an impure pipe, changed by mutation and by a new array. */
@Component({
  selector: 'app-pure-vs-impure-demo',
  imports: [SearchPipe, SearchImpurePipe, RunCount],
  providers: [RunCounter],
  styleUrl: './pure-vs-impure-demo.scss',
  templateUrl: './pure-vs-impure-demo.html',
})
export default class PureVsImpureDemo {
  private nextId = TEAM.length + 1;

  // A plain property, so we can mutate the array the way old code does
  protected people = [...TEAM];
  protected readonly term = signal('');
  protected readonly clicks = signal(0);

  // ❌ Same array, one more item inside. The reference does not change.
  protected addByPush(): void {
    this.people.push(this.newPerson());
  }

  // ✅ A new array. The reference changes.
  protected addBySpread(): void {
    this.people = [...this.people, this.newPerson()];
  }

  protected reset(): void {
    this.people = [...TEAM];
    this.nextId = TEAM.length + 1;
  }

  private newPerson(): Person {
    const id = this.nextId++;
    return { id, name: MORE[(id - TEAM.length - 1) % MORE.length] };
  }
}
