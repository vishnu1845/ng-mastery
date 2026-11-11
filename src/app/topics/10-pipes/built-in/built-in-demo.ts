import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  KeyValuePipe,
  LowerCasePipe,
  PercentPipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, signal } from '@angular/core';

/** Every everyday built-in pipe on values we can edit, next to the untouched original. */
@Component({
  selector: 'app-built-in-demo',
  imports: [
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
    JsonPipe,
    SlicePipe,
    KeyValuePipe,
  ],
  styleUrl: './built-in-demo.scss',
  templateUrl: './built-in-demo.html',
})
export default class BuiltInDemo {
  // THE ORIGINAL VALUES: pipes never change these
  protected readonly name = signal('mikasa ackerman');
  protected readonly amount = signal(1234.567);
  protected readonly joined = new Date('2026-06-12T12:00:00Z');
  protected readonly skills = ['Signals', 'Routing', 'Forms', 'RxJS', 'Testing'];
  protected readonly marks = { typescript: 82, angular: 91 };

  protected setAmount(text: string): void {
    const amount = Number(text);
    if (text !== '' && !Number.isNaN(amount)) this.amount.set(amount);
  }
}
