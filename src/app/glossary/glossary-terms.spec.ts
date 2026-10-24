import { glossaryRefs } from '@core/content/notes';
import { lessonUrl } from '@topics/catalog';
import { TOPICS } from '@topics/topic-registry';
import { GLOSSARY } from './glossary-terms';

// These tests keep the glossary honest: no broken [[links]], related terms or lesson links.
describe('Glossary', () => {
  const slugs = GLOSSARY.map((entry) => entry.slug);
  const lessonUrls = TOPICS.flatMap((topic) =>
    topic.lessons.map((lesson) => lessonUrl(topic, lesson)),
  );

  it('uses unique, kebab-case slugs in A–Z order', () => {
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
    expect(slugs).toEqual([...slugs].sort());
  });

  it('only relates terms that exist', () => {
    for (const entry of GLOSSARY) {
      for (const related of entry.related ?? []) {
        expect(slugs, `${entry.slug} → ${related}`).toContain(related);
      }
    }
  });

  it('only links to lessons that exist', () => {
    for (const entry of GLOSSARY) {
      for (const url of entry.lessons ?? []) {
        expect(lessonUrls, `${entry.slug} → ${url}`).toContain(url);
      }
    }
  });

  it('has a term page for every [[link]] in the lesson notes', async () => {
    for (const topic of TOPICS) {
      for (const lesson of topic.lessons) {
        const notes = (await lesson.notes()).default;
        for (const ref of glossaryRefs(notes)) {
          expect(slugs, `${lessonUrl(topic, lesson)} links to [[${ref}]]`).toContain(ref);
        }
      }
    }
  });

  it('has a term page for every [[link]] inside the glossary itself', () => {
    for (const entry of GLOSSARY) {
      for (const ref of glossaryRefs(entry.body ?? '')) {
        expect(slugs, `${entry.slug} body links to [[${ref}]]`).toContain(ref);
      }
    }
  });
});
