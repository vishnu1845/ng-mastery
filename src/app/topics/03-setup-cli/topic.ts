import { Topic } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/03-setup-cli';

export const setupCliTopic: Topic = {
  id: 3,
  slug: 'setup-cli',
  title: 'Setup, CLI & Project Structure',
  part: 'foundations',
  outline: [
    'node-npm',
    'cli-commands',
    'project-structure',
    'angular-json',
    'package-files',
    'environments',
  ],
  lessons: [
    {
      slug: 'node-npm',
      title: 'Node.js & npm',
      component: () => import('./node-npm/node-npm-demo'),
      notes: () => import('./node-npm/notes.md'),
      files: [`${FOLDER}/node-npm/node-versions.ts`],
    },
    {
      slug: 'cli-commands',
      title: 'Angular CLI & commands',
      component: () => import('./cli-commands/cli-commands-demo'),
      notes: () => import('./cli-commands/notes.md'),
      files: [`${FOLDER}/cli-commands/schematics.ts`],
    },
    {
      slug: 'project-structure',
      title: 'Project structure',
      component: () => import('./project-structure/project-structure-demo'),
      notes: () => import('./project-structure/notes.md'),
      files: [`${FOLDER}/project-structure/new-project.ts`, 'src/main.ts', 'tsconfig.app.json'],
    },
    {
      slug: 'angular-json',
      title: 'angular.json',
      component: () => import('./angular-json/angular-json-demo'),
      notes: () => import('./angular-json/notes.md'),
      files: ['angular.json'],
    },
    {
      slug: 'package-files',
      title: 'package.json vs package-lock.json',
      component: () => import('./package-files/package-files-demo'),
      notes: () => import('./package-files/notes.md'),
      files: [`${FOLDER}/package-files/semver.ts`, 'package.json'],
    },
    {
      slug: 'environments',
      title: 'Environments',
      component: () => import('./environments/environments-demo'),
      notes: () => import('./environments/notes.md'),
    },
  ],
};
