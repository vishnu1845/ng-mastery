// LIVE HTML: lets a demo show the real DOM Angular produced, and keep it up to date.

/** Calls `onChange` with the element's outerHTML now and after every change inside it. */
export function watchHtml(element: Element, onChange: (html: string) => void): () => void {
  const report = () => onChange(tidyHtml(element.outerHTML));
  const observer = new MutationObserver(report);
  observer.observe(element, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  });
  report();
  return () => observer.disconnect();
}

/** Calls `onChange` with every element whose text, attributes or children just changed. */
export function watchChanges(root: Element, onChange: (changed: Element[]) => void): () => void {
  const observer = new MutationObserver((records) => {
    const changed = new Set<Element>();
    for (const record of records) {
      const target = record.target;
      const element = target instanceof Element ? target : target.parentElement;
      if (element) changed.add(element);
    }
    onChange([...changed]);
  });
  observer.observe(root, { attributes: true, characterData: true, childList: true, subtree: true });
  return () => observer.disconnect();
}

/** What Angular just did to the elements inside a watched element. */
export interface NodeChanges {
  /** New elements added to the DOM. */
  created: number;
  /** Existing elements put in a new place. */
  moved: number;
  /** Elements removed from the DOM. */
  destroyed: number;
  /** Kept elements whose text or attributes were written again. */
  rewritten: number;
}

export const NO_CHANGES: NodeChanges = { created: 0, moved: 0, destroyed: 0, rewritten: 0 };

/** Calls `onChange` after every DOM change inside `root`, with a count of what happened. */
export function watchNodes(root: Element, onChange: (changes: NodeChanges) => void): () => void {
  const observer = new MutationObserver((records) => {
    const added = new Set<Element>();
    const removed = new Set<Element>();
    const edited = new Set<Element>();

    for (const record of records) {
      record.addedNodes.forEach((node) => node instanceof Element && added.add(node));
      record.removedNodes.forEach((node) => node instanceof Element && removed.add(node));
      if (record.type !== 'childList') {
        const target = record.target;
        const element = target instanceof Element ? target : target.parentElement;
        if (element) edited.add(element);
      }
    }

    // A moved element is removed and added again in the same batch
    const created = [...added].filter((element) => !removed.has(element));
    const isNew = (element: Element) => created.some((parent) => parent.contains(element));
    onChange({
      created: created.length,
      moved: [...added].filter((element) => removed.has(element)).length,
      destroyed: [...removed].filter((element) => !added.has(element)).length,
      rewritten: [...edited].filter((element) => !isNew(element)).length,
    });
  });
  observer.observe(root, { attributes: true, characterData: true, childList: true, subtree: true });
  return () => observer.disconnect();
}

/** Briefly highlights an element. Uses the Web Animations API, so it never touches classes. */
export function flash(element: Element): void {
  const accent = getComputedStyle(element).getPropertyValue('--accent').trim() || '#d98bff';
  element.animate(
    [
      {
        boxShadow: `0 0 0 2px ${accent}`,
        backgroundColor: `color-mix(in oklab, ${accent} 22%, transparent)`,
      },
      { boxShadow: '0 0 0 2px transparent', backgroundColor: 'transparent' },
    ],
    { duration: 1100, easing: 'ease-out' },
  );
}

/** Just the opening tag, which is where bindings on the element itself show up. */
export function openingTag(html: string): string {
  return html.slice(0, html.indexOf('>') + 1);
}

/** Drops Angular's _ngcontent / _nghost style-scoping attributes when they aren't the point. */
export function withoutScoping(html: string): string {
  return html.replace(/ _ng(content|host)-[\w-]+=""/g, '');
}

/** Drops Angular's comment markers and extra whitespace, so the HTML is easy to read. */
export function tidyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}
