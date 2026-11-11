import { Component, signal } from '@angular/core';
import { ProfileChip } from './profile-chip';

/** The same chip bound in different ways, each showing the value and type it really received. */
@Component({
  selector: 'app-input-options-demo',
  imports: [ProfileChip],
  styleUrl: './input-options-demo.scss',
  templateUrl: './input-options-demo.html',
})
export default class InputOptionsDemo {
  protected readonly showLifecycle = signal(false);

  // The parent's template, as the reader would write it. Kept in TS: a { in a template starts an ICU.
  protected readonly cases = [
    '<app-profile-chip name="Mikasa" />',
    '<app-profile-chip name="Levi" size="22" verified />',
    '<app-profile-chip name="Hinata" verified="false" label="Mentor" />',
  ];
  protected readonly lifecycleCase = '<app-profile-chip name="Naruto" size="22" />';
}
