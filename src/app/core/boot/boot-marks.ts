// BOOT MARKS
// A named performance mark at each startup step, so the "Execution flow" lesson
// can show how this very page booted. performance.mark() is cheap and also exists on the server.
export type BootStep = 'main' | 'initializer' | 'app' | 'render' | 'route';

export const BOOT_MARK_PREFIX = 'ngm:';

export function markBoot(step: BootStep): void {
  globalThis.performance?.mark?.(BOOT_MARK_PREFIX + step);
}
