import { Component } from '@angular/core';
import { OwnTally, SharedTally } from './tallies';

/** One line of metadata, `providers: [CounterStore]`, changes who shares what. */
@Component({
  imports: [SharedTally, OwnTally],
  selector: 'app-metadata-demo',
  styleUrl: './metadata-demo.scss',
  templateUrl: './metadata-demo.html',
})
export default class MetadataDemo {
  protected readonly slots = [1, 2, 3];
}
