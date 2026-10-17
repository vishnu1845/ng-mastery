// READ AN HTML DOCUMENT THE WAY THE BROWSER DOES (DOMParser, browser only)
export interface HtmlReport {
  scripts: string[];
  stylesheets: number;
  baseHref: string | null;
  /** How many elements are already inside <app-root> before Angular runs */
  appRootElements: number;
  appRootText: string;
}

export function inspectHtml(html: string): HtmlReport {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const appRoot = doc.querySelector('app-root');

  return {
    scripts: [...doc.querySelectorAll('script')].map(describeScript),
    stylesheets: doc.querySelectorAll('link[rel="stylesheet"], style').length,
    baseHref: doc.querySelector('base')?.getAttribute('href') ?? null,
    appRootElements: appRoot?.querySelectorAll('*').length ?? 0,
    appRootText: visibleText(appRoot).slice(0, 90),
  };
}

// Text pieces joined with spaces, so "Skip to content" and "NgMastery" don't run together
function visibleText(root: Element | null): string {
  if (!root) return '';
  const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const parts: string[] = [];
  while (walker.nextNode()) {
    const text = walker.currentNode.textContent?.trim();
    if (text) parts.push(text);
  }
  return parts.join(' ');
}

// <script src="main-ABC.js" type="module"> → "main-ABC.js (module)"
function describeScript(script: HTMLScriptElement): string {
  const name = script.getAttribute('src') ?? (script.id ? `#${script.id}` : 'inline code');
  const type = script.getAttribute('type');
  return type ? `${name} (${type})` : name;
}
