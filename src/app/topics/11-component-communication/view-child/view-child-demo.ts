import { Component, computed, signal, viewChildren } from '@angular/core';
import { Question } from './question';
import { QueryTiming } from './query-timing';

/** A parent that counts, checks, resets and focuses its children through queries. */
@Component({
  selector: 'app-view-child-demo',
  imports: [Question, QueryTiming],
  styleUrl: './view-child-demo.scss',
  templateUrl: './view-child-demo.html',
})
export default class ViewChildDemo {
  // QUERIES: signals of the child instances
  private readonly questions = viewChildren(Question);

  protected readonly texts = [
    'What does input() replace?',
    'Which function makes a two-way input?',
    'What does viewChildren() return?',
  ];

  // Follows every child's answer() signal, no lifecycle hook and no manual refresh
  protected readonly answered = computed(
    () => this.questions().filter((question) => question.isAnswered()).length,
  );
  protected readonly allAnswered = computed(() => this.answered() === this.questions().length);
  protected readonly submitted = signal('');

  protected submit(): void {
    const answers = this.questions().map((question) => question.answer().trim());
    this.submitted.set(answers.join(' · '));
  }

  protected resetAll(): void {
    this.questions().forEach((question) => question.reset());
    this.submitted.set('');
  }

  protected focusFirstEmpty(): void {
    this.questions()
      .find((question) => !question.isAnswered())
      ?.focus();
  }
}
