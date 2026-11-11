import { Topic } from '@core/models/topic.model';

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
    { slug: 'if-else', title: '@if, @else if & @else' },
    { slug: 'for-track', title: '@for & track' },
    { slug: 'for-context-empty', title: '@for variables & @empty' },
    { slug: 'switch', title: '@switch, @case & @default' },
    { slug: 'let', title: '@let template variables' },
    { slug: 'ng-template-container', title: 'ng-template & ng-container' },
    { slug: 'legacy-structural', title: 'Legacy *ngIf, *ngFor & migrating' },
  ],
  content: () => import('./lessons'),
};
