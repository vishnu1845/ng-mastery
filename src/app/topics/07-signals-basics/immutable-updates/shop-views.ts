import { Component, computed, input } from '@angular/core';

export interface User {
  name: string;
  address: { city: string };
}

/** Gets the array through an input. A new array = an update; the same array = nothing. */
@Component({
  selector: 'app-item-list',
  template: `
    <p class="head">{{ count() }} {{ count() === 1 ? 'item' : 'items' }}</p>
    <ul class="items">
      @for (item of items(); track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  styleUrl: './shop-views.scss',
})
export class ItemList {
  readonly items = input.required<readonly string[]>();
  protected readonly count = computed(() => this.items().length);
}

/** Gets the user object through an input, and shows the nested city. */
@Component({
  selector: 'app-city-card',
  template: `
    <p class="head">{{ user().name }} lives in</p>
    <p class="city">{{ user().address.city }}</p>
  `,
  styleUrl: './shop-views.scss',
})
export class CityCard {
  readonly user = input.required<User>();
}
