import { HttpInterceptorFn } from '@angular/common/http';
import { Injector, inject, runInInjectionContext } from '@angular/core';
import { from, mergeMap } from 'rxjs';

/**
 * A fake backend, so every demo works without a server (even on the deployed site).
 * It answers any request whose URL starts with "api/". The routes are listed in mock-backend.ts.
 *
 * The backend and its data load on the first "api/" request, so pages that never call
 * the API don't download them.
 */
export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const path = new URL(req.urlWithParams, 'http://mock.local').pathname.replace(/^\/+/, '');
  if (!path.startsWith('api/')) return next(req);

  const injector = inject(Injector);
  return from(import('./mock-backend')).pipe(
    mergeMap(({ answer }) => runInInjectionContext(injector, () => answer(req))),
  );
};
