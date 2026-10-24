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
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
