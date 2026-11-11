import { Route, Routes } from '@angular/router';
import { Lesson, Topic, TopicContent } from '@core/models/topic.model';

/**
 * Builds one route per finished lesson:
 *   /rxjs-flattening              → redirects to the first lesson
 *   /rxjs-flattening/switch-map   → TopicShell + the lesson's demo
 *
 * The lesson routes come from the topic's lessons.ts, loaded only when the topic opens,
 * so the first download carries just the titles the sidebar and search need.
 */
export function topicRoutes(topics: readonly Topic[]): Routes {
  return topics
    .filter((topic) => topic.lessons.length > 0)
    .map((topic) => ({
      path: topic.slug,
      loadComponent: () => import('./topic-shell'),
      data: { topic },
      loadChildren: async () => lessonRoutes(topic, (await loadContent(topic)).default),
    }));
}

function loadContent(topic: Topic): Promise<{ default: TopicContent }> {
  if (!topic.content) throw new Error(`Topic "${topic.slug}" has lessons but no lessons.ts`);
  return topic.content();
}

function lessonRoutes(topic: Topic, content: TopicContent): Routes {
  return [
    { path: '', pathMatch: 'full', redirectTo: topic.lessons[0].slug },
    ...topic.lessons.map((info) => lessonRoute(topic, { ...info, ...content[info.slug] })),
  ];
}

function lessonRoute(topic: Topic, lesson: Lesson): Route {
  return {
    path: lesson.slug,
    title: `${lesson.title} | ${topic.title}`,
    loadComponent: lesson.component ?? (() => import('./theory-lesson')),
    data: { lesson },
    providers: lesson.providers,
    children: lesson.children,
  };
}
