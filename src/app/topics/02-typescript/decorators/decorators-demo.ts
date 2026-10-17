import { Component, signal } from '@angular/core';
import { callLog, logCall } from './log-call';

// A PLAIN CLASS: its methods don't know anything about logging
class PriceCalculator {
  @logCall
  withTax(price: number): number {
    return Math.round(price * 1.18);
  }

  @logCall
  withDiscount(price: number): number {
    return Math.round(price * 0.9);
  }
}

interface DecoratorSwap {
  decorator: string;
  today: string;
}

// ANGULAR TODAY: most property/parameter decorators now have function versions
const SWAPS: DecoratorSwap[] = [
  { decorator: '@Input()', today: 'input()' },
  { decorator: '@Output()', today: 'output()' },
  { decorator: '@ViewChild()', today: 'viewChild()' },
  { decorator: 'constructor(private http: HttpClient)', today: 'inject(HttpClient)' },
  { decorator: '@Component() / @Directive() / @Pipe()', today: 'still decorators' },
];

/** A custom method decorator in action, and how Angular decorators map to modern APIs. */
@Component({
  selector: 'app-decorators-demo',
  styleUrl: './decorators-demo.scss',
  templateUrl: './decorators-demo.html',
})
export default class DecoratorsDemo {
  private readonly calculator = new PriceCalculator();

  protected readonly swaps = SWAPS;
  protected readonly price = signal(1000);
  protected readonly log = callLog.asReadonly();

  protected withTax(): void {
    this.calculator.withTax(this.price());
  }

  protected withDiscount(): void {
    this.calculator.withDiscount(this.price());
  }

  protected clearLog(): void {
    callLog.set([]);
  }
}
