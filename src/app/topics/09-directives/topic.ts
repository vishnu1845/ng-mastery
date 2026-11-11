import { Topic } from '@core/models/topic.model';

export const directivesTopic: Topic = {
  id: 9,
  slug: 'directives',
  title: 'Directives',
  part: 'components',
  outline: [
    'directive-types',
    'class-style-directives',
    'custom-attribute',
    'host-listeners',
    'renderer2',
    'custom-structural',
    'host-directives',
    'export-as',
  ],
  lessons: [
    { slug: 'directive-types', title: 'What is a directive & the three types' },
    { slug: 'class-style-directives', title: 'NgClass, NgStyle & NgModel' },
    { slug: 'custom-attribute', title: 'Custom attribute directive & inputs' },
    { slug: 'host-listeners', title: 'host metadata vs @HostListener' },
    { slug: 'renderer2', title: 'ElementRef vs Renderer2' },
    { slug: 'custom-structural', title: 'Custom structural directive' },
    { slug: 'host-directives', title: 'Host directives (composition)' },
    { slug: 'export-as', title: 'exportAs' },
  ],
  content: () => import('./lessons'),
};
