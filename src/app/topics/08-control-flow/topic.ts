import { Topic } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/08-control-flow';

export const controlFlowTopic: Topic = {
  id: 8,
  slug: 'control-flow',
  title: 'Control Flow (@if, @for, @switch, @let)',
  part: 'components',
  outline: [
    'if-else',
    'for-track',
    'for-context-empty',
    'switch',
    'let',
    'ng-template-container',
    'legacy-structural',
  ],
  lessons: [
    {
      slug: 'if-else',
      title: '@if, @else if & @else',
      component: () => import('./if-else/if-else-demo'),
      notes: () => import('./if-else/notes.md'),
      files: ['src/app/shared/utils/dom-watch.ts'],
    },
    {
      slug: 'for-track',
      title: '@for & track',
      component: () => import('./for-track/for-track-demo'),
      notes: () => import('./for-track/notes.md'),
      files: [`${FOLDER}/for-track/member-row.ts`, 'src/app/shared/utils/dom-watch.ts'],
    },
    {
      slug: 'for-context-empty',
      title: '@for variables & @empty',
      component: () => import('./for-context-empty/for-context-empty-demo'),
      notes: () => import('./for-context-empty/notes.md'),
    },
    {
      slug: 'switch',
      title: '@switch, @case & @default',
      component: () => import('./switch/switch-demo'),
      notes: () => import('./switch/notes.md'),
    },
    {
      slug: 'let',
      title: '@let template variables',
      component: () => import('./let/let-demo'),
      notes: () => import('./let/notes.md'),
    },
    {
      slug: 'ng-template-container',
      title: 'ng-template & ng-container',
      component: () => import('./ng-template-container/ng-template-container-demo'),
      notes: () => import('./ng-template-container/notes.md'),
    },
    {
      slug: 'legacy-structural',
      title: 'Legacy *ngIf, *ngFor & migrating',
      component: () => import('./legacy-structural/legacy-structural-demo'),
      notes: () => import('./legacy-structural/notes.md'),
    },
  ],
};
