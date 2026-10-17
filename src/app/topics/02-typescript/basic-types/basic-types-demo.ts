import { Component, computed, signal } from '@angular/core';

type Keyword = 'let' | 'const';

interface Example {
  code: string;
  value: unknown;
  /** What TypeScript infers with `let` */
  letType: string;
  /** What TypeScript infers with `const` (exact values stay as literal types) */
  constType: string;
}

// THE SAME VALUES, AS TYPESCRIPT SEES THEM
const EXAMPLES: Example[] = [
  { code: "title = 'Angular'", value: 'Angular', letType: 'string', constType: "'Angular'" },
  { code: 'price = 499', value: 499, letType: 'number', constType: '499' },
  { code: 'isLive = true', value: true, letType: 'boolean', constType: 'true' },
  {
    code: "tags = ['new', 'sale']",
    value: ['new', 'sale'],
    letType: 'string[]',
    constType: 'string[]',
  },
  { code: 'point = [10, 20]', value: [10, 20], letType: 'number[]', constType: 'number[]' },
  {
    code: "user = { name: 'Asha', age: 24 }",
    value: { name: 'Asha', age: 24 },
    letType: '{ name: string; age: number }',
    constType: '{ name: string; age: number }',
  },
];

/** Type inference: TypeScript reads the value and picks the type for us. */
@Component({
  selector: 'app-basic-types-demo',
  styleUrl: './basic-types-demo.scss',
  templateUrl: './basic-types-demo.html',
})
export default class BasicTypesDemo {
  protected readonly keyword = signal<Keyword>('let');

  // Each row: the code, the type TypeScript infers, and what JavaScript's typeof says at runtime
  protected readonly rows = computed(() =>
    EXAMPLES.map((example) => ({
      code: `${this.keyword()} ${example.code}`,
      tsType: this.keyword() === 'let' ? example.letType : example.constType,
      runtimeType: typeof example.value,
    })),
  );
}
