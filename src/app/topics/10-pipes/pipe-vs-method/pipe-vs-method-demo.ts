import { Component, inject, signal } from '@angular/core';
import { RunCount } from '@shared/ui/run-count/run-count';
import { RunCounter } from '@shared/utils/run-counter';
import { formatInr, InrPipe } from './inr-pipe';

interface Course {
  id: number;
  title: string;
  price: number;
}

/** The same prices formatted by a method and by a pure pipe, with a count of the real calls. */
@Component({
  selector: 'app-pipe-vs-method-demo',
  imports: [InrPipe, RunCount],
  providers: [RunCounter],
  styleUrl: './pipe-vs-method-demo.scss',
  templateUrl: './pipe-vs-method-demo.html',
})
export default class PipeVsMethodDemo {
  private readonly counter = inject(RunCounter);

  protected readonly courses = signal<Course[]>([
    { id: 1, title: 'Angular basics', price: 4999 },
    { id: 2, title: 'Signals in depth', price: 12500 },
    { id: 3, title: 'RxJS for humans', price: 8999 },
    { id: 4, title: 'Full mentorship', price: 125000 },
  ]);
  protected readonly likes = signal(0);

  // Called from the template, so Angular must call it again on every refresh
  protected format(price: number): string {
    this.counter.add('method');
    return formatInr(price);
  }

  protected raiseFirstPrice(): void {
    this.courses.update(([first, ...rest]) => [{ ...first, price: first.price + 500 }, ...rest]);
  }
}
