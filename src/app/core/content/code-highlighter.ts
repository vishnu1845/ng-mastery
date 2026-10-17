import { inject, Service } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import type { HighlighterCore } from 'shiki/core';

/** `text` is Shiki's built-in plain text (no grammar to load), used for folder trees and output. */
export type CodeLang = 'angular-ts' | 'angular-html' | 'scss' | 'json' | 'bash' | 'text';

/**
 * Syntax highlighting with Shiki (same grammars as VS Code, including Angular templates).
 * Shiki and its grammars are loaded lazily on first use, so they never touch the initial bundle.
 */
@Service()
export class CodeHighlighter {
  private readonly sanitizer = inject(DomSanitizer);
  private highlighter?: Promise<HighlighterCore>;

  async toHtml(code: string, lang: CodeLang): Promise<SafeHtml> {
    const highlighter = await (this.highlighter ??= loadHighlighter());
    const html = highlighter.codeToHtml(code, {
      lang,
      themes: { dark: 'github-dark-default', light: 'github-light-default' },
      defaultColor: false,
    });

    // Shiki escapes the source text and colors it with inline CSS variables.
    // Angular's sanitizer would strip those styles, so we trust this one known-safe output.
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

/** Picks the grammar from a file name. */
export function langFromPath(path: string): CodeLang {
  if (path.endsWith('.html')) return 'angular-html';
  if (path.endsWith('.scss') || path.endsWith('.css')) return 'scss';
  if (path.endsWith('.json')) return 'json';
  if (path.endsWith('.sh')) return 'bash';
  return 'angular-ts';
}

async function loadHighlighter(): Promise<HighlighterCore> {
  const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
  ]);

  return createHighlighterCore({
    themes: [
      import('shiki/themes/github-dark-default.mjs'),
      import('shiki/themes/github-light-default.mjs'),
    ],
    langs: [
      import('shiki/langs/angular-ts.mjs'),
      import('shiki/langs/angular-html.mjs'),
      import('shiki/langs/scss.mjs'),
      import('shiki/langs/json.mjs'),
      import('shiki/langs/bash.mjs'),
    ],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  });
}
