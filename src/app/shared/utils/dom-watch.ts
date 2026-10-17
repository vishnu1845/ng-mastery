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
