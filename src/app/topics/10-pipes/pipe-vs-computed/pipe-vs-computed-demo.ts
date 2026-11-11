import { Component, computed, inject, signal } from '@angular/core';
import { RunCount } from '../_shared/run-count';
import { RunCounter } from '../_shared/run-counter';
import { filterPeople, Person, SearchPipe } from '../_shared/search-pipe';

const PEOPLE: Person[] = [
  'Mikasa',
  'Levi',
  'Hinata',
  'Naruto',
  'Nezuko',
  'Goku',
  'Asuna',
  'Luffy',
].map((name, index) => ({ id: index + 1, name }));

/** One search box feeding a pipe and a computed, each used in two places. */
@Component({
  selector: 'app-pipe-vs-computed-demo',
  imports: [SearchPipe, RunCount],
  providers: [RunCounter],
  styleUrl: './pipe-vs-computed-demo.scss',
  templateUrl: './pipe-vs-computed-demo.html',
})
export default class PipeVsComputedDemo {
  private readonly counter = inject(RunCounter);

  protected readonly people = signal(PEOPLE);
  protected readonly term = signal('');
  protected readonly invited = signal('');

  // COMPUTED: one cached result, shared by the template and the class
  protected readonly matches = computed(() => {
    this.counter.add('computed');
    return filterPeople(this.people(), this.term());
  });

  // The class can use the result too. A pipe's result lives only in the template.
  protected invite(): void {
    const names = this.matches().map((person) => person.name);
    this.invited.set(names.length ? `Invited ${names.join(', ')}.` : 'Nobody to invite.');
  }
}
