import { Topic } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/02-typescript';

export const typescriptTopic: Topic = {
  id: 2,
  slug: 'typescript',
  title: 'TypeScript Essentials for Angular',
  part: 'foundations',
  outline: [
    'why-typescript',
    'basic-types',
    'any-unknown-never',
    'interface-vs-type',
    'union-intersection',
    'enums',
    'generics',
    'classes',
    'null-safety',
    'narrowing',
    'utility-types',
    'decorators',
    'tsconfig-strict',
  ],
  lessons: [
    {
      slug: 'why-typescript',
      title: 'Why TypeScript',
      component: () => import('./why-typescript/why-typescript-demo'),
      notes: () => import('./why-typescript/notes.md'),
    },
    {
      slug: 'basic-types',
      title: 'Basic types & inference',
      component: () => import('./basic-types/basic-types-demo'),
      notes: () => import('./basic-types/notes.md'),
    },
    {
      slug: 'any-unknown-never',
      title: 'any vs unknown vs never',
      component: () => import('./any-unknown-never/any-unknown-never-demo'),
      notes: () => import('./any-unknown-never/notes.md'),
    },
    {
      slug: 'interface-vs-type',
      title: 'interface vs type',
      component: () => import('./interface-vs-type/interface-vs-type-demo'),
      notes: () => import('./interface-vs-type/notes.md'),
    },
    {
      slug: 'union-intersection',
      title: 'Union, intersection & literal types',
      component: () => import('./union-intersection/union-intersection-demo'),
      notes: () => import('./union-intersection/notes.md'),
      files: [`${FOLDER}/union-intersection/sized-button.ts`],
    },
    {
      slug: 'enums',
      title: 'Enums',
      component: () => import('./enums/enums-demo'),
      notes: () => import('./enums/notes.md'),
    },
    {
      slug: 'generics',
      title: 'Generics',
      component: () => import('./generics/generics-demo'),
      notes: () => import('./generics/notes.md'),
    },
    {
      slug: 'classes',
      title: 'Classes & access modifiers',
      component: () => import('./classes/classes-demo'),
      notes: () => import('./classes/notes.md'),
      files: [`${FOLDER}/classes/shapes.ts`],
    },
    {
      slug: 'null-safety',
      title: 'Optional, ?., ?? and !',
      component: () => import('./null-safety/null-safety-demo'),
      notes: () => import('./null-safety/notes.md'),
    },
    {
      slug: 'narrowing',
      title: 'Narrowing & type guards',
      component: () => import('./narrowing/narrowing-demo'),
      notes: () => import('./narrowing/notes.md'),
    },
    {
      slug: 'utility-types',
      title: 'Utility types',
      component: () => import('./utility-types/utility-types-demo'),
      notes: () => import('./utility-types/notes.md'),
    },
    {
      slug: 'decorators',
      title: 'Decorators',
      component: () => import('./decorators/decorators-demo'),
      notes: () => import('./decorators/notes.md'),
      files: [`${FOLDER}/decorators/log-call.ts`],
    },
    {
      slug: 'tsconfig-strict',
      title: 'tsconfig & strict mode',
      component: () => import('./tsconfig-strict/tsconfig-strict-demo'),
      notes: () => import('./tsconfig-strict/notes.md'),
      files: ['tsconfig.json'],
    },
  ],
};
