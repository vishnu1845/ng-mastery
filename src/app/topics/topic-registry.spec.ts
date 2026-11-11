import { PARTS } from './parts';
import { TOPICS } from './topic-registry';

// These tests guard the structure: if a topic or lesson is added the wrong way, CI fails.
describe('Topic registry', () => {
  it('lists topics 1 to 52 in order', () => {
    expect(TOPICS.map((topic) => topic.id)).toEqual(Array.from({ length: 52 }, (_, i) => i + 1));
  });

  it('uses unique, kebab-case topic slugs', () => {
    const slugs = TOPICS.map((topic) => topic.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('puts every topic in a known part', () => {
    const partIds = PARTS.map((part) => part.id);
    TOPICS.forEach((topic) => expect(partIds).toContain(topic.part));
  });

  it('only lists lessons that are in the topic outline, in the same order', () => {
    for (const topic of TOPICS) {
      const lessonSlugs = topic.lessons.map((lesson) => lesson.slug);
      const outlineOrder = topic.outline.filter((slug) => lessonSlugs.includes(slug));

      lessonSlugs.forEach((slug) => expect(topic.outline).toContain(slug));
      expect(lessonSlugs).toEqual(outlineOrder);
    }
  });

  it('has content in lessons.ts for exactly the finished lessons', async () => {
    for (const topic of TOPICS.filter((topic) => topic.lessons.length > 0)) {
      expect(topic.content, `${topic.slug} lessons.ts`).toBeDefined();
      const content = (await topic.content!()).default;
      expect(Object.keys(content)).toEqual(topic.lessons.map((lesson) => lesson.slug));
    }
  });

  it('loads notes for every finished lesson', async () => {
    for (const topic of TOPICS.filter((topic) => topic.content)) {
      const content = (await topic.content!()).default;
      for (const [slug, lesson] of Object.entries(content)) {
        const notes = (await lesson.notes()).default;
        expect(notes, `${slug} notes`).toContain('## Definition');
        expect(notes, `${slug} notes`).toContain('## Say it like this');
      }
    }
  });
});
