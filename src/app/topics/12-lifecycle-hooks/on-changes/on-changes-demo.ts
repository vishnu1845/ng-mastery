import { Component, inject, signal } from '@angular/core';
import { HookLog } from '../_shared/hook-log';
import { HookTimeline } from '../_shared/hook-timeline';
import { ProfileCard, User } from './profile-card';

const NAMES = ['Levi', 'Mikasa', 'Hinata', 'Naruto', 'Nezuko'];
const ROLES = ['viewer', 'editor', 'admin'];

/** The parent changes the card's inputs in different ways, and the log shows when ngOnChanges ran. */
@Component({
  selector: 'app-on-changes-demo',
  imports: [ProfileCard, HookTimeline],
  providers: [HookLog],
  styleUrl: './on-changes-demo.scss',
  templateUrl: './on-changes-demo.html',
})
export default class OnChangesDemo {
  private readonly log = inject(HookLog);
  protected readonly who = ['Bound card', 'Unbound card'];

  protected readonly user = signal<User>({ name: 'Levi' });
  protected readonly role = signal('viewer');
  protected readonly theme = signal('light');
  private turn = 0;

  // MUTATION: the same object, so the binding sees no change
  protected mutate(): void {
    this.log.begin('Mutate user.name');
    this.user().name = this.nextName();
  }

  // NEW REFERENCE: a new object, so ngOnChanges runs
  protected replace(): void {
    this.log.begin('Replace the user object');
    this.user.set({ name: this.nextName() });
  }

  protected changeRole(): void {
    this.log.begin('Change the role');
    this.role.update((role) => ROLES[(ROLES.indexOf(role) + 1) % ROLES.length]);
  }

  protected changeTwo(): void {
    this.log.begin('Change the role and the theme');
    this.role.update((role) => ROLES[(ROLES.indexOf(role) + 1) % ROLES.length]);
    this.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }

  private nextName(): string {
    this.turn = (this.turn + 1) % NAMES.length;
    return NAMES[this.turn];
  }
}
