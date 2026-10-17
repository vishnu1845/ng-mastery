import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
}

// DISCRIMINATED UNION: `status` tells TypeScript which other fields exist
type UsersState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; users: User[] }
  | { status: 'error'; message: string };

/** API state as a discriminated union: each status carries only the data that makes sense for it. */
@Component({
  selector: 'app-narrowing-demo',
  styleUrl: './narrowing-demo.scss',
  templateUrl: './narrowing-demo.html',
})
export default class NarrowingDemo {
  private readonly http = inject(HttpClient);

  protected readonly state = signal<UsersState>({ status: 'idle' });

  protected load(withError = false): void {
    this.state.set({ status: 'loading' });

    // The mock API answers api/users; ?fail=500 forces an error
    const url = withError ? 'api/users?fail=500' : 'api/users?page=1&limit=4';

    this.http.get<User[]>(url).subscribe({
      next: (users) => this.state.set({ status: 'success', users }),
      error: (error: unknown) => this.state.set({ status: 'error', message: describeError(error) }),
    });
  }
}

// INSTANCEOF NARROWING: inside the if, TypeScript knows it's an HttpErrorResponse
function describeError(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    return `${error.status} ${error.statusText}`;
  }
  return 'Something went wrong';
}
