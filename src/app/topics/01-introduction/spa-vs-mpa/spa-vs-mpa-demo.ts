import { Component } from '@angular/core';
import { MiniBrowser } from './mini-browser';

/** Two fake browsers side by side: the same shop as a multi-page app and as a single-page app. */
@Component({
  imports: [MiniBrowser],
  selector: 'app-spa-vs-mpa-demo',
  styleUrl: './spa-vs-mpa-demo.scss',
  templateUrl: './spa-vs-mpa-demo.html',
})
export default class SpaVsMpaDemo {}
