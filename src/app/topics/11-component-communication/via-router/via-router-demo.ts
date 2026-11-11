import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

/** A tiny two-page app inside the lesson. Its pages are this lesson's child routes. */
@Component({
  selector: 'app-via-router-demo',
  imports: [RouterOutlet],
  styleUrl: './via-router-demo.scss',
  templateUrl: './via-router-demo.html',
})
export default class ViaRouterDemo {
  private readonly router = inject(Router);

  // The address bar, so the reader sees which part of the URL carries what
  protected readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );
}
