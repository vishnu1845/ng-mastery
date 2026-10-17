import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-not-found',
  styles: `
    :host {
      display: grid;
      gap: var(--space-4);
      justify-items: start;
      max-width: 36rem;
      padding-top: var(--space-7);
    }

    p {
      color: var(--text-muted);
      font-size: var(--fs-md);
    }
  `,
  template: `
    <h1>This page doesn't exist</h1>
    <p>
      The link may be old, or the lesson isn't live yet. Open the syllabus to see what's ready, or
      press <kbd>Ctrl</kbd> <kbd>K</kbd> to search.
    </p>
    <a class="btn btn-primary" routerLink="/">Open the syllabus</a>
  `,
})
export default class NotFound {}
