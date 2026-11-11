import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'glossary/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const { GLOSSARY } = await import('@glossary/glossary-terms');
      return GLOSSARY.map(({ slug }) => ({ slug }));
    },
  },
  {
    path: 'component-communication/via-router/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const { ORDERS } = await import('./topics/11-component-communication/via-router/orders');
      return ORDERS.map(({ id }) => ({ id }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
