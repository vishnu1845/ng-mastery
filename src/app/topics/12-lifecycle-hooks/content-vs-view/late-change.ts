import { AfterViewInit, Component, signal } from '@angular/core';

/**
 * THE TRAP: changing a bound value in ngAfterViewInit, after Angular has already rendered it.
 * A plain property is not shown until something checks this view again.
 */
@Component({
  selector: 'app-late-plain',
  styleUrl: './content-vs-view.scss',
  template: `
    <p class="title">Plain property</p>
    <p>
      <strong>{{ message }}</strong>
    </p>
    <button type="button" class="btn-ghost" (click)="checkAgain()">Click inside this box</button>
  `,
})
export class LatePlain implements AfterViewInit {
  protected message = 'set in the class';

  ngAfterViewInit(): void {
    this.message = 'changed in ngAfterViewInit';
  }

  protected checkAgain(): void {
    // Nothing to do: any event inside this component checks its view again,
    // and the late value appears
  }
}

/** The same change with a signal: Angular is told about it and renders again. */
@Component({
  selector: 'app-late-signal',
  styleUrl: './content-vs-view.scss',
  template: `
    <p class="title">Signal</p>
    <p>
      <strong>{{ message() }}</strong>
    </p>
  `,
})
export class LateSignal implements AfterViewInit {
  protected readonly message = signal('set in the class');

  ngAfterViewInit(): void {
    this.message.set('changed in ngAfterViewInit');
  }
}
