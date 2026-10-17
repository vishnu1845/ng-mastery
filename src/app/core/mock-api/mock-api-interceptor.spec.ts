import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { mockApiInterceptor } from './mock-api-interceptor';
import { User } from './mock-data';

describe('mockApiInterceptor', () => {
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([mockApiInterceptor]))],
    });
    http = TestBed.inject(HttpClient);
  });

  it('returns a collection', async () => {
    const users = await firstValueFrom(http.get<User[]>('api/users?delay=0'));
    expect(users.length).toBeGreaterThan(0);
  });

  it('filters with ?q=', async () => {
    const users = await firstValueFrom(http.get<User[]>('api/users?q=pune&delay=0'));
    expect(users.every((user) => user.city === 'Pune')).toBe(true);
  });

  it('creates, updates and deletes a row', async () => {
    const created = await firstValueFrom(
      http.post<User>('api/users?delay=0', { name: 'New User', city: 'Goa' }),
    );
    const updated = await firstValueFrom(
      http.patch<User>(`api/users/${created.id}?delay=0`, { city: 'Nagpur' }),
    );
    await firstValueFrom(http.delete(`api/users/${created.id}?delay=0`));

    expect(updated.city).toBe('Nagpur');
    await expect(
      firstValueFrom(http.get(`api/users/${created.id}?delay=0`)),
    ).rejects.toBeInstanceOf(HttpErrorResponse);
  });

  it('fails on purpose with ?fail=', async () => {
    const error = await firstValueFrom(http.get('api/users?fail=500&delay=0')).catch((e) => e);
    expect((error as HttpErrorResponse).status).toBe(500);
  });

  it('logs in only with the demo password', async () => {
    const login = await firstValueFrom(
      http.post<{ token: string }>('api/auth/login?delay=0', {
        username: 'vishnu',
        password: 'angular',
      }),
    );
    expect(login.token.split('.')).toHaveLength(3);

    const error = await firstValueFrom(
      http.post('api/auth/login?delay=0', { username: 'vishnu', password: 'wrong' }),
    ).catch((e) => e);
    expect((error as HttpErrorResponse).status).toBe(401);
  });
});
