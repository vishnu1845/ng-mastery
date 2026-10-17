import { marked } from 'marked';

export interface NoteSection {
  title: string;
  body: string;
}

export interface LessonNotes {
  /** The "## Definition" section, shown at the top of the lesson. */
  definition: string;
  /** Every other "## ..." section, shown in the Notes tab. */
  sections: NoteSection[];
}

/**
 * Splits a lesson's notes.md into sections by its "## " headings.
 * Expected headings: Definition, Key points, Say it like this (more are allowed).
 */
export function parseNotes(markdown: string): LessonNotes {
  const sections: NoteSection[] = [];

  for (const chunk of markdown.split(/^## /m).slice(1)) {
    const newline = chunk.indexOf('\n');
    const title = (newline === -1 ? chunk : chunk.slice(0, newline)).trim();
    const body = newline === -1 ? '' : chunk.slice(newline + 1).trim();
    sections.push({ title, body });
  }

  const definition = sections.find((section) => section.title.toLowerCase() === 'definition');

  return {
    definition: definition?.body ?? '',
    sections: sections.filter((section) => section !== definition),
  };
}

/** Markdown → HTML. Angular still sanitizes the result when it is bound to [innerHTML]. */
export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true });
}
