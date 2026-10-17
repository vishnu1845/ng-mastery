import { Component, inject, input, PLATFORM_ID, resource, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { CodeHighlighter, CodeLang } from '@core/content/code-highlighter';

/**
 * A highlighted, copyable code block.
 * The server renders plain code; the browser swaps in Shiki colors after load.
 */
@Component({
  imports: [NgIcon],
  selector: 'app-code-block',
  styleUrl: './code-block.scss',
  templateUrl: './code-block.html',
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly lang = input<CodeLang>('angular-ts');
  /** Shown in the header, e.g. a file path. */
  readonly label = input<string>();

  private readonly highlighter = inject(CodeHighlighter);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly highlighted = resource({
    params: () => (this.isBrowser ? { code: this.code(), lang: this.lang() } : undefined),
    loader: ({ params }) => this.highlighter.toHtml(params.code, params.lang),
  });

  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }
}
