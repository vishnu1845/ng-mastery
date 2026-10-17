import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_LINKS } from '@core/app-links';

/** What this project is and how it is built. Written for recruiters and fellow developers. */
@Component({
  imports: [RouterLink],
  selector: 'app-about',
  styleUrl: './about.scss',
  templateUrl: './about.html',
})
export default class About {
  protected readonly links = APP_LINKS;

  protected readonly highlights = [
    {
      title: 'One registry drives everything',
      text: 'Routes, sidebar, search, previous/next links and the home map are all generated from a single list of 52 topics. Adding a lesson is one folder plus one entry.',
    },
    {
      title: 'The code you read is the code that runs',
      text: 'The Code tab loads the real source files, copied as static assets at build time. Nothing is pasted twice.',
    },
    {
      title: 'Modern Angular only',
      text: 'Angular 22 defaults: standalone components, signals, zoneless change detection and OnPush. Services use the new @Service() decorator.',
    },
    {
      title: 'Prerendered and hydrated',
      text: 'Every lesson page is rendered to static HTML at build time, then hydrated in the browser. It loads fast and can be hosted anywhere.',
    },
    {
      title: 'No backend needed',
      text: 'A mock API runs as an HTTP interceptor with real latency, so API demos (and forced errors) work on the deployed site too.',
    },
    {
      title: 'Small, lazy lessons',
      text: 'Each lesson is its own lazy-loaded component, usually under 100 lines. Heavy tools like the code highlighter load only when you open the Code tab.',
    },
  ];
}
