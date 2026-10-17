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

/** One subtopic: a small live demo + short notes. */
export interface Lesson {
  slug: string;
  title: string;
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

/** One Notion topic = one folder in src/app/topics. */
export interface Topic {
  id: number;
  slug: string;
  title: string;
  part: PartId;
  /** Every planned lesson slug, in order. This is the syllabus for the topic. */
  outline: string[];
  /** Finished lessons only, so the app never shows an empty page. */
  lessons: Lesson[];
}

/** A lesson with its topic and URL, used for search and prev/next links. */
export interface LessonRef {
  topic: Topic;
  lesson: Lesson;
  url: string;
}
