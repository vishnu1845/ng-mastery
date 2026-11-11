import { Provider, Type } from '@angular/core';
import { Routes } from '@angular/router';

export type PartId =
  | 'foundations'
  | 'components'
  | 'di'
  | 'routing'
  | 'forms'
  | 'http'
  | 'rxjs'
  | 'reactivity'
  | 'rendering'
  | 'state'
  | 'performance'
  | 'ssr'
  | 'build'
  | 'testing'
  | 'security'
  | 'extras'
  | 'architecture';

/** A group of topics, e.g. "RxJS" (topics 27–32). */
export interface Part {
  id: PartId;
  title: string;
}

/** A lazy import of a module whose default export is T. */
export type LazyDefault<T> = () => Promise<{ default: T }>;

/**
 * What the sidebar, search and prev/next links need to know about a lesson.
 * Kept small, because every topic's list ships in the first download.
 */
export interface LessonInfo {
  slug: string;
  title: string;
}

/** The heavy part of a lesson. It lives in the topic's lessons.ts, loaded when the topic opens. */
export interface LessonContent {
  /** Live demo component (default export). Leave it out for theory-only lessons. */
  component?: LazyDefault<Type<unknown>>;
  /** Lesson notes in markdown, imported as text. */
  notes: LazyDefault<string>;
  /**
   * Extra files for the Code tab, as project paths (e.g. 'src/app/app.config.ts', 'angular.json').
   * The demo's own .ts and .html files are added automatically.
   */
  files?: string[];
  /** Child routes, for routing demos. */
  children?: Routes;
  /** Route-level providers, e.g. a store used only by this lesson. */
  providers?: Provider[];
}

/** One subtopic: a small live demo + short notes. */
export type Lesson = LessonInfo & LessonContent;

/** A topic's lessons.ts: the content of every finished lesson, keyed by lesson slug. */
export type TopicContent = Record<string, LessonContent>;

/** One Notion topic = one folder in src/app/topics. */
export interface Topic {
  id: number;
  slug: string;
  title: string;
  part: PartId;
  /** Every planned lesson slug, in order. This is the syllabus for the topic. */
  outline: string[];
  /** Finished lessons only, so the app never shows an empty page. */
  lessons: LessonInfo[];
  /** The topic's lessons.ts. Needed once the topic has a finished lesson. */
  content?: LazyDefault<TopicContent>;
}

/** A lesson with its topic and URL, used for search and prev/next links. */
export interface LessonRef {
  topic: Topic;
  lesson: LessonInfo;
  url: string;
}
