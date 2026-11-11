import { Component } from '@angular/core';

/**
 * A panel with three slots. Each slot shows its selector, so the demo makes it visible
 * which slot every projected piece landed in.
 */
@Component({
  selector: 'app-panel',
  styleUrl: './panel.scss',
  template: `
    <header class="slot">
      <span class="slot-name">select="[panel-title]"</span>
      <ng-content select="[panel-title]" />
    </header>
    <div class="slot">
      <span class="slot-name">default slot</span>
      <ng-content />
    </div>
    <footer class="slot">
      <span class="slot-name">select="button, .actions"</span>
      <ng-content select="button, .actions" />
    </footer>
  `,
})
export class Panel {}

/** The same panel without a default slot: content that matches no slot has nowhere to go. */
@Component({
  selector: 'app-strict-panel',
  styleUrl: './panel.scss',
  template: `
    <header class="slot">
      <span class="slot-name">select="[panel-title]"</span>
      <ng-content select="[panel-title]" />
    </header>
    <footer class="slot">
      <span class="slot-name">select="button, .actions"</span>
      <ng-content select="button, .actions" />
    </footer>
  `,
})
export class StrictPanel {}
