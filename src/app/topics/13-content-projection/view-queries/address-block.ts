import { Component } from '@angular/core';

/** A child component that uses the same #field name inside its own template. */
@Component({
  selector: 'app-address-block',
  styleUrl: './view-queries.scss',
  template: `
    <p class="own">&lt;app-address-block&gt;'s own template</p>
    <input #field placeholder="City (inside a child component)" aria-label="City" />
  `,
})
export class AddressBlock {}
