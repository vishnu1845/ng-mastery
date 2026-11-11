import { Topic } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/09-directives';
const HIGHLIGHT = `${FOLDER}/_shared/highlight.ts`;

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
    {
      slug: 'directive-types',
      title: 'What is a directive & the three types',
      component: () => import('./directive-types/directive-types-demo'),
      notes: () => import('./directive-types/notes.md'),
      files: [`${FOLDER}/directive-types/three-types.ts`],
    },
    {
      slug: 'class-style-directives',
      title: 'NgClass, NgStyle & NgModel',
      component: () => import('./class-style-directives/class-style-directives-demo'),
      notes: () => import('./class-style-directives/notes.md'),
    },
    {
      slug: 'custom-attribute',
      title: 'Custom attribute directive & inputs',
      component: () => import('./custom-attribute/custom-attribute-demo'),
      notes: () => import('./custom-attribute/notes.md'),
      files: [HIGHLIGHT, `${FOLDER}/custom-attribute/auto-focus.ts`],
    },
    {
      slug: 'host-listeners',
      title: 'host metadata vs @HostListener',
      component: () => import('./host-listeners/host-listeners-demo'),
      notes: () => import('./host-listeners/notes.md'),
      files: [
        `${FOLDER}/host-listeners/dropdown.ts`,
        `${FOLDER}/host-listeners/dropdown-decorators.ts`,
      ],
    },
    {
      slug: 'renderer2',
      title: 'ElementRef vs Renderer2',
      component: () => import('./renderer2/renderer2-demo'),
      notes: () => import('./renderer2/notes.md'),
      files: [`${FOLDER}/renderer2/dom-writers.ts`],
    },
    {
      slug: 'custom-structural',
      title: 'Custom structural directive',
      component: () => import('./custom-structural/custom-structural-demo'),
      notes: () => import('./custom-structural/notes.md'),
      files: [`${FOLDER}/custom-structural/has-role.ts`, `${FOLDER}/custom-structural/session.ts`],
    },
    {
      slug: 'host-directives',
      title: 'Host directives (composition)',
      component: () => import('./host-directives/host-directives-demo'),
      notes: () => import('./host-directives/notes.md'),
      files: [
        `${FOLDER}/host-directives/chip.ts`,
        `${FOLDER}/host-directives/pressable.ts`,
        HIGHLIGHT,
      ],
    },
    {
      slug: 'export-as',
      title: 'exportAs',
      component: () => import('./export-as/export-as-demo'),
      notes: () => import('./export-as/notes.md'),
      files: [`${FOLDER}/export-as/collapse.ts`],
    },
  ],
};
