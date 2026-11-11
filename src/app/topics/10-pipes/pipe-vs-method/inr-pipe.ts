import { inject, Pipe, PipeTransform } from '@angular/core';
import { RunCounter } from '../_shared/run-counter';

const RUPEES = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatInr(amount: number): string {
  return RUPEES.format(amount);
}

/** Formats a number as rupees with Indian digit grouping: `{{ 125000 | inr }}` is ₹1,25,000. */
@Pipe({ name: 'inr' })
export class InrPipe implements PipeTransform {
  private readonly counter = inject(RunCounter, { optional: true });

  transform(amount: number): string {
    this.counter?.add('pipe');
    return formatInr(amount);
  }
}
