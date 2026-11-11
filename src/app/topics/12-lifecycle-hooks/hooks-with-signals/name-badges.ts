import { Component, computed, inject, input, Input, OnChanges } from '@angular/core';
import { RunCounter } from '@shared/utils/run-counter';

/** OLD: decorator inputs, and ngOnChanges builds the full name. */
@Component({
  selector: 'app-name-old',
  styleUrl: './name-badges.scss',
  template: `<p [class]="theme">{{ fullName }}</p>`,
})
export class NameOld implements OnChanges {
  private readonly runs = inject(RunCounter);
  @Input() first = '';
  @Input() last = '';
  @Input() theme = 'light';
  protected fullName = '';

  // Runs when ANY input changes, so a new theme rebuilds the name too
  ngOnChanges(): void {
    this.runs.add('ngOnChanges');
    this.fullName = `${this.first} ${this.last}`;
  }
}

/** NEW: signal inputs, and computed() builds the full name. */
@Component({
  selector: 'app-name-new',
  styleUrl: './name-badges.scss',
  template: `<p [class]="theme()">{{ fullName() }}</p>`,
})
export class NameNew {
  private readonly runs = inject(RunCounter);
  readonly first = input('');
  readonly last = input('');
  readonly theme = input('light');

  // Runs only when first or last changes, the two signals it reads
  protected readonly fullName = computed(() => {
    this.runs.add('computed');
    return `${this.first()} ${this.last()}`;
  });
}
