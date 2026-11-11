export interface Result {
  ok: boolean;
  text: string;
}

/**
 * DEMO ONLY: runs a call and reports what happened: the text it returned,
 * or the Angular error code it threw.
 */
export function attempt(call: () => unknown): Result {
  try {
    const value = call();
    return { ok: true, text: typeof value === 'string' ? value : 'works' };
  } catch (error) {
    const code = String((error as Error).message).match(/NG0\d+/)?.[0] ?? 'error';
    return { ok: false, text: code };
  }
}
