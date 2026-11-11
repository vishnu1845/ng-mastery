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
import { watchChanges } from '@shared/utils/dom-watch';
import { DomHtml, DomTag, RendererHtml, RendererTag } from './dom-writers';

interface TagReport {
  html: string;
  styled: boolean;
}

/** Three ways to change the DOM, measured: who gets the component's styles, and who cleans HTML. */
@Component({
  selector: 'app-renderer2-demo',
  imports: [RendererTag, DomTag, RendererHtml, DomHtml],
  styleUrl: './renderer2-demo.scss',
  templateUrl: './renderer2-demo.html',
})
export default class Renderer2Demo {
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');

  // UNSAFE HTML: a harmless stand-in for an attack
  protected readonly attempt = signal(1);
  protected readonly payload = computed(
    () => `<b onclick="this.textContent='Hacked!'">Click this text (try ${this.attempt()})</b>`,
  );

  // WHAT THE DOM REALLY CONTAINS
  protected readonly tags = signal<Record<string, TagReport>>({});
  protected readonly boxes = signal<Record<string, string>>({});

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stage = this.stage().nativeElement;
      const read = () => {
        const tags: Record<string, TagReport> = {};
        stage.querySelectorAll<HTMLElement>('[data-way]').forEach((item) => {
          const tag = item.querySelector('.tag');
          tags[item.dataset['way'] ?? ''] = {
            html: tag?.outerHTML ?? '',
            // The scoped .tag rule gives the tag a pill shape. Unstyled, the radius is 0px.
            styled: !!tag && getComputedStyle(tag).borderTopLeftRadius !== '0px',
          };
        });
        this.tags.set(tags);

        const boxes: Record<string, string> = {};
        stage.querySelectorAll<HTMLElement>('[data-box]').forEach((box) => {
          boxes[box.dataset['box'] ?? ''] = box.innerHTML;
        });
        this.boxes.set(boxes);
      };
      read();
      destroyRef.onDestroy(watchChanges(stage, read));
    });
  }
}
