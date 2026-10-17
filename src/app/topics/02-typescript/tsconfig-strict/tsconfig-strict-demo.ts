import { Component, computed, signal } from '@angular/core';
import { CodeBlock } from '@shared/ui/code-block/code-block';
import { CodeLang } from '@core/content/code-highlighter';

type Flag =
  'strictNullChecks' | 'noImplicitAny' | 'strictPropertyInitialization' | 'strictTemplates';

interface Check {
  flag: Flag;
  code: string;
  lang: CodeLang;
  /** What the compiler says when the flag is on */
  error: string;
  /** What happens at runtime when the flag is off */
  bug: string;
}

// ONE REAL BUG PER FLAG
const CHECKS: Check[] = [
  {
    flag: 'strictNullChecks',
    code: `const user = users.find((u) => u.id === 9);
console.log(user.name);`,
    lang: 'angular-ts',
    error: "'user' is possibly 'undefined'.",
    bug: "TypeError: Cannot read properties of undefined (reading 'name')",
  },
  {
    flag: 'noImplicitAny',
    code: `function total(items) {
  return items.reduce((sum, item) => sum + item.prise, 0);
}`,
    lang: 'angular-ts',
    error: "Parameter 'items' implicitly has an 'any' type.",
    bug: 'No checks at all, so the typo item.prise silently gives NaN.',
  },
  {
    flag: 'strictPropertyInitialization',
    code: `export class Profile {
  user: User;
}`,
    lang: 'angular-ts',
    error: "Property 'user' has no initializer and is not definitely assigned in the constructor.",
    bug: 'user is undefined until something sets it, so the template crashes.',
  },
  {
    flag: 'strictTemplates',
    code: `<app-avatar size="huge" />`,
    lang: 'angular-html',
    error: `Type '"huge"' is not assignable to type '"sm" | "md" | "lg"'.`,
    bug: 'The wrong value reaches the component and breaks the layout.',
  },
];

const ALL_ON: Record<Flag, boolean> = {
  strictNullChecks: true,
  noImplicitAny: true,
  strictPropertyInitialization: true,
  strictTemplates: true,
};

/** Flip compiler flags and see which bugs are caught while coding and which reach users. */
@Component({
  imports: [CodeBlock],
  selector: 'app-tsconfig-strict-demo',
  styleUrl: './tsconfig-strict-demo.scss',
  templateUrl: './tsconfig-strict-demo.html',
})
export default class TsconfigStrictDemo {
  protected readonly checks = CHECKS;
  protected readonly flags = signal<Record<Flag, boolean>>(ALL_ON);

  protected readonly caught = computed(
    () => CHECKS.filter((check) => this.flags()[check.flag]).length,
  );

  protected toggle(flag: Flag): void {
    this.flags.update((flags) => ({ ...flags, [flag]: !flags[flag] }));
  }

  protected setAll(on: boolean): void {
    this.flags.set({
      strictNullChecks: on,
      noImplicitAny: on,
      strictPropertyInitialization: on,
      strictTemplates: on,
    });
  }
}
