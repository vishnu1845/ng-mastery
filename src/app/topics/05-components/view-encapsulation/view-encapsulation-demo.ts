import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { CodeBlock } from '@shared/ui/code-block/code-block';
import { EmulatedMsg, NoneMsg, ShadowMsg } from './messages';

interface Generated {
  emulatedAttribute: string;
  emulatedRule: string;
  noneRule: string | null;
}

/** Three encapsulation modes side by side, plus what Angular really generated for them. */
@Component({
  imports: [EmulatedMsg, NoneMsg, ShadowMsg, CodeBlock],
  selector: 'app-view-encapsulation-demo',
  styleUrl: './view-encapsulation-demo.scss',
  templateUrl: './view-encapsulation-demo.html',
})
export default class ViewEncapsulationDemo {
  private readonly injector = inject(Injector);
  private readonly emulated = viewChild.required(EmulatedMsg, { read: ElementRef });
  private readonly shadow = viewChild(ShadowMsg, { read: ElementRef });

  // Shadow DOM is a browser feature, so that component renders after the first browser render
  protected readonly inBrowser = signal(false);
  protected readonly showNone = signal(false);
  protected readonly generated = signal<Generated | null>(null);

  // viewChild() is a signal, so this updates as soon as the ShadowDom component appears
  protected readonly hasShadowRoot = computed(() => !!this.shadow()?.nativeElement.shadowRoot);

  protected readonly generatedCss = computed(() => {
    const g = this.generated();
    if (!g) return '';
    return [
      `/* Emulated: every element in the template gets ${g.emulatedAttribute} */`,
      g.emulatedRule,
      '',
      '/* None: copied to the page as-is */',
      g.noneRule ?? '(not on the page right now)',
    ].join('\n');
  });

  constructor() {
    afterNextRender(() => {
      this.inBrowser.set(true);
      this.inspect();
    });
  }

  protected toggleNone(): void {
    this.showNone.update((on) => !on);
    // Look again once Angular has added or removed the component (and its global style)
    afterNextRender(() => this.inspect(), { injector: this.injector });
  }

  // READ THE REAL DOM AND CSS FROM THIS PAGE
  private inspect(): void {
    const paragraph = this.emulated().nativeElement.querySelector('.encap-msg');
    const attribute =
      paragraph?.getAttributeNames().find((name: string) => name.startsWith('_ngcontent-')) ?? '';

    this.generated.set({
      emulatedAttribute: attribute,
      emulatedRule: findRule((selector) => selector.includes(attribute)) ?? '(not found)',
      noneRule: findRule((selector) => selector.trim() === '.encap-msg'),
    });
  }
}

/** Searches every stylesheet on the page for a .encap-msg rule whose selector matches. */
function findRule(matches: (selector: string) => boolean): string | null {
  for (const sheet of Array.from(document.styleSheets)) {
    for (const rule of Array.from(sheet.cssRules)) {
      if (rule instanceof CSSStyleRule && rule.selectorText.includes('.encap-msg')) {
        if (matches(rule.selectorText)) return rule.cssText;
      }
    }
  }
  return null;
}
