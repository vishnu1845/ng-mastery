import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideIcons } from '@ng-icons/core';
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
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ),
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    provideClientHydration(),
    provideIcons(APP_ICONS),
    { provide: TitleStrategy, useClass: PageTitle },
  ],
};
