import { ViewportScroller } from '@angular/common';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { markBoot } from '@core/boot/boot-marks';
import { APP_ICONS } from '@core/icons';
import { mockApiInterceptor } from '@core/mock-api/mock-api-interceptor';
import { PageTitle } from '@core/seo/page-title';
import { routes } from './app.routes';

// Angular 22 defaults: zoneless change detection, OnPush components, Fetch-based HttpClient.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      // 'enabled': new pages start at the top, and Back/Forward restore the old scroll position
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    provideClientHydration(),
    provideIcons(APP_ICONS),
    { provide: TitleStrategy, useClass: PageTitle },
    // Runs once during startup, before App renders (read by the Topic 04 timeline)
    provideAppInitializer(() => markBoot('initializer')),
    // Anchor links (#letter-S) stop below the sticky top bar, not under it
    provideAppInitializer(() => inject(ViewportScroller).setOffset(belowTopbar)),
  ],
};

// Angular scrolls to anchors with window.scrollTo, which ignores CSS scroll-margin
function belowTopbar(): [number, number] {
  const topbar = document.querySelector('app-topbar');
  return [0, (topbar?.getBoundingClientRect().height ?? 0) + 16];
}
