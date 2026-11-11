import { afterNextRender, Component, inject, signal } from '@angular/core';
import { HookLog } from '../_shared/hook-log';
import { HookTimeline } from '../_shared/hook-timeline';
import { HOOKS } from '../_shared/logged';
import { Parent } from './family';

/** Creates, updates and removes three components, and shows every hook they ran, in order. */
@Component({
  selector: 'app-visualizer-demo',
  imports: [Parent, HookTimeline],
  providers: [HookLog],
  styleUrl: './visualizer-demo.scss',
  templateUrl: './visualizer-demo.html',
})
export default class VisualizerDemo {
  protected readonly log = inject(HookLog);
  protected readonly hooks = HOOKS;
  protected readonly who = ['Parent', 'Child', 'Projected'];

  protected readonly shown = signal(false);
  protected readonly value = signal(1);

  constructor() {
    // Created in the browser after the first render, so every hook is logged live
    afterNextRender(() => this.create());
  }

  protected create(): void {
    this.log.begin('Create the components');
    this.shown.set(true);
  }

  protected change(): void {
    this.log.begin(`Change the input to ${this.value() + 1}`);
    this.value.update((value) => value + 1);
  }

  // A click marks this view for checking, but no value changes
  protected check(): void {
    this.log.begin('Click, nothing changes');
  }

  protected remove(): void {
    this.log.begin('Remove the components');
    this.shown.set(false);
  }
}
