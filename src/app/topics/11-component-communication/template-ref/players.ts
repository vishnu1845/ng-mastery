import {
  Component,
  computed,
  DestroyRef,
  inject,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';

const TRACK_LENGTH = 30;

/** Shared timer logic: one tick per second while playing. */
abstract class Player {
  protected timer?: ReturnType<typeof setInterval>;

  /** PUSH: tells the parent when the track ends. Declared in each component, where output() is allowed. */
  abstract readonly finished: OutputEmitterRef<void>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  play(): void {
    if (this.timer) return;
    this.timer = setInterval(() => this.tick(), 1000);
  }

  pause(): void {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  protected abstract tick(): void;

  protected finish(): void {
    this.pause();
    this.finished.emit();
  }
}

/** The position is a signal, so every tick reaches every template that reads it. */
@Component({
  selector: 'app-signal-player',
  styleUrl: './player.scss',
  template: `
    <span class="track">🎵 Lo-fi focus mix</span>
    <progress max="30" [value]="position()" aria-label="Position"></progress>
    <span class="mono">{{ label() }}</span>
  `,
})
export class SignalPlayer extends Player {
  readonly finished = output<void>();
  readonly position = signal(0);
  readonly label = computed(() => `0:${String(this.position()).padStart(2, '0')}`);

  rewind(): void {
    this.position.set(0);
  }

  protected tick(): void {
    this.position.update((seconds) => seconds + 1);
    if (this.position() >= TRACK_LENGTH) this.finish();
  }
}

/** The same player with a plain property. Nothing tells Angular when it changes. */
@Component({
  selector: 'app-plain-player',
  styleUrl: './player.scss',
  template: `
    <span class="track">🎵 Lo-fi focus mix</span>
    <progress max="30" [value]="position" aria-label="Position"></progress>
    <span class="mono">0:{{ position < 10 ? '0' : '' }}{{ position }}</span>
  `,
})
export class PlainPlayer extends Player {
  readonly finished = output<void>();
  position = 0;

  rewind(): void {
    this.position = 0;
  }

  protected tick(): void {
    this.position++;
    if (this.position >= TRACK_LENGTH) this.finish();
  }
}
