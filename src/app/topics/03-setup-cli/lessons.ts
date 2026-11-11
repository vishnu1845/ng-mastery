import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/03-setup-cli';

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  'node-npm': {
    component: () => import('./node-npm/node-npm-demo'),
    notes: () => import('./node-npm/notes.md'),
    files: [`${FOLDER}/node-npm/node-versions.ts`],
  },
  'cli-commands': {
    component: () => import('./cli-commands/cli-commands-demo'),
    notes: () => import('./cli-commands/notes.md'),
    files: [`${FOLDER}/cli-commands/schematics.ts`],
  },
  'project-structure': {
    component: () => import('./project-structure/project-structure-demo'),
    notes: () => import('./project-structure/notes.md'),
    files: [`${FOLDER}/project-structure/new-project.ts`, 'src/main.ts', 'tsconfig.app.json'],
  },
  'angular-json': {
    component: () => import('./angular-json/angular-json-demo'),
    notes: () => import('./angular-json/notes.md'),
    files: ['angular.json'],
  },
  'package-files': {
    component: () => import('./package-files/package-files-demo'),
    notes: () => import('./package-files/notes.md'),
    files: [`${FOLDER}/package-files/semver.ts`, 'package.json'],
  },
  environments: {
    component: () => import('./environments/environments-demo'),
    notes: () => import('./environments/notes.md'),
  },
} satisfies TopicContent;
