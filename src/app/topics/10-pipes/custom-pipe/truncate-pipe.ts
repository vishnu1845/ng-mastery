import { Pipe, PipeTransform } from '@angular/core';

/** Cuts long text short: `{{ text | truncate: 20 }}`. */
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  // The first parameter is the value before the |. The rest come after the colons.
  transform(value: string, limit = 20, trail = '…'): string {
    return value.length > limit ? value.slice(0, limit).trimEnd() + trail : value;
  }
}
