import { signal } from '@angular/core';

/** Every call made through @logCall lands here, newest first. */
export const callLog = signal<string[]>([]);

// METHOD DECORATOR: just a function. It receives the method and swaps in a wrapped version.
export function logCall(_target: object, methodName: string, descriptor: PropertyDescriptor): void {
  const original = descriptor.value as (...args: number[]) => number;

  descriptor.value = function (this: unknown, ...args: number[]): number {
    const result = original.apply(this, args);
    callLog.update((log) => [`${methodName}(${args.join(', ')}) → ${result}`, ...log].slice(0, 5));
    return result;
  };
}
