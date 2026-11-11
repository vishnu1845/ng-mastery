import { NgClass, NgStyle } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { openingTag, watchChanges, withoutScoping } from '@shared/utils/dom-watch';

/** The same button styled by NgClass / NgStyle and by plain bindings, then where the two differ. */
@Component({
  selector: 'app-class-style-directives-demo',
  imports: [FormsModule, NgClass, NgStyle],
  styleUrl: './class-style-directives-demo.scss',
  templateUrl: './class-style-directives-demo.html',
})
export default class ClassStyleDirectivesDemo {
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');

  // CONTROLS (bound with NgModel, the third built-in attribute directive)
  protected readonly bold = signal(true);
  protected readonly rounded = signal(false);
  protected readonly danger = signal(false);
  protected readonly size = signal(16);
  protected readonly email = signal('');

  protected readonly classes = computed(() => ({
    'is-bold': this.bold(),
    'is-rounded': this.rounded(),
    'is-danger': this.danger(),
  }));

  // WHERE THEY DIFFER: one plain object, changed in place
  protected readonly flags: Record<string, boolean> = { 'is-danger': false };
  protected readonly twoClasses = { 'is-bold is-rounded': true };
  protected readonly withUnit = { 'font-size.px': 22 };

  // THE REAL OPENING TAGS
  protected readonly tags = signal<Record<string, string>>({});

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stage = this.stage().nativeElement;
      const read = () => {
        const tags: Record<string, string> = {};
        stage.querySelectorAll<HTMLElement>('[data-tag]').forEach((element) => {
          tags[element.dataset['tag'] ?? ''] = withoutScoping(
            openingTag(element.outerHTML),
          ).replace(/ data-tag="[^"]*"/, '');
        });
        this.tags.set(tags);
      };
      read();
      destroyRef.onDestroy(watchChanges(stage, read));
    });
  }

  // Same object, new value inside. No new reference is created.
  protected mutate(): void {
    this.flags['is-danger'] = !this.flags['is-danger'];
  }
}
