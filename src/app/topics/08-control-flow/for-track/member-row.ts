import { Component, input } from '@angular/core';

export interface Member {
  id: number;
  name: string;
  role: string;
}

/** One row of the team list. The checkbox keeps its tick in the DOM only, on purpose. */
@Component({
  selector: 'app-member-row',
  host: { role: 'listitem' },
  styleUrl: './member-row.scss',
  template: `
    <input type="checkbox" [attr.aria-label]="'Pick ' + member().name" />
    <span class="id mono">#{{ member().id }}</span>
    <span class="name">{{ member().name }}</span>
    <span class="role">{{ member().role }}</span>
  `,
})
export class MemberRow {
  readonly member = input.required<Member>();
}
