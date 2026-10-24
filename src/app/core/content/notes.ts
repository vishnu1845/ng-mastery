import { Marked, Tokens } from 'marked';
import { CodeLang } from './code-highlighter';

/** One piece of a notes section: prose (markdown) or a fenced code block. */
export type NoteBlock =
  | { kind: 'text'; markdown: string }
  | { kind: 'code'; code: string; lang: CodeLang; label: string };

export interface NoteSection {
  title: string;
  blocks: NoteBlock[];
}

export interface LessonNotes {
  /** The "## Definition" section, shown at the top of the lesson. */
  definition: string;
  /** Every other "## ..." section, shown in the Notes tab. */
  sections: NoteSection[];
}

// Fence name in notes.md (```ts) → Shiki grammar + the label shown on the block
const FENCES: Record<string, { lang: CodeLang; label: string }> = {
  ts: { lang: 'angular-ts', label: 'TypeScript' },
  html: { lang: 'angular-html', label: 'HTML' },
  scss: { lang: 'scss', label: 'SCSS' },
  json: { lang: 'json', label: 'JSON' },
  bash: { lang: 'bash', label: 'Terminal' },
  text: { lang: 'text', label: 'Text' },
};

const CODE_FENCE = /^```(\w*)\n([\s\S]*?)^```[ \t]*$/gm;

/**
 * Splits a lesson's notes.md into sections by its "## " headings.
 * Expected headings: Definition, Key points, Say it like this (more are allowed).
 */
export function parseNotes(markdown: string): LessonNotes {
  const sections: NoteSection[] = [];
  let definition = '';

  for (const chunk of markdown.split(/^## /m).slice(1)) {
    const newline = chunk.indexOf('\n');
    const title = (newline === -1 ? chunk : chunk.slice(0, newline)).trim();
    const body = newline === -1 ? '' : chunk.slice(newline + 1).trim();

    if (title.toLowerCase() === 'definition') {
      definition = body;
    } else {
      sections.push({ title, blocks: splitBlocks(body) });
    }
  }

  return { definition, sections };
}

/** Pulls fenced code out of markdown, so code can be highlighted and prose stays markdown. */
export function splitBlocks(markdown: string): NoteBlock[] {
  const blocks: NoteBlock[] = [];
  let textStart = 0;

  for (const match of markdown.matchAll(CODE_FENCE)) {
    const start = match.index ?? 0;
    addText(blocks, markdown.slice(textStart, start));

    const fence = FENCES[match[1] || 'ts'] ?? FENCES['ts'];
    blocks.push({ kind: 'code', code: match[2].trimEnd(), ...fence });
    textStart = start + match[0].length;
  }

  addText(blocks, markdown.slice(textStart));
  return blocks;
}

function addText(blocks: NoteBlock[], markdown: string): void {
  const text = markdown.trim();
  if (text) blocks.push({ kind: 'text', markdown: text });
}

// GLOSSARY LINKS: [[signal]] or [[zoneless|zoneless apps]] link a word to its glossary page.
// Inside a table row the pipe is written \| so it doesn't split the cell: [[zoneless\|zoneless apps]]
const TERM_LINK = /^\[\[([^\]|\\]+)(?:\\?\|([^\]]+))?\]\]/;
const TERM_LINKS_ANYWHERE = /\[\[([^\]|\\]+)(?:\\?\|[^\]]+)?\]\]/g;

/** "Zone.js" → "zone-js", "change detection" → "change-detection", "computed()" → "computed". */
export function termSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Every glossary slug a notes file links to (used by the tests to catch broken links). */
export function glossaryRefs(markdown: string): string[] {
  return [...markdown.matchAll(TERM_LINKS_ANYWHERE)].map((match) => termSlug(match[1]));
}

const markdown = new Marked({
  gfm: true,
  extensions: [
    {
      name: 'term',
      level: 'inline',
      start: (source) => source.indexOf('[['),
      tokenizer(source) {
        const match = TERM_LINK.exec(source);
        if (!match) return undefined;
        const [raw, target, text] = match;
        return {
          type: 'term',
          raw,
          slug: termSlug(target),
          tokens: this.lexer.inlineTokens((text ?? target).trim()),
        };
      },
      renderer(token) {
        const text = this.parser.parseInline((token as Tokens.Generic).tokens ?? []);
        return `<a class="term" href="/glossary/${token['slug']}">${text}</a>`;
      },
    },
  ],
});

/** Markdown → HTML. Angular still sanitizes the result when it is bound to [innerHTML]. */
export function renderMarkdown(source: string): string {
  const html = markdown.parse(source, { async: false });

  // Wide tables scroll inside their own box on phones (.table-wrap is a global utility)
  return html
    .replaceAll('<table>', '<div class="table-wrap"><table>')
    .replaceAll('</table>', '</table></div>');
}
