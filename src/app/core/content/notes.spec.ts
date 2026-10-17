import { parseNotes, renderMarkdown, splitBlocks } from './notes';

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
});

describe('renderMarkdown', () => {
  it('turns markdown into HTML', () => {
    expect(renderMarkdown('**bold**')).toContain('<strong>bold</strong>');
  });
});
