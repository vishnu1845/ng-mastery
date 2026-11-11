import {
  afterNextRender,
  afterRenderEffect,
  Directive,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

// ADDING AN ELEMENT

/** Adds a "NEW" tag to its host through Angular's Renderer2. */
@Directive({ selector: '[appRendererTag]' })
export class RendererTag {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const renderer = inject(Renderer2);

    afterNextRender(() => {
      const tag = renderer.createElement('span');
      renderer.addClass(tag, 'tag');
      renderer.appendChild(tag, renderer.createText('NEW'));
      renderer.appendChild(host, tag);
    });
  }
}

/** Adds the same tag with the browser's own DOM API. */
@Directive({ selector: '[appDomTag]' })
export class DomTag {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

    afterNextRender(() => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = 'NEW';
      host.append(tag);
    });
  }
}

// WRITING HTML

/** Writes an HTML string into its host through Renderer2. Nothing is cleaned. */
@Directive({ selector: '[appRendererHtml]' })
export class RendererHtml {
  readonly html = input.required<string>({ alias: 'appRendererHtml' });

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const renderer = inject(Renderer2);

    afterRenderEffect(() => renderer.setProperty(host, 'innerHTML', this.html()));
  }
}

/** Writes an HTML string into its host directly. Nothing is cleaned here either. */
@Directive({ selector: '[appDomHtml]' })
export class DomHtml {
  readonly html = input.required<string>({ alias: 'appDomHtml' });

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

    afterRenderEffect(() => {
      host.innerHTML = this.html();
    });
  }
}
