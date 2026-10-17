import { Routes } from '@angular/router';
import { AppShell } from '@layout/app-shell/app-shell';
import { topicRoutes } from '@layout/topic-shell/topic-routes';
import { TOPICS } from '@topics/topic-registry';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      {
        path: '',
        title: 'Angular 22 by live demo',
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'about',
        title: 'About this project',
        loadComponent: () => import('./pages/about/about'),
      },

      // One route per finished lesson, generated from the topic registry
      ...topicRoutes(TOPICS),

      {
        path: '**',
        title: 'Page not found',
        loadComponent: () => import('./pages/not-found/not-found'),
      },
    ],
  },
];
