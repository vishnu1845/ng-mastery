import { Component, input, signal } from '@angular/core';

export interface LogEntry {
  id: number;
  /** Which way the message went, shown as a small label. */
  channel: string;
  text: string;
  /** typeof the value that travelled, so the reader sees what $event really is. */
  type?: string;
}

/** A list of messages for one demo. Newest first, at most `limit` kept. */
export class LogBook {
  private nextId = 1;
  readonly entries = signal<LogEntry[]>([]);

  constructor(private readonly limit = 6) {}

  add(channel: string, text: string): void {
    this.push({ id: this.nextId++, channel, text });
  }

  /** Also records the type of the value that travelled. */
  addValue(channel: string, text: string, value: unknown): void {
    this.push({ id: this.nextId++, channel, text, type: typeLabel(value) });
  }

  clear(): void {
    this.entries.set([]);
  }

  private push(entry: LogEntry): void {
    this.entries.update((entries) => [entry, ...entries].slice(0, this.limit));
  }
}

/** Shows a LogBook: what travelled between the components, newest first. */
@Component({
  selector: 'app-event-log',
  styleUrl: './event-log.scss',
  template: `
    <p class="title">{{ title() }}</p>
    <ol class="entries" aria-live="polite">
      @for (entry of entries(); track entry.id) {
        <li>
          <span class="badge">{{ entry.channel }}</span>
          <span class="text">{{ entry.text }}</span>
          @if (entry.type) {
            <code class="type">{{ entry.type }}</code>
          }
        </li>
      } @empty {
        <li class="empty">{{ empty() }}</li>
      }
    </ol>
  `,
})
export class EventLog {
  readonly entries = input.required<LogEntry[]>();
  readonly title = input('What travelled');
  readonly empty = input('Nothing yet. Use the demo above.');
}

function typeLabel(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}
