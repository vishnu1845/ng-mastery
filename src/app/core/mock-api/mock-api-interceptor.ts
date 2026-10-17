import {
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { map, mergeMap, Observable, throwError, timer } from 'rxjs';
import { MockDb, Row } from './mock-db';

const DEFAULT_DELAY_MS = 400;

/**
 * A fake backend, so every demo works without a server (even on the deployed site).
 * It answers any request whose URL starts with "api/".
 *
 *   GET    api/users              list (supports ?q=, ?page=, ?limit=)
 *   GET    api/users/3            one row
 *   POST   api/users              create
 *   PUT    api/users/3            replace   (PATCH merges)
 *   DELETE api/users/3            delete
 *   POST   api/auth/login         { username, password: 'angular' } → fake JWT
 *
 * Any URL also accepts ?delay=2000 (slow network) and ?fail=500 (forced error).
 */
export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const url = new URL(req.urlWithParams, 'http://mock.local');
  const path = url.pathname.replace(/^\/+/, '');
  if (!path.startsWith('api/')) return next(req);

  const db = inject(MockDb);
  const latency = Number(url.searchParams.get('delay') ?? DEFAULT_DELAY_MS);
  const forcedStatus = Number(url.searchParams.get('fail') ?? 0);

  if (forcedStatus >= 400) {
    return fail(req, forcedStatus, `Forced ${forcedStatus} error`, latency);
  }

  const [, collection, idPart] = path.split('/');

  // AUTH
  if (collection === 'auth' && idPart === 'login' && req.method === 'POST') {
    return login(req, latency);
  }

  if (!db.has(collection)) {
    return fail(req, 404, `Unknown collection "${collection}"`, latency);
  }

  const id = idPart ? Number(idPart) : undefined;
  const body = (req.body ?? {}) as Record<string, unknown>;

  // ROUTES
  switch (req.method) {
    case 'GET': {
      if (id === undefined) return listRows(req, db.list(collection), url.searchParams, latency);
      const row = db.find(collection, id);
      return row ? ok(req, row, latency) : fail(req, 404, `${collection}/${id} not found`, latency);
    }
    case 'POST':
      return ok(req, db.insert(collection, body), latency, 201);
    case 'PUT':
    case 'PATCH': {
      const row = id === undefined ? undefined : db.update(collection, id, body);
      return row ? ok(req, row, latency) : fail(req, 404, `${collection}/${id} not found`, latency);
    }
    case 'DELETE':
      return id !== undefined && db.remove(collection, id)
        ? ok(req, null, latency, 204)
        : fail(req, 404, `${collection}/${id} not found`, latency);
    default:
      return fail(req, 405, `${req.method} is not supported`, latency);
  }
};

// HELPERS

function listRows(
  req: HttpRequest<unknown>,
  rows: Row[],
  params: URLSearchParams,
  latency: number,
): Observable<HttpResponse<unknown>> {
  const query = params.get('q')?.trim().toLowerCase();
  const matches = query
    ? rows.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(query)),
      )
    : rows;

  const page = Number(params.get('page') ?? 0);
  const limit = Number(params.get('limit') ?? 0);
  const pageRows =
    page > 0 && limit > 0 ? matches.slice((page - 1) * limit, page * limit) : matches;

  const headers = new HttpHeaders({ 'X-Total-Count': String(matches.length) });
  return ok(req, pageRows, latency, 200, headers);
}

function login(req: HttpRequest<unknown>, latency: number): Observable<HttpResponse<unknown>> {
  const { username, password } = (req.body ?? {}) as { username?: string; password?: string };
  if (!username || password !== 'angular') {
    return fail(req, 401, 'Wrong username or password (hint: the password is "angular")', latency);
  }
  return ok(req, { token: fakeJwt(username), user: { name: username } }, latency);
}

function ok(
  req: HttpRequest<unknown>,
  body: unknown,
  latency: number,
  status = 200,
  headers?: HttpHeaders,
): Observable<HttpResponse<unknown>> {
  return timer(latency).pipe(map(() => new HttpResponse({ body, status, headers, url: req.url })));
}

function fail(
  req: HttpRequest<unknown>,
  status: number,
  message: string,
  latency: number,
): Observable<never> {
  return timer(latency).pipe(
    mergeMap(() =>
      throwError(
        () =>
          new HttpErrorResponse({ status, statusText: message, error: { message }, url: req.url }),
      ),
    ),
  );
}

function fakeJwt(username: string): string {
  const encode = (value: object) =>
    btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  const header = encode({ alg: 'none', typ: 'JWT' });
  const payload = encode({ sub: username, exp: Math.floor(Date.now() / 1000) + 3600 });
  return `${header}.${payload}.mock-signature`;
}
