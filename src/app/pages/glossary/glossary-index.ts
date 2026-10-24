import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GLOSSARY, GlossaryTerm } from '@glossary/glossary-terms';
import { inlineCode, TextPart } from '@glossary/inline-code';

interface Entry {
  slug: string;
  term: string;
  short: TextPart[];
}

interface LetterGroup {
  letter: string;
  entries: Entry[];
}

/** Every glossary term, A–Z, with a filter box. */
@Component({
  imports: [RouterLink],
  selector: 'app-glossary-index',
  styleUrl: './glossary-index.scss',
  templateUrl: './glossary-index.html',
})
export default class GlossaryIndex {
  protected readonly total = GLOSSARY.length;
  protected readonly query = signal('');

  protected readonly groups = computed<LetterGroup[]>(() => {
    const query = this.query().trim().toLowerCase();
    const matches = GLOSSARY.filter((entry) => matchesQuery(entry, query)).sort((a, b) =>
      a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }),
    );

    // A Map keeps insertion order, so the letters stay A–Z
    const byLetter = new Map<string, Entry[]>();
    for (const { slug, term, short } of matches) {
      const letter = term.charAt(0).toUpperCase();
      const entry = { slug, term, short: inlineCode(short) };
      byLetter.set(letter, [...(byLetter.get(letter) ?? []), entry]);
    }
    return [...byLetter].map(([letter, entries]) => ({ letter, entries }));
  });
}

function matchesQuery(entry: GlossaryTerm, query: string): boolean {
  return !query || `${entry.term} ${entry.short}`.toLowerCase().includes(query);
}
