import { Component, signal } from '@angular/core';

interface KeyRow {
  id: number;
  keys: string;
  code: string;
  fired: string[];
}

const MODIFIERS = ['Shift', 'Control', 'Alt', 'Meta'];

/**
 * A chat box built only with key event filters.
 * The plain (keydown) listener comes first in the template, so it starts each log row
 * and the filters that match add their names to it.
 */
@Component({
  selector: 'app-key-events-demo',
  styleUrl: './key-events-demo.scss',
  templateUrl: './key-events-demo.html',
})
export default class KeyEventsDemo {
  private nextId = 0;

  // CHAT STATE
  protected readonly draft = signal('');
  protected readonly messages = signal([
    'Hey! Try Enter, Shift+Enter, Esc and ↑ in the box below.',
  ]);
  protected readonly savedAt = signal('');

  // KEY LOG
  protected readonly rows = signal<KeyRow[]>([]);

  // EVERY KEY: starts a log row
  protected pressed(event: KeyboardEvent): void {
    if (MODIFIERS.includes(event.key)) return;
    const held = [
      event.ctrlKey && 'Ctrl',
      event.altKey && 'Alt',
      event.shiftKey && 'Shift',
      event.metaKey && 'Meta',
    ].filter(Boolean);
    const key = event.key === ' ' ? 'Space' : event.key;
    const row: KeyRow = {
      id: this.nextId++,
      keys: [...held, key].join(' + '),
      code: event.code,
      fired: [],
    };
    this.rows.update((rows) => [row, ...rows].slice(0, 6));
  }

  // (keydown.enter): send, and stop the browser from adding a new line.
  // With a key filter, the template types $event as a plain Event, which is all we need here.
  protected send(event: Event): void {
    this.fired('keydown.enter');
    event.preventDefault();
    this.sendDraft();
  }

  // (keydown.shift.enter): nothing to do, the browser adds the new line itself
  protected newLine(): void {
    this.fired('keydown.shift.enter');
  }

  // (keydown.escape)
  protected clear(): void {
    this.fired('keydown.escape');
    this.draft.set('');
  }

  // (keydown.arrowUp): like Slack, edit the last message when the box is empty
  protected editLast(event: Event): void {
    this.fired('keydown.arrowUp');
    const last = this.messages().at(-1);
    if (this.draft() || !last) return;
    event.preventDefault();
    this.messages.update((list) => list.slice(0, -1));
    this.draft.set(last);
  }

  // (keydown.alt.s) and (keydown.code.alt.keyS)
  protected saveDraft(event: Event, filter: string): void {
    this.fired(filter);
    event.preventDefault();
    this.savedAt.set(new Date().toLocaleTimeString());
  }

  protected sendDraft(): void {
    const text = this.draft().trim();
    if (!text) return;
    this.messages.update((list) => [...list, text]);
    this.draft.set('');
  }

  private fired(filter: string): void {
    this.rows.update(([latest, ...rest]) =>
      latest ? [{ ...latest, fired: [...latest.fired, filter] }, ...rest] : rest,
    );
  }
}
