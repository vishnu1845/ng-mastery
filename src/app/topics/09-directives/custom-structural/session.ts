import { Service, signal } from '@angular/core';

export type Role = 'guest' | 'editor' | 'admin';

/** Who is using the app. A real app would fill this after login. */
@Service()
export class Session {
  readonly role = signal<Role>('guest');
}
