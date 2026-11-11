import { afterNextRender, Component, inject, signal } from '@angular/core';
import { MomentReport } from '../_shared/moment-report';
import { Moment, ReadyCheck } from './ready-check';

/** Creates a card and shows what its constructor, ngOnInit and ngAfterViewInit could each use. */
@Component({
  selector: 'app-constructor-vs-oninit-demo',
  imports: [ReadyCheck],
  providers: [MomentReport],
  styleUrl: './constructor-vs-oninit-demo.scss',
  templateUrl: './constructor-vs-oninit-demo.html',
})
export default class ConstructorVsOnInitDemo {
  protected readonly report = inject(MomentReport);
  protected readonly names = ['Levi', 'Mikasa', 'Hinata'];
  protected readonly moments: Moment[] = ['constructor', 'ngOnInit', 'ngAfterViewInit'];
  protected readonly checks = ['signal input', '@Input()', 'inject()', 'effect()', 'template'];

  protected readonly name = signal('Levi');
  // A card with a new id is a new component, so every check runs again
  protected readonly cards = signal<{ id: number }[]>([]);

  constructor() {
    // Created in the browser. A card the server rendered would reuse that HTML when it hydrates
    afterNextRender(() => this.create('Levi'));
  }

  protected create(name: string): void {
    this.report.clear();
    this.name.set(name);
    this.cards.update(([card]) => [{ id: (card?.id ?? 0) + 1 }]);
  }
}
