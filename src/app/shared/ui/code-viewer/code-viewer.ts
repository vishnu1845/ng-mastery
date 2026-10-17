import { Component, computed, input, linkedSignal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { langFromPath } from '@core/content/code-highlighter';
import { CodeBlock } from '../code-block/code-block';

/**
 * The lesson Code tab: one tab per source file.
 * Files are the real project sources, copied to /code at build time (see "assets" in angular.json),
 * so what you read here is exactly what runs in the demo.
 */
@Component({
  imports: [CodeBlock],
  selector: 'app-code-viewer',
  styleUrl: './code-viewer.scss',
  templateUrl: './code-viewer.html',
})
export class CodeViewer {
  /** Project paths, e.g. 'src/app/topics/01-introduction/spa-vs-mpa/spa-vs-mpa-demo.ts'. */
  readonly files = input.required<string[]>();

  protected readonly active = linkedSignal<string | undefined>(() => this.files()[0]);
  protected readonly lang = computed(() => langFromPath(this.active() ?? ''));

  // Relative URL, so it also works when the app is deployed under a sub-path.
  protected readonly source = httpResource.text(() => {
    const file = this.active();
    return file ? `code/${file}` : undefined;
  });

  protected fileName(path: string): string {
    return path.split('/').pop() ?? path;
  }
}
