import { Route, Routes } from '@angular/router';
import { Lesson, Topic } from '@core/models/topic.model';

/**
 * Builds one route per finished lesson:
 *   /rxjs-flattening              → redirects to the first lesson
 *   /rxjs-flattening/switch-map   → TopicShell + the lesson's demo
 */
export function topicRoutes(topics: readonly Topic[]): Routes {
  return topics
    .filter((topic) => topic.lessons.length > 0)
    .map((topic) => ({
      path: topic.slug,
      loadComponent: () => import('./topic-shell'),
      data: { topic },
      children: [
        { path: '', pathMatch: 'full', redirectTo: topic.lessons[0].slug },
        ...topic.lessons.map((lesson) => lessonRoute(topic, lesson)),
      ],
    }));
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
