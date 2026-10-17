import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  price: number;
}

// THE FOUR PARTS: this class (logic), product-card.html (template),
// product-card.scss (styles) and the metadata below that connects them
@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  host: { 'data-selector': 'app-product-card' },
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly added = output<Product>();
}
