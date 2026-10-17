import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Catalog, SearchResult, topicNumber } from '@topics/catalog';

/**
 * Quick search (Ctrl/Cmd + K or "/"), built on the native <dialog> element:
 * focus trapping, Esc to close and the backdrop come from the browser.
 */
@Component({
  imports: [RouterLink, NgIcon],
  selector: 'app-command-palette',
  styleUrl: './command-palette.scss',
  templateUrl: './command-palette.html',
})
export class CommandPalette {
  private readonly catalog = inject(Catalog);
  private readonly router = inject(Router);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly query = signal('');
  protected readonly activeIndex = signal(0);

  /** Search results, or the first lessons as suggestions when the box is empty. */
  protected readonly results = computed<SearchResult[]>(() => {
    const query = this.query();
    if (query.trim()) return this.catalog.search(query);
    return this.catalog.lessonPath.slice(0, 6).map(({ topic, lesson, url }) => ({
      label: lesson.title,
      context: `${topicNumber(topic)} ${topic.title}`,
      url,
    }));
  });

  open(): void {
    const dialog = this.dialog().nativeElement;
    if (!dialog.open) dialog.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  protected onInput(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  protected onClosed(): void {
    this.query.set('');
    this.activeIndex.set(0);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const count = this.results().length;
    if (!count) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      this.activeIndex.update((index) => (index + step + count) % count);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.router.navigateByUrl(this.results()[this.activeIndex()].url);
      this.close();
    }
  }
}
