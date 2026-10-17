import { Component, computed, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';

type Role = 'admin' | 'user';

// THE ONE MODEL
interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

// EVERY OTHER SHAPE COMES FROM IT
type NewUser = Omit<User, 'id'>; // POST body: the server creates the id
type UserUpdate = Partial<User>; // PATCH body: only what changed
type UserPreview = Pick<User, 'id' | 'name'>; // a small card

const PERMISSIONS: Record<Role, string[]> = {
  admin: ['read', 'write', 'delete'],
  user: ['read'],
};

// Readonly: SAVED.name = 'x' would be a compile error
const SAVED: Readonly<User> = {
  id: 7,
  name: 'Asha Patil',
  email: 'asha@example.dev',
  role: 'user',
};

/** One User interface, four request/UI shapes built from it with utility types. */
@Component({
  imports: [JsonPipe],
  selector: 'app-utility-types-demo',
  styleUrl: './utility-types-demo.scss',
  templateUrl: './utility-types-demo.html',
})
export default class UtilityTypesDemo {
  protected readonly roles: Role[] = ['user', 'admin'];

  // FORM STATE
  protected readonly name = signal(SAVED.name);
  protected readonly email = signal(SAVED.email);
  protected readonly role = signal(SAVED.role);

  // SHAPES, RECALCULATED AS WE TYPE
  protected readonly postBody = computed<NewUser>(() => ({
    name: this.name(),
    email: this.email(),
    role: this.role(),
  }));

  protected readonly patchBody = computed<UserUpdate>(() => {
    const changes: UserUpdate = {};
    if (this.name() !== SAVED.name) changes.name = this.name();
    if (this.email() !== SAVED.email) changes.email = this.email();
    if (this.role() !== SAVED.role) changes.role = this.role();
    return changes;
  });

  protected readonly preview = computed<UserPreview>(() => ({ id: SAVED.id, name: this.name() }));

  protected readonly permissions = computed(() => PERMISSIONS[this.role()]);

  protected reset(): void {
    this.name.set(SAVED.name);
    this.email.set(SAVED.email);
    this.role.set(SAVED.role);
  }
}
