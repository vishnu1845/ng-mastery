import { Component, input } from '@angular/core';
import { Logged } from '../_shared/logged';

// Three components that log every hook:
//   Parent  → its template has Child
//   Child   → shows Projected through <ng-content>
//   Projected → written by the Parent, projected into the Child

@Component({
  selector: 'app-lc-projected',
  styleUrl: './family.scss',
  template: `<p class="box projected"><strong>Projected</strong> passed into Child by Parent</p>`,
})
export class Projected extends Logged {
  protected readonly who = 'Projected';

  constructor() {
    super();
    this.log.record(this.who, 'constructor');
  }
}

@Component({
  selector: 'app-lc-child',
  styleUrl: './family.scss',
  template: `
    <div class="box child">
      <p><strong>Child</strong> value = {{ value() }}</p>
      <ng-content />
    </div>
  `,
})
export class Child extends Logged {
  protected readonly who = 'Child';
  readonly value = input(0);

  constructor() {
    super();
    this.log.record(this.who, 'constructor');
  }
}

@Component({
  selector: 'app-lc-parent',
  imports: [Child, Projected],
  styleUrl: './family.scss',
  template: `
    <div class="box parent">
      <p><strong>Parent</strong> value = {{ value() }}</p>
      <app-lc-child [value]="value()">
        <app-lc-projected />
      </app-lc-child>
    </div>
  `,
})
export class Parent extends Logged {
  protected readonly who = 'Parent';
  readonly value = input(0);

  constructor() {
    super();
    this.log.record(this.who, 'constructor');
  }
}
