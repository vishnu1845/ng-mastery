import {
  Component,
  HostAttributeToken,
  inject,
  input,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HookLog } from '../_shared/hook-log';

export interface User {
  name: string;
}

/** A card with two signal inputs and one decorator input. ngOnChanges logs every call. */
@Component({
  selector: 'app-profile-card',
  styleUrl: './profile-card.scss',
  template: `
    <p class="title">{{ who }}</p>
    <p>
      <strong>{{ user().name }}</strong> · role {{ role() }} · theme {{ theme }}
    </p>
  `,
})
export class ProfileCard implements OnChanges {
  private readonly log = inject(HookLog);
  protected readonly who = inject(new HostAttributeToken('data-who'));

  readonly user = input<User>({ name: 'nobody' });
  readonly role = input('viewer');
  @Input() theme = 'light';

  // SimpleChanges<ProfileCard> types every key; signal inputs arrive as plain values
  ngOnChanges(changes: SimpleChanges<ProfileCard>): void {
    const detail = Object.entries(changes)
      .map(([name, change]) =>
        change!.firstChange
          ? `${name}: ${show(change!.currentValue)} (first)`
          : `${name}: ${show(change!.previousValue)} → ${show(change!.currentValue)}`,
      )
      .join(', ');
    this.log.record(this.who, 'ngOnChanges', detail);
  }
}

function show(value: unknown): string {
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}
