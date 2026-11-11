import {
  afterNextRender,
  Component,
  ElementRef,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { attempt, Result } from '../_shared/attempt';
import { Badge, Tint } from './targets';

interface Row {
  query: string;
  result: Result;
}

/** One element, many queries: what each `read` option returns, measured after the first render. */
@Component({
  selector: 'app-query-options-demo',
  imports: [Tint, Badge],
  styleUrl: './query-options-demo.scss',
  templateUrl: './query-options-demo.html',
  // The server's HTML has no view container at the <span>, so hydrating it and then
  // inserting views there fails. This component renders fresh in the browser instead.
  host: { ngSkipHydration: 'true' },
})
export default class QueryOptionsDemo {
  // QUERIES ON THE <span #target appTint>
  private readonly asElement = viewChild.required<ElementRef<HTMLElement>>('target');
  private readonly asDirective = viewChild.required('target', { read: Tint });
  private readonly asContainer = viewChild.required('target', { read: ViewContainerRef });

  // QUERIES ON THE <app-badge #badge>
  private readonly asComponent = viewChild.required<Badge>('badge');
  private readonly badgeHost = viewChild.required('badge', { read: ElementRef });

  // QUERIES ON THE <ng-template #greeting>, AND ON NOTHING
  private readonly greeting = viewChild.required<TemplateRef<{ $implicit: string }>>('greeting');
  private readonly missing = viewChild.required('nothing');

  protected readonly rows = signal<Row[]>([]);
  protected readonly stamped = signal(0);

  constructor() {
    // Read in the constructor: the view does not exist yet
    const early = attempt(() => this.asElement());

    afterNextRender(() =>
      this.rows.set([
        row(
          "viewChild('target')",
          () => `${typeName(this.asElement())} of <${tag(this.asElement())}>`,
        ),
        row("viewChild('target', { read: Tint })", () => typeName(this.asDirective())),
        row("viewChild('target', { read: ViewContainerRef })", () => typeName(this.asContainer())),
        row("viewChild('badge')", () => typeName(this.asComponent())),
        row(
          "viewChild('badge', { read: ElementRef })",
          () => `${typeName(this.badgeHost())} of <${tag(this.badgeHost())}>`,
        ),
        row("viewChild('greeting')", () => typeName(this.greeting())),
        row("viewChild.required('nothing')", () => this.missing()),
        { query: "viewChild.required('target') in the constructor", result: early },
      ]),
    );
  }

  // The two read options working together: stamp the template next to the <span>
  protected stamp(): void {
    this.asContainer().createEmbeddedView(this.greeting(), {
      $implicit: `Hinata #${this.stamped() + 1}`,
    });
    this.stamped.update((count) => count + 1);
  }

  protected clear(): void {
    this.asContainer().clear();
    this.stamped.set(0);
  }
}

function row(query: string, read: () => unknown): Row {
  return { query, result: attempt(read) };
}

/** Names the type with instanceof. Class names are shortened in production builds. */
function typeName(value: unknown): string {
  if (value instanceof ElementRef) return 'ElementRef';
  if (value instanceof ViewContainerRef) return 'ViewContainerRef';
  if (value instanceof TemplateRef) return 'TemplateRef';
  if (value instanceof Tint) return 'the Tint directive';
  if (value instanceof Badge) return 'the Badge component';
  return 'something else';
}

function tag(ref: ElementRef<HTMLElement>): string {
  return ref.nativeElement.tagName.toLowerCase();
}
