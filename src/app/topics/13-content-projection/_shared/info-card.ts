import { Component, input } from '@angular/core';

/** A card that shows whatever the parent puts between its tags. */
@Component({
  selector: 'app-info-card',
  styleUrl: './boxes.scss',
  template: `
    <p class="own">{{ label() }}</p>
    <div class="body">
      <ng-content>Nothing was passed in.</ng-content>
    </div>
  `,
})
export class InfoCard {
  readonly label = input('Card');
}
