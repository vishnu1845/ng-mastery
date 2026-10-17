import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressStore } from '@core/progress/progress-store';
import { Catalog, isLive, topicNumber } from '@topics/catalog';
import { SignalCard } from './signal-card/signal-card';

/** Home: a short intro with a live signal demo, and the full 52-topic map. */
@Component({
  imports: [RouterLink, SignalCard],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export default class Home {
  protected readonly catalog = inject(Catalog);
  protected readonly progress = inject(ProgressStore);

  protected readonly topicNumber = topicNumber;
  protected readonly isLive = isLive;

  private readonly firstLessonUrl = this.catalog.lessonPath[0]?.url ?? '/';

  protected readonly startUrl = computed(
    () => this.progress.lastLessonUrl() ?? this.firstLessonUrl,
  );
  protected readonly startLabel = computed(() =>
    this.progress.lastLessonUrl() ? 'Continue where you left off' : 'Start with topic 01',
  );
}
