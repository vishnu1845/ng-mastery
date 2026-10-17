import { Service } from '@angular/core';
import { Lesson, LessonRef, Part, Topic } from '@core/models/topic.model';
import { PARTS } from './parts';
import { TOPICS } from './topic-registry';

export interface PartWithTopics extends Part {
  topics: Topic[];
}

export interface SearchResult {
  label: string;
  context: string;
  url: string;
}

/**
 * Read-only view over the topic registry: grouping, lookups, prev/next and search.
 * Everything the layout needs to know about topics comes from here.
 */
@Service()
export class Catalog {
  readonly topics = TOPICS;

  readonly parts: PartWithTopics[] = PARTS.map((part) => ({
    ...part,
    topics: TOPICS.filter((topic) => topic.part === part.id),
  }));

  /** Parts that have at least one finished lesson (what the sidebar shows). */
  readonly liveParts: PartWithTopics[] = this.parts
    .map((part) => ({ ...part, topics: part.topics.filter(isLive) }))
    .filter((part) => part.topics.length > 0);

  /** Every finished lesson in learning order. */
  readonly lessonPath: LessonRef[] = TOPICS.flatMap((topic) =>
    topic.lessons.map((lesson) => ({ topic, lesson, url: lessonUrl(topic, lesson) })),
  );

  readonly plannedLessonCount = TOPICS.reduce((sum, topic) => sum + topic.outline.length, 0);

  partOf(topic: Topic): Part {
    return PARTS.find((part) => part.id === topic.part) ?? PARTS[0];
  }

  /** Files shown in the Code tab, as project paths (served from /code/...). */
  sourceFiles(topic: Topic, lesson: Lesson): string[] {
    const folder = `src/app/topics/${topicFolder(topic)}/${lesson.slug}`;
    const demoFiles = lesson.component
      ? [`${folder}/${lesson.slug}-demo.ts`, `${folder}/${lesson.slug}-demo.html`]
      : [];
    return [...demoFiles, ...(lesson.files ?? [])];
  }

  neighbours(topic: Topic, lesson: Lesson): { previous?: LessonRef; next?: LessonRef } {
    const index = this.lessonPath.findIndex(
      (ref) => ref.topic === topic && ref.lesson.slug === lesson.slug,
    );
    return {
      previous: index > 0 ? this.lessonPath[index - 1] : undefined,
      next: index >= 0 ? this.lessonPath[index + 1] : undefined,
    };
  }

  search(query: string, limit = 10): SearchResult[] {
    const term = query.trim().toLowerCase();
    if (!term) return [];

    const lessons = this.lessonPath
      .filter(({ topic, lesson }) => `${lesson.title} ${topic.title}`.toLowerCase().includes(term))
      .map(({ topic, lesson, url }) => ({
        label: lesson.title,
        context: `${topicNumber(topic)} ${topic.title}`,
        url,
      }));

    const topics = TOPICS.filter(isLive)
      .filter((topic) => topic.title.toLowerCase().includes(term))
      .map((topic) => ({
        label: topic.title,
        context: `Topic ${topicNumber(topic)}`,
        url: `/${topic.slug}`,
      }));

    return [...topics, ...lessons].slice(0, limit);
  }
}

// HELPERS

export function isLive(topic: Topic): boolean {
  return topic.lessons.length > 0;
}

/** "07" for topic 7. */
export function topicNumber(topic: Topic): string {
  return String(topic.id).padStart(2, '0');
}

/** Folder name under src/app/topics, e.g. "31-rxjs-flattening". */
export function topicFolder(topic: Topic): string {
  return `${topicNumber(topic)}-${topic.slug}`;
}

export function lessonUrl(topic: Topic, lesson: Lesson): string {
  return `/${topic.slug}/${lesson.slug}`;
}
