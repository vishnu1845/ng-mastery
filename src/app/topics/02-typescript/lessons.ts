import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/02-typescript';

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  'why-typescript': {
    component: () => import('./why-typescript/why-typescript-demo'),
    notes: () => import('./why-typescript/notes.md'),
  },
  'basic-types': {
    component: () => import('./basic-types/basic-types-demo'),
    notes: () => import('./basic-types/notes.md'),
  },
  'any-unknown-never': {
    component: () => import('./any-unknown-never/any-unknown-never-demo'),
    notes: () => import('./any-unknown-never/notes.md'),
  },
  'interface-vs-type': {
    component: () => import('./interface-vs-type/interface-vs-type-demo'),
    notes: () => import('./interface-vs-type/notes.md'),
  },
  'union-intersection': {
    component: () => import('./union-intersection/union-intersection-demo'),
    notes: () => import('./union-intersection/notes.md'),
    files: [`${FOLDER}/union-intersection/sized-button.ts`],
  },
  enums: {
    component: () => import('./enums/enums-demo'),
    notes: () => import('./enums/notes.md'),
  },
  generics: {
    component: () => import('./generics/generics-demo'),
    notes: () => import('./generics/notes.md'),
  },
  classes: {
    component: () => import('./classes/classes-demo'),
    notes: () => import('./classes/notes.md'),
    files: [`${FOLDER}/classes/shapes.ts`],
  },
  'null-safety': {
    component: () => import('./null-safety/null-safety-demo'),
    notes: () => import('./null-safety/notes.md'),
  },
  narrowing: {
    component: () => import('./narrowing/narrowing-demo'),
    notes: () => import('./narrowing/notes.md'),
  },
  'utility-types': {
    component: () => import('./utility-types/utility-types-demo'),
    notes: () => import('./utility-types/notes.md'),
  },
  decorators: {
    component: () => import('./decorators/decorators-demo'),
    notes: () => import('./decorators/notes.md'),
    files: [`${FOLDER}/decorators/log-call.ts`],
  },
  'tsconfig-strict': {
    component: () => import('./tsconfig-strict/tsconfig-strict-demo'),
    notes: () => import('./tsconfig-strict/notes.md'),
    files: ['tsconfig.json'],
  },
} satisfies TopicContent;
