import { Component, ElementRef, signal, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

type LaneId = 'interpolation' | 'property' | 'event' | 'twoWay';

/** down = TS ➝ View, up = View ➝ TS */
type Flow = 'down' | 'up';

interface Lane {
  id: LaneId;
  type: string;
  code: string;
  direction: string;
}

const LANES: Lane[] = [
  { id: 'interpolation', type: 'Interpolation', code: '{{ name() }}', direction: 'TS ➝ View' },
  { id: 'property', type: 'Property binding', code: '[value]="likes()"', direction: 'TS ➝ View' },
  { id: 'event', type: 'Event binding', code: '(click)="like()"', direction: 'View ➝ TS' },
  { id: 'twoWay', type: 'Two-way binding', code: '[(ngModel)]="name"', direction: 'TS ⬌ View' },
];

const MAX_LIKES = 5;

/** One tiny profile card using all four bindings. Each wire lights up when data really moves. */
@Component({
  imports: [FormsModule],
  selector: 'app-overview-demo',
  styleUrl: './overview-demo.scss',
  templateUrl: './overview-demo.html',
})
export default class OverviewDemo {
  private readonly laneElements = viewChildren<ElementRef<HTMLElement>>('lane');

  protected readonly lanes = LANES;
  protected readonly maxLikes = MAX_LIKES;

  // COMPONENT STATE
  protected readonly name = signal('Vishnu');
  protected readonly likes = signal(0);

  protected readonly fired = signal<Record<LaneId, number>>({
    interpolation: 0,
    property: 0,
    event: 0,
    twoWay: 0,
  });

  // VIEW ➝ TS: the click goes up, then the new count comes back down
  protected like(): void {
    this.flow('event', 'up');
    this.likes.update((count) => Math.min(count + 1, MAX_LIKES));
    this.flow('property', 'down', 300);
    this.flow('interpolation', 'down', 300);
  }

  // VIEW ➝ TS: ngModel sends the text up, interpolation shows it in the greeting
  protected typed(): void {
    this.flow('twoWay', 'up');
    this.flow('interpolation', 'down', 300);
  }

  // TS ➝ VIEW: the component changes its own state and every binding follows
  protected reset(): void {
    this.flow('event', 'up');
    this.name.set('Vishnu');
    this.likes.set(0);
    this.flow('interpolation', 'down', 300);
    this.flow('property', 'down', 300);
    this.flow('twoWay', 'down', 300);
  }

  // WIRE ANIMATION
  private flow(id: LaneId, flow: Flow, delay = 0): void {
    this.fired.update((counts) => ({ ...counts, [id]: counts[id] + 1 }));

    const lane = this.laneElements().find((el) => el.nativeElement.dataset['lane'] === id);
    const dot = lane?.nativeElement.querySelector('.dot');
    if (!dot) return;

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const [from, to] = still ? ['50%', '50%'] : flow === 'down' ? ['0%', '100%'] : ['100%', '0%'];

    dot.animate(
      [
        { left: from, opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { opacity: 1, offset: 0.8 },
        { left: to, opacity: 0 },
      ],
      { duration: 560, delay, easing: 'ease-in-out' },
    );
  }
}
