import { Component, contentChild, signal, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

// The same two jobs, written twice:
//   with <ng-content>   → shows content the parent already created
//   with a template     → creates the content itself, when and as often as it wants

/** Hides its body with @if around <ng-content>. */
@Component({
  selector: 'app-content-collapsible',
  styleUrl: './boxes.scss',
  template: `
    <button type="button" class="btn-ghost" (click)="open.set(!open())">
      {{ open() ? 'Close' : 'Open' }}
    </button>
    @if (open()) {
      <ng-content />
    }
  `,
})
export class ContentCollapsible {
  protected readonly open = signal(false);
}

/** Hides its body with @if around a template it stamps. */
@Component({
  selector: 'app-template-collapsible',
  imports: [NgTemplateOutlet],
  styleUrl: './boxes.scss',
  template: `
    <button type="button" class="btn-ghost" (click)="open.set(!open())">
      {{ open() ? 'Close' : 'Open' }}
    </button>
    @if (open()) {
      <ng-container [ngTemplateOutlet]="body()" />
    }
  `,
})
export class TemplateCollapsible {
  protected readonly open = signal(false);
  // The <ng-template> the parent put between our tags
  protected readonly body = contentChild.required(TemplateRef);
}

/** <ng-content> inside @for: the content can be in one place only. */
@Component({
  selector: 'app-content-repeat',
  styleUrl: './boxes.scss',
  template: `
    @for (row of [1, 2, 3]; track row) {
      <p class="row">Row {{ row }}: <ng-content /></p>
    }
  `,
})
export class ContentRepeat {}

/** A template inside @for: stamped once per row, with the row number as context. */
@Component({
  selector: 'app-template-repeat',
  imports: [NgTemplateOutlet],
  styleUrl: './boxes.scss',
  template: `
    @for (row of [1, 2, 3]; track row) {
      <p class="row">
        Row {{ row }}:
        <ng-container [ngTemplateOutlet]="item()" [ngTemplateOutletContext]="{ $implicit: row }" />
      </p>
    }
  `,
})
export class TemplateRepeat {
  protected readonly item = contentChild.required(TemplateRef);
}
