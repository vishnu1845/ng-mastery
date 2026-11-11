import { Component, signal } from '@angular/core';
import { RunCount } from '@shared/ui/run-count/run-count';
import { RunCounter } from '@shared/utils/run-counter';
import { NameNew, NameOld } from './name-badges';

const FIRST = ['Satoru', 'Monkey D.', 'Edward', 'Erza'];
const LAST = ['Gojo', 'Luffy', 'Elric', 'Scarlet'];

/** The same badge built with ngOnChanges and with computed(), and how often each rebuilds the name. */
@Component({
  selector: 'app-hooks-with-signals-demo',
  imports: [NameOld, NameNew, RunCount],
  providers: [RunCounter],
  styleUrl: './hooks-with-signals-demo.scss',
  templateUrl: './hooks-with-signals-demo.html',
})
export default class HooksWithSignalsDemo {
  private person = 0;
  protected readonly first = signal(FIRST[0]);
  protected readonly last = signal(LAST[0]);
  protected readonly theme = signal('light');

  protected nextPerson(): void {
    this.person = (this.person + 1) % FIRST.length;
    this.first.set(FIRST[this.person]);
    this.last.set(LAST[this.person]);
  }

  protected toggleTheme(): void {
    this.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }
}
