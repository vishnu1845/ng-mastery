import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/09-directives';
const HIGHLIGHT = `${FOLDER}/_shared/highlight.ts`;

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  'directive-types': {
    component: () => import('./directive-types/directive-types-demo'),
    notes: () => import('./directive-types/notes.md'),
    files: [`${FOLDER}/directive-types/three-types.ts`],
  },
  'class-style-directives': {
    component: () => import('./class-style-directives/class-style-directives-demo'),
    notes: () => import('./class-style-directives/notes.md'),
  },
  'custom-attribute': {
    component: () => import('./custom-attribute/custom-attribute-demo'),
    notes: () => import('./custom-attribute/notes.md'),
    files: [HIGHLIGHT, `${FOLDER}/custom-attribute/auto-focus.ts`],
  },
  'host-listeners': {
    component: () => import('./host-listeners/host-listeners-demo'),
    notes: () => import('./host-listeners/notes.md'),
    files: [
      `${FOLDER}/host-listeners/dropdown.ts`,
      `${FOLDER}/host-listeners/dropdown-decorators.ts`,
    ],
  },
  renderer2: {
    component: () => import('./renderer2/renderer2-demo'),
    notes: () => import('./renderer2/notes.md'),
    files: [`${FOLDER}/renderer2/dom-writers.ts`],
  },
  'custom-structural': {
    component: () => import('./custom-structural/custom-structural-demo'),
    notes: () => import('./custom-structural/notes.md'),
    files: [`${FOLDER}/custom-structural/has-role.ts`, `${FOLDER}/custom-structural/session.ts`],
  },
  'host-directives': {
    component: () => import('./host-directives/host-directives-demo'),
    notes: () => import('./host-directives/notes.md'),
    files: [
      `${FOLDER}/host-directives/chip.ts`,
      `${FOLDER}/host-directives/pressable.ts`,
      HIGHLIGHT,
    ],
  },
  'export-as': {
    component: () => import('./export-as/export-as-demo'),
    notes: () => import('./export-as/notes.md'),
    files: [`${FOLDER}/export-as/collapse.ts`],
  },
} satisfies TopicContent;
