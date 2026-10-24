import { glossaryRefs, parseNotes, renderMarkdown, splitBlocks, termSlug } from './notes';

describe('parseNotes', () => {
  const markdown = [
    '## Definition',
    'A **signal** holds a value.',
    '',
    '## Key points',
    '- Read it by calling it',
    '',
    '## Say it like this',
    '"A signal is reactive state."',
  ].join('\n');

  it('pulls the definition out of the sections', () => {
    const notes = parseNotes(markdown);

    expect(notes.definition).toBe('A **signal** holds a value.');
    expect(notes.sections.map((section) => section.title)).toEqual([
      'Key points',
      'Say it like this',
    ]);
  });

  it('returns an empty definition when the heading is missing', () => {
    expect(parseNotes('## Key points\n- one').definition).toBe('');
  });
});

describe('splitBlocks', () => {
  it('separates prose from fenced code and keeps their order', () => {
    const blocks = splitBlocks(
      ['Before', '', '```ts', 'const a = 1;', '```', '', 'After'].join('\n'),
    );

    expect(blocks).toEqual([
      { kind: 'text', markdown: 'Before' },
      { kind: 'code', code: 'const a = 1;', lang: 'angular-ts', label: 'TypeScript' },
      { kind: 'text', markdown: 'After' },
    ]);
  });

  it('maps fence names to grammars', () => {
    const [block] = splitBlocks('```json\n{ "strict": true }\n```');

    expect(block).toMatchObject({ kind: 'code', lang: 'json', label: 'JSON' });
  });

  it('keeps folder trees as plain text', () => {
    const [block] = splitBlocks('```text\nsrc/\n└── main.ts\n```');

    expect(block).toMatchObject({ kind: 'code', lang: 'text', code: 'src/\n└── main.ts' });
  });
});

describe('renderMarkdown', () => {
  it('turns markdown into HTML', () => {
    expect(renderMarkdown('**bold**')).toContain('<strong>bold</strong>');
  });

  it('wraps tables so they can scroll on small screens', () => {
    const html = renderMarkdown('| a | b |\n| - | - |\n| 1 | 2 |');

    expect(html).toContain('<div class="table-wrap"><table>');
    expect(html).toContain('</table></div>');
  });
});

describe('glossary links', () => {
  it('turns [[term]] into a link to the glossary', () => {
    expect(renderMarkdown('A [[signal]] holds state.')).toContain(
      '<a class="term" href="/glossary/signal">signal</a>',
    );
  });

  it('supports custom link text with [[slug|text]]', () => {
    expect(renderMarkdown('New apps are [[zoneless|zoneless by default]].')).toContain(
      '<a class="term" href="/glossary/zoneless">zoneless by default</a>',
    );
  });

  it('keeps markdown inside the link text', () => {
    expect(renderMarkdown('Use [[computed|`computed()`]].')).toContain(
      '<a class="term" href="/glossary/computed"><code>computed()</code></a>',
    );
  });

  it('works inside a table cell, where the pipe is escaped', () => {
    const table = '| Old | New |\n| --- | --- |\n| Zone.js | [[zoneless\\|zoneless apps]] |';
    const html = renderMarkdown(table);
    expect(html).toContain('<a class="term" href="/glossary/zoneless">zoneless apps</a>');
    expect(html.match(/<td>/g)).toHaveLength(2);
    expect(glossaryRefs(table)).toEqual(['zoneless']);
  });

  it('leaves [[...]] alone inside inline code', () => {
    expect(renderMarkdown('Write `[[signal]]` in notes.')).not.toContain('class="term"');
  });

  it('makes slugs from the visible text', () => {
    expect(termSlug('Zone.js')).toBe('zone-js');
    expect(termSlug('change detection')).toBe('change-detection');
    expect(termSlug('computed()')).toBe('computed');
    expect(glossaryRefs('[[OnPush]] and [[signal|signals]]')).toEqual(['onpush', 'signal']);
  });
});
