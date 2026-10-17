import { Component, output } from '@angular/core';

/** A child component whose output emits a plain string, so $event is that string. */
@Component({
  selector: 'app-emoji-picker',
  template: `
    @for (emoji of emojis; track emoji) {
      <button
        type="button"
        class="emoji"
        [attr.aria-label]="'Pick ' + emoji"
        (click)="picked.emit(emoji)"
      >
        {{ emoji }}
      </button>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }

    .emoji {
      padding: 0 var(--space-3);
      font-size: 1.1rem;
    }
  `,
})
export class EmojiPicker {
  readonly picked = output<string>();

  protected readonly emojis = ['🔥', '🚀', '😎', '💯'];
}
