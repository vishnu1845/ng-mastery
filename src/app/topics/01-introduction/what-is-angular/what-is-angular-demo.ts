import { Component, computed, signal } from '@angular/core';

/** A complete Angular component: a class with state, and a template that shows it. */
@Component({
  selector: 'app-what-is-angular-demo',
  styleUrl: './what-is-angular-demo.scss',
  templateUrl: './what-is-angular-demo.html',
})
export default class WhatIsAngularDemo {
  // STATE
  protected readonly name = signal('Angular');
  protected readonly likes = signal(0);

  // DERIVED STATE
  protected readonly greeting = computed(() => `Hello, ${this.name().trim() || 'stranger'}!`);

  protected like(): void {
    this.likes.update((count) => count + 1);
  }
}
