import { Component, computed, inject, input, resource, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { parseNotes } from '@core/content/notes';
import { Lesson, Topic } from '@core/models/topic.model';
import { ProgressStore } from '@core/progress/progress-store';
import { Markdown } from '@shared/ui/markdown/markdown';
import { CodeViewer } from '@shared/ui/code-viewer/code-viewer';
import { Catalog, lessonUrl, topicNumber } from '@topics/catalog';

type LessonTab = 'notes' | 'code';

/**
 * The page frame for every lesson:
 * topic header → lesson links → definition → live demo → Notes / Code tabs → previous / next.
 * The demo itself is the routed child component, rendered in the <router-outlet>.
 */
@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIcon, Markdown, CodeViewer],
  selector: 'app-topic-shell',
  styleUrl: './topic-shell.scss',
  templateUrl: './topic-shell.html',
})
export default class TopicShell {
  private readonly catalog = inject(Catalog);
  protected readonly progress = inject(ProgressStore);

  /** Bound from route data by withComponentInputBinding(). */
  readonly topic = input.required<Topic>();

  protected readonly lesson = signal<Lesson | undefined>(undefined);
  protected readonly tab = signal<LessonTab>('notes');

  protected readonly number = computed(() => topicNumber(this.topic()));
  protected readonly part = computed(() => this.catalog.partOf(this.topic()));

  protected readonly files = computed(() => {
    const lesson = this.lesson();
    return lesson ? this.catalog.sourceFiles(this.topic(), lesson) : [];
  });

  protected readonly neighbours = computed(() => {
    const lesson = this.lesson();
    return lesson ? this.catalog.neighbours(this.topic(), lesson) : {};
  });

  protected readonly notes = resource({
    params: () => this.lesson(),
    loader: async ({ params }) => parseNotes((await params.notes()).default),
  });

  protected readonly isDone = computed(() => {
    const lesson = this.lesson();
    return !!lesson && this.progress.isDone(this.topic().slug, lesson.slug);
  });

  /** Called by <router-outlet (activate)> whenever a lesson route opens. */
  protected onLessonOpen(data: Record<string, unknown>): void {
    const lesson = data['lesson'] as Lesson;
    this.lesson.set(lesson);
    this.tab.set('notes');
    this.progress.rememberLesson(lessonUrl(this.topic(), lesson));
  }

  protected toggleDone(): void {
    const lesson = this.lesson();
    if (lesson) this.progress.toggle(this.topic().slug, lesson.slug);
  }
}
