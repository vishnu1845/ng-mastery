import { afterNextRender, Component, signal } from '@angular/core';
import { HtmlReport, inspectHtml } from './html-report';

interface Comparison {
  source: HtmlReport;
  served: HtmlReport;
}

/** The index.html we wrote vs the HTML the browser really received for this page. */
@Component({
  selector: 'app-index-html-demo',
  styleUrl: './index-html-demo.scss',
  templateUrl: './index-html-demo.html',
})
export default class IndexHtmlDemo {
  protected readonly comparison = signal<Comparison | null>(null);
  protected readonly ngVersion = signal<string | null>(null);
  protected readonly failed = signal(false);

  constructor() {
    afterNextRender(() => this.load());
  }

  private async load(): Promise<void> {
    // LIVE DOM: Angular rendered inside <app-root> and tagged it with its version
    this.ngVersion.set(document.querySelector('app-root')?.getAttribute('ng-version') ?? null);

    try {
      const [source, served] = await Promise.all([
        fetchText('code/src/index.html'), // our file, copied as-is for the Code tab
        fetchText(location.pathname), // what the server sends for this URL
      ]);
      this.comparison.set({ source: inspectHtml(source), served: inspectHtml(served) });
    } catch {
      this.failed.set(true);
    }
  }
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { headers: { Accept: 'text/html' } });
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  return response.text();
}
