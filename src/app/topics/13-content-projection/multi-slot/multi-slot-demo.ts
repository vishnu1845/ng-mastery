import { Component, signal } from '@angular/core';
import { Panel, StrictPanel } from '../_shared/panel';

/** One set of content, two panels: where each piece lands, and what happens without a default slot. */
@Component({
  selector: 'app-multi-slot-demo',
  imports: [Panel, StrictPanel],
  styleUrl: './multi-slot-demo.scss',
  templateUrl: './multi-slot-demo.html',
})
export default class MultiSlotDemo {
  protected readonly follows = signal(0);
}
