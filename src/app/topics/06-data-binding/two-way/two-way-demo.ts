import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QtyStepper } from './qty-stepper';

/** Three inputs on the same signal: banana in a box, the same thing written out, and one-way only. */
@Component({
  imports: [FormsModule, QtyStepper],
  selector: 'app-two-way-demo',
  styleUrl: './two-way-demo.scss',
  templateUrl: './two-way-demo.html',
})
export default class TwoWayDemo {
  // COMPONENT STATE
  protected readonly city = signal('Pune');
  protected readonly qty = signal(2);

  protected readonly modelChanges = signal(0);

  // The long form of [(ngModel)]: we write the "send it back" part ourselves
  protected onModelChange(value: string): void {
    this.city.set(value);
    this.modelChanges.update((count) => count + 1);
  }
}
