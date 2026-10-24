import { Component, computed, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { CodeBlock } from '@shared/ui/code-block/code-block';
import { Markdown } from '@shared/ui/markdown/markdown';
import { Catalog, topicNumber } from '@topics/catalog';
import { findTerm, GlossaryTerm } from '@glossary/glossary-terms';
import { inlineCode } from '@glossary/inline-code';

/** One glossary entry: definition, example, related terms, and the lessons that teach it. */
@Component({
  imports: [RouterLink, NgIcon, Markdown, CodeBlock],
  selector: 'app-glossary-term',
  styleUrl: './glossary-term.scss',
  templateUrl: './glossary-term.html',
})
export default class GlossaryTermPage {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly catalog = inject(Catalog);

  /** From the URL, /glossary/:slug (bound by withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly entry = computed(() => findTerm(this.slug()));
  protected readonly short = computed(() => inlineCode(this.entry()?.short ?? ''));

  protected readonly related = computed(() =>
    (this.entry()?.related ?? []).map(findTerm).filter((term): term is GlossaryTerm => !!term),
  );

  protected readonly lessons = computed(() =>
    (this.entry()?.lessons ?? []).flatMap((url) => {
      const ref = this.catalog.lessonPath.find((item) => item.url === url);
      return ref
        ? [{ url, title: ref.lesson.title, topic: `${topicNumber(ref.topic)} ${ref.topic.title}` }]
        : [];
    }),
  );

  // WHERE WE CAME FROM: the page before this one in the same tab (none on a direct visit)
  protected readonly cameFrom = computed(() => {
    const navigation = this.router.lastSuccessfulNavigation();
    const previous = navigation?.previousNavigation?.finalUrl;
    if (!navigation || !previous) return null;

    // After using the browser's back button we can't be sure what's behind us, so keep it generic
    if (navigation.trigger !== 'imperative') return 'Back';
    return `Back to ${this.pageName(this.router.serializeUrl(previous))}`;
  });

  // location.back() returns to the exact scroll position we left
  protected goBack(): void {
    this.location.back();
  }

  private pageName(url: string): string {
    const path = url.split(/[?#]/)[0];
    const lesson = this.catalog.lessonPath.find((ref) => ref.url === path);
    if (lesson) return lesson.lesson.title;
    if (path.startsWith('/glossary/')) {
      return findTerm(path.slice('/glossary/'.length))?.term ?? 'the glossary';
    }
    if (path === '/glossary') return 'the glossary';
    if (path === '/') return 'the roadmap';
    return 'the previous page';
  }
}
