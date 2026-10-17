import { Component, signal } from '@angular/core';

// THE STANDALONE WAY: the component is enough. It would list its own imports here if it had any.
@Component({
  selector: 'app-standalone-counter',
  template: `<button type="button" (click)="count.update((n) => n + 1)">
    Clicked {{ count() }} {{ count() === 1 ? 'time' : 'times' }}
  </button>`,
})
export class StandaloneCounter {
  protected readonly count = signal(0);
}
