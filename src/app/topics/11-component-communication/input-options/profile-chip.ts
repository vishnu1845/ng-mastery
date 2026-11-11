import { booleanAttribute, Component, input, numberAttribute, OnInit, signal } from '@angular/core';

/** A chip that shows, next to itself, the exact value and type each input received. */
@Component({
  selector: 'app-profile-chip',
  styleUrl: './profile-chip.scss',
  template: `
    <span class="chip" [style.font-size.px]="size()">
      {{ name() }}
      @if (verified()) {
        <span class="tick" aria-label="verified">✓</span>
      }
      @if (caption()) {
        <span class="caption">{{ caption() }}</span>
      }
    </span>

    <dl class="received">
      <dt>name</dt>
      <dd>{{ show(name()) }}</dd>
      <dt>size</dt>
      <dd>{{ show(size()) }}</dd>
      <dt>verified</dt>
      <dd>{{ show(verified()) }}</dd>
    </dl>
  `,
})
export class ProfileChip implements OnInit {
  // REQUIRED: the parent must bind it, or the build fails with NG8008
  readonly name = input.required<string>();

  // DEFAULT + TRANSFORM: size="40" arrives as the string "40" and leaves as the number 40
  readonly size = input(14, { transform: numberAttribute });

  // BOOLEAN ATTRIBUTE: a bare `verified` becomes true, verified="false" becomes false
  readonly verified = input(false, { transform: booleanAttribute });

  // ALIAS: the parent writes [caption], the class reads label
  // eslint-disable-next-line @angular-eslint/no-input-rename -- shown on purpose; the style guide avoids aliases
  readonly caption = input('', { alias: 'label' });

  // WHEN ARE INPUTS READY? Read in the constructor and again in ngOnInit
  readonly early: { name: string; size: string };
  readonly onInit = signal({ name: '', size: '' });

  constructor() {
    // Reading this.name() right here fails the build (NG8118), so we go through a helper
    this.early = { name: this.readName(), size: String(this.size()) };
  }

  ngOnInit(): void {
    this.onInit.set({ name: this.readName(), size: String(this.size()) });
  }

  // The compiler can't see through a method call, so this one fails at runtime instead
  private readName(): string {
    try {
      return `"${this.name()}"`;
    } catch (error) {
      return error instanceof Error ? error.message.split('\n')[0] : String(error);
    }
  }

  protected show(value: unknown): string {
    return `${JSON.stringify(value)} (${typeof value})`;
  }
}
