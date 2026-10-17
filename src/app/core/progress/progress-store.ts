import { afterNextRender, computed, inject, Service, signal } from '@angular/core';
import { BrowserStorage } from '../platform/browser-storage';

const DONE_KEY = 'ngm-done';
const LAST_KEY = 'ngm-last-lesson';

/**
 * Personal study progress: lessons marked as done and the last lesson opened.
 * Saved in localStorage. It loads after the first render, so the server HTML and the
 * first browser render match exactly (no hydration mismatch).
 */
@Service()
export class ProgressStore {
  private readonly storage = inject(BrowserStorage);

  private readonly done = signal<ReadonlySet<string>>(new Set());
  readonly lastLessonUrl = signal<string | null>(null);
  readonly doneCount = computed(() => this.done().size);

  constructor() {
    afterNextRender(() => {
      this.done.set(new Set(readList(this.storage.get(DONE_KEY))));
      this.lastLessonUrl.set(this.storage.get(LAST_KEY));
    });
  }

  isDone(topicSlug: string, lessonSlug: string): boolean {
    return this.done().has(`${topicSlug}/${lessonSlug}`);
  }

  toggle(topicSlug: string, lessonSlug: string): void {
    const key = `${topicSlug}/${lessonSlug}`;
    this.done.update((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    this.storage.set(DONE_KEY, JSON.stringify([...this.done()]));
  }

  rememberLesson(url: string): void {
    this.lastLessonUrl.set(url);
    this.storage.set(LAST_KEY, url);
  }
}

function readList(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}
