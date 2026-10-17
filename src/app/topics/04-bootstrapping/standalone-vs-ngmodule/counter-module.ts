import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// THE LEGACY WAY: a component that can't live on its own...
@Component({
  selector: 'app-module-counter',
  // Since v19 components are standalone unless we say otherwise. This lesson shows the old way.
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  template: `<button type="button" (click)="count = count + 1">
    Clicked {{ count }} {{ count === 1 ? 'time' : 'times' }}
  </button>`,
})
export class ModuleCounter {
  count = 0;
}

// ...so a module has to declare it, import the browser setup and name the root component
@NgModule({
  declarations: [ModuleCounter],
  imports: [BrowserModule],
  bootstrap: [ModuleCounter],
})
export class CounterModule {}
