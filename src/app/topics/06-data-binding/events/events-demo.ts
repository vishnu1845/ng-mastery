import { Component, signal } from '@angular/core';
import { EmojiPicker } from './emoji-picker';

interface LogEntry {
  id: number;
  binding: string;
  type: string;
  detail: string;
}

/** Fire real events and see exactly what $event was each time. */
@Component({
  imports: [EmojiPicker],
  selector: 'app-events-demo',
  styleUrl: './events-demo.scss',
  templateUrl: './events-demo.html',
})
export default class EventsDemo {
  private nextId = 0;

  // COMPONENT STATE
  protected readonly clicks = signal(0);
  protected readonly query = signal('');
  protected readonly city = signal('Pune');
  protected readonly mood = signal('');
  protected readonly pointer = signal<{ x: number; y: number } | null>(null);
  protected readonly log = signal<LogEntry[]>([]);

  // HANDLERS: each one receives the typed $event from the template
  protected onClick(event: PointerEvent): void {
    this.clicks.update((count) => count + 1);
    const how = event.pointerType || 'keyboard';
    const [x, y] = [Math.round(event.offsetX), Math.round(event.offsetY)];
    this.record('(click)', event, `pointerType: ${how}, x: ${x}, y: ${y}`);
  }

  protected onInput(event: InputEvent, value: string): void {
    this.record('(input)', event, `inputType: ${event.inputType}, target.value: "${value}"`);
  }

  protected onChange(event: Event, value: string): void {
    this.record('(change)', event, `target.value: "${value}"`);
  }

  // offsetX/Y can be fractions, so we round them for display
  protected onPointerMove(event: PointerEvent): void {
    this.pointer.set({ x: Math.round(event.offsetX), y: Math.round(event.offsetY) });
  }

  protected onPointerDown(event: PointerEvent): void {
    this.onPointerMove(event);
    this.record(
      '(pointerdown)',
      event,
      `x: ${Math.round(event.offsetX)}, y: ${Math.round(event.offsetY)}`,
    );
  }

  protected onPicked(emoji: string): void {
    this.mood.set(emoji);
    this.record('(picked)', emoji, `the emitted value: "${emoji}"`);
  }

  // LOG: newest first, real constructor names for DOM events
  private record(binding: string, event: unknown, detail: string): void {
    const type = event instanceof Event ? event.constructor.name : `${typeof event} (not an Event)`;
    this.log.update((entries) =>
      [{ id: this.nextId++, binding, type, detail }, ...entries].slice(0, 6),
    );
  }
}
