import { Component, signal } from '@angular/core';

const QUEUE = ['Monsoon Drive', 'Chai at Six', 'Green Build', 'Late Deploy'];
const MORE = ['Rubber Duck', 'Merge Day', 'Quiet Friday'];

/** Every @for variable shown live for each row, the @empty block, and two everyday uses. */
@Component({
  selector: 'app-for-context-empty-demo',
  styleUrl: './for-context-empty-demo.scss',
  templateUrl: './for-context-empty-demo.html',
})
export default class ForContextEmptyDemo {
  private added = 0;

  // THE QUEUE
  protected readonly songs = signal(QUEUE);

  // SEAT MAP: two loops, so each $index needs its own name
  protected readonly rows = ['A', 'B', 'C'];
  protected readonly seats = [1, 2, 3, 4];

  protected add(): void {
    const song = MORE[this.added++ % MORE.length];
    this.songs.update((songs) => [...songs, `${song} ${this.added}`]);
  }

  protected removeLast(): void {
    this.songs.update((songs) => songs.slice(0, -1));
  }

  protected clear(): void {
    this.songs.set([]);
  }

  protected reset(): void {
    this.songs.set(QUEUE);
  }
}
