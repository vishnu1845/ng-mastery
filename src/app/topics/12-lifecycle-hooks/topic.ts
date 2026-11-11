import { Topic } from '@core/models/topic.model';

export const lifecycleHooksTopic: Topic = {
  id: 12,
  slug: 'lifecycle-hooks',
  title: 'Lifecycle Hooks & Render Hooks',
  part: 'components',
  outline: [
    'visualizer',
    'constructor-vs-oninit',
    'on-changes',
    'do-check',
    'content-vs-view',
    'on-destroy',
    'render-hooks',
    'destroy-ref',
    'hooks-with-signals',
  ],
  lessons: [
    { slug: 'visualizer', title: 'The lifecycle & the 8 hooks in order' },
    { slug: 'constructor-vs-oninit', title: 'constructor vs ngOnInit' },
    { slug: 'on-changes', title: 'ngOnChanges & SimpleChanges' },
    { slug: 'do-check', title: 'ngDoCheck' },
    { slug: 'content-vs-view', title: 'Content hooks vs view hooks' },
    { slug: 'on-destroy', title: 'ngOnDestroy & cleanup' },
    { slug: 'render-hooks', title: 'afterNextRender & afterEveryRender' },
    { slug: 'destroy-ref', title: 'DestroyRef & takeUntilDestroyed()' },
    { slug: 'hooks-with-signals', title: 'Which hooks we still need with signals' },
  ],
  content: () => import('./lessons'),
};
