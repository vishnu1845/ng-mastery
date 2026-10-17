import { Component, computed, signal } from '@angular/core';

interface Payload {
  label: string;
  value: unknown;
}

// WHAT AN API MIGHT REALLY SEND BACK
const PAYLOADS: Payload[] = [
  { label: '{ "name": "Asha" }', value: { name: 'Asha' } },
  { label: '"hello"', value: 'hello' },
  { label: 'null', value: null },
  { label: '42', value: 42 },
];

// TYPE GUARD: the check that unknown forces us to write
function hasName(value: unknown): value is { name: string } {
  return (
    typeof value === 'object' && value !== null && 'name' in value && typeof value.name === 'string'
  );
}

/** The same untrusted data, read through `any` and through `unknown`. */
@Component({
  selector: 'app-any-unknown-never-demo',
  styleUrl: './any-unknown-never-demo.scss',
  templateUrl: './any-unknown-never-demo.html',
})
export default class AnyUnknownNeverDemo {
  protected readonly payloads = PAYLOADS;
  protected readonly selected = signal(PAYLOADS[0]);

  // WITH ANY: compiles, then crashes when the data isn't what we expected
  protected readonly withAny = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- on purpose: this lesson shows the risk
    const data: any = this.selected().value;
    try {
      return { crashed: false, text: data.name.toUpperCase() as string };
    } catch (error) {
      return { crashed: true, text: String(error) };
    }
  });

  // WITH UNKNOWN: TypeScript won't let us touch data.name until we check it
  protected readonly withUnknown = computed(() => {
    const data: unknown = this.selected().value;
    return hasName(data) ? data.name.toUpperCase() : 'Skipped: not a user';
  });
}
