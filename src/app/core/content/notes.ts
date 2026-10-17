import { marked } from 'marked';
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

/** Markdown → HTML. Angular still sanitizes the result when it is bound to [innerHTML]. */
export function renderMarkdown(markdown: string): string {
  const html = marked.parse(markdown, { async: false, gfm: true });

  // Wide tables scroll inside their own box on phones (.table-wrap is a global utility)
  return html
    .replaceAll('<table>', '<div class="table-wrap"><table>')
    .replaceAll('</table>', '</table></div>');
}
