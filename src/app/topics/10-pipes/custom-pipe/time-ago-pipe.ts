import { Pipe, PipeTransform } from '@angular/core';

const MINUTE = 60_000;

/** Turns a date into "5 min ago": `{{ post.createdAt | timeAgo: now() }}`. */
@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  /**
   * `now` is a parameter on purpose. A pure pipe runs again only when an input changes,
   * so reading the clock inside it would freeze the text at its first value.
   */
  transform(value: Date, now: number): string {
    const minutes = Math.floor((now - value.getTime()) / MINUTE);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
}
