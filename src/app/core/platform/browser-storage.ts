import { inject, PLATFORM_ID, Service } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * SSR-safe wrapper around localStorage.
 * On the server (and in private windows where storage throws) it simply stores nothing.
 */
@Service()
export class BrowserStorage {
  private readonly storage = isPlatformBrowser(inject(PLATFORM_ID)) ? readLocalStorage() : null;

  get(key: string): string | null {
    try {
      return this.storage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  set(key: string, value: string): void {
    try {
      this.storage?.setItem(key, value);
    } catch {
      // STORAGE FULL OR BLOCKED: the app keeps working without persistence
    }
  }
}

function readLocalStorage(): Storage | null {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}
