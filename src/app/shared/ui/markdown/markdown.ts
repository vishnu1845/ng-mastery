import { Component, computed, input } from '@angular/core';
import { renderMarkdown } from '@core/content/notes';

/** Renders a markdown string (lesson notes). Styles come from the global .prose class. */
@Component({
  host: { class: 'prose', '[innerHTML]': 'html()' },
  selector: 'app-markdown',
  template: '',
})
export class Markdown {
  readonly content = input.required<string>();

  protected readonly html = computed(() => renderMarkdown(this.content()));
}
