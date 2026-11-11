import { Topic } from '@core/models/topic.model';

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
    { slug: 'node-npm', title: 'Node.js & npm' },
    { slug: 'cli-commands', title: 'Angular CLI & commands' },
    { slug: 'project-structure', title: 'Project structure' },
    { slug: 'angular-json', title: 'angular.json' },
    { slug: 'package-files', title: 'package.json vs package-lock.json' },
    { slug: 'environments', title: 'Environments' },
  ],
  content: () => import('./lessons'),
};
