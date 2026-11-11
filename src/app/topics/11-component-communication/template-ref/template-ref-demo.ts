import { Component, signal } from '@angular/core';
import { EventLog, LogBook } from '../_shared/event-log';
import { PlainPlayer, SignalPlayer } from './players';

/** The parent drives a child through #player (pull) and hears its output (push). */
@Component({
  selector: 'app-template-ref-demo',
  imports: [SignalPlayer, PlainPlayer, EventLog],
  styleUrl: './template-ref-demo.scss',
  templateUrl: './template-ref-demo.html',
})
export default class TemplateRefDemo {
  protected readonly kind = signal<'signal' | 'plain'>('signal');
  protected readonly log = new LogBook(4);

  protected readonly kinds = [
    { id: 'signal', label: 'position = signal(0)' },
    { id: 'plain', label: 'position = 0' },
  ] as const;

  protected finished(): void {
    this.log.add('output', 'The child pushed (finished): the track ended');
  }
}
