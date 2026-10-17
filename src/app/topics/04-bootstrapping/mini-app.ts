import { ApplicationConfig, ApplicationRef, Type } from '@angular/core';
import { createApplication } from '@angular/platform-browser';

/**
 * Starts a second, separate Angular app inside `container`, in the same two steps
 * bootstrapApplication() takes inside main.ts:
 *   1. createApplication(config) → root injector, providers, app initializers (awaited)
 *   2. appRef.bootstrap(component, element) → creates the root component and renders it
 * Browser only: call it from a click handler, never during server rendering.
 */
export async function startMiniApp(
  component: Type<unknown>,
  container: HTMLElement,
  config: ApplicationConfig = { providers: [] },
): Promise<ApplicationRef> {
  const appRef = await createApplication(config);

  // A fresh element for the root component. appRef.destroy() removes its host element,
  // so we never hand over an element that belongs to our own template.
  const host = container.appendChild(document.createElement('div'));
  appRef.bootstrap(component, host);
  return appRef;
}

/** Destroys the mini app and clears whatever it left in the container. */
export function stopMiniApp(appRef: ApplicationRef | undefined, container: HTMLElement): void {
  appRef?.destroy();
  container.replaceChildren();
}

/** Milliseconds since `start`, rounded, for the demo logs */
export function since(start: number): string {
  return `${Math.round(performance.now() - start)} ms`;
}
