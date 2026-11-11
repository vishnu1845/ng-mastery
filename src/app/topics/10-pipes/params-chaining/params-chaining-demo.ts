import { CurrencyPipe, DatePipe, DecimalPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

/** A number format we build by hand, then pipes chained in different orders. */
@Component({
  selector: 'app-params-chaining-demo',
  imports: [DecimalPipe, CurrencyPipe, DatePipe, SlicePipe, UpperCasePipe],
  styleUrl: './params-chaining-demo.scss',
  templateUrl: './params-chaining-demo.html',
})
export default class ParamsChainingDemo {
  protected readonly value = 1234.5678;
  protected readonly released = new Date('2026-06-12T12:00:00Z');
  protected readonly title = 'angular signals in practice';

  // NUMBER FORMAT: minIntegerDigits.minFractionDigits-maxFractionDigits
  protected readonly minInteger = signal(1);
  protected readonly minFraction = signal(2);
  protected readonly maxFraction = signal(2);
  protected readonly digits = computed(
    () => `${this.minInteger()}.${this.minFraction()}-${this.maxFraction()}`,
  );

  // CURRENCY: code, then how to show it
  protected readonly codes = ['INR', 'USD', 'EUR'];
  protected readonly displays = ['symbol', 'code'] as const;
  protected readonly code = signal('INR');
  protected readonly display = signal<'symbol' | 'code'>('symbol');

  // PRECEDENCE
  protected readonly isPro = signal(false);

  protected setMinFraction(value: number): void {
    this.minFraction.set(value);
    this.maxFraction.update((max) => Math.max(max, value));
  }

  protected setMaxFraction(value: number): void {
    this.maxFraction.set(value);
    this.minFraction.update((min) => Math.min(min, value));
  }
}
