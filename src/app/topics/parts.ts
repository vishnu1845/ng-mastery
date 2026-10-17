import { Part } from '@core/models/topic.model';

/** The 17 parts of the syllabus, in learning order. */
export const PARTS: readonly Part[] = [
  { id: 'foundations', title: 'Foundations' },
  { id: 'components', title: 'Components & Templates' },
  { id: 'di', title: 'Services & Dependency Injection' },
  { id: 'routing', title: 'Routing' },
  { id: 'forms', title: 'Forms' },
  { id: 'http', title: 'HTTP' },
  { id: 'rxjs', title: 'RxJS' },
  { id: 'reactivity', title: 'Advanced Reactivity' },
  { id: 'rendering', title: 'Change Detection & Rendering' },
  { id: 'state', title: 'State Management' },
  { id: 'performance', title: 'Performance' },
  { id: 'ssr', title: 'SSR & Hydration' },
  { id: 'build', title: 'Build & Deployment' },
  { id: 'testing', title: 'Testing' },
  { id: 'security', title: 'Security & Error Handling' },
  { id: 'extras', title: 'Extra Features' },
  { id: 'architecture', title: 'Architecture & Interview Wrap-up' },
];
