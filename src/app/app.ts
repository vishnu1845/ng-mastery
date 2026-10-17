import { afterNextRender, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { markBoot } from '@core/boot/boot-marks';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  template: '<router-outlet />',
})
export class App {
  constructor() {
    // BOOT TIMELINE (shown live in Topic 04 → Execution flow)
    markBoot('app');
    afterNextRender(() => markBoot('render'));

    const navigation = inject(Router).events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        markBoot('route');
        navigation.unsubscribe();
      }
    });
  }
}
