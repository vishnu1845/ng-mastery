import { Component, computed, signal } from '@angular/core';

interface Customer {
  name: string;
  nickname?: string; // optional
  address?: { city: string }; // optional
}

interface Row {
  code: string;
  result: string;
  crashed?: boolean;
}

// The choices we can flip in the demo
const NICKNAMES: (string | undefined)[] = ['Sam', '', undefined];
const QUANTITIES: (number | null)[] = [5, 0, null];

/** Shows a value the way it looks in code: strings in quotes, null and undefined as words. */
function show(value: unknown): string {
  return typeof value === 'string' ? `'${value}'` : String(value);
}

/** `?`, `?.`, `??`, `||` and `!` on real values. Flip the data and watch every result change. */
@Component({
  selector: 'app-null-safety-demo',
  styleUrl: './null-safety-demo.scss',
  templateUrl: './null-safety-demo.html',
})
export default class NullSafetyDemo {
  protected readonly nicknames = NICKNAMES;
  protected readonly quantities = QUANTITIES;
  protected readonly show = show;

  // DEMO DATA
  protected readonly hasAddress = signal(true);
  protected readonly nickname = signal(NICKNAMES[0]);
  protected readonly qty = signal(QUANTITIES[0]);

  protected readonly user = computed<Customer>(() => ({
    name: 'Asha',
    nickname: this.nickname(),
    address: this.hasAddress() ? { city: 'Pune' } : undefined,
  }));

  // EVERY EXPRESSION, EVALUATED FOR REAL
  protected readonly rows = computed<Row[]>(() => {
    const user = this.user();
    const qty = this.qty();

    return [
      { code: 'user.address?.city', result: show(user.address?.city) },
      { code: "user.nickname ?? 'Guest'", result: show(user.nickname ?? 'Guest') },
      { code: "user.nickname || 'Guest'", result: show(user.nickname || 'Guest') },
      { code: 'qty ?? 1', result: show(qty ?? 1) },
      { code: 'qty || 1', result: show(qty || 1) },
      readNonNull(user),
    ];
  });
}

// NON-NULL ASSERTION: `!` only silences the compiler, it adds no check at runtime
function readNonNull(user: Customer): Row {
  const code = 'user.address!.city';
  try {
    return { code, result: show(user.address!.city) };
  } catch (error) {
    return { code, result: error instanceof Error ? error.message : String(error), crashed: true };
  }
}
