import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const DRAFT_KEY = 'ngm-effect-draft';

interface Run {
  id: number;
  text: string;
}

/** Two real side effects: saving to localStorage, and a log that shows how often effects run. */
@Component({
  selector: 'app-effect-demo',
  styleUrl: './effect-demo.scss',
  templateUrl: './effect-demo.html',
})
export default class EffectDemo {
  // This page is also rendered on the server, where localStorage doesn't exist
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private nextId = 0;

  // AUTOSAVE STATE
  protected readonly draft = signal(this.isBrowser ? (localStorage.getItem(DRAFT_KEY) ?? '') : '');
  protected readonly saves = signal(0);
  protected readonly savedAt = signal('');

  // BATCHING STATE
  protected readonly count = signal(0);
  protected readonly runs = signal<Run[]>([]);

  constructor() {
    // SIDE EFFECT 1: keep localStorage in sync with the draft
    effect(() => {
      const draft = this.draft();
      if (!this.isBrowser) return;
      localStorage.setItem(DRAFT_KEY, draft);
      this.saves.update((saves) => saves + 1);
      this.savedAt.set(new Date().toLocaleTimeString());
    });

    // SIDE EFFECT 2: log every run, so we can count them
    effect(() => {
      const text = `effect ran, count() = ${this.count()}`;
      this.runs.update((runs) => [{ id: this.nextId++, text }, ...runs].slice(0, 6));
    });
  }

  protected addOne(): void {
    this.count.update((count) => count + 1);
  }

  // Three changes in a row, but the effect runs once, with the last value
  protected addThreeInARow(): void {
    this.count.update((count) => count + 1);
    this.count.update((count) => count + 1);
    this.count.update((count) => count + 1);
  }
}
