import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NO_CHANGES, NodeChanges, watchNodes } from '@shared/utils/dom-watch';
import { Member, MemberRow } from './member-row';

type TrackMode = 'id' | 'index' | 'identity';

const TEAM: Member[] = [
  { id: 1, name: 'Asha', role: 'Design' },
  { id: 2, name: 'Ravi', role: 'Frontend' },
  { id: 3, name: 'Meera', role: 'Backend' },
  { id: 4, name: 'Kabir', role: 'QA' },
  { id: 5, name: 'Zoya', role: 'DevOps' },
];
const NEW_NAMES = ['Dev', 'Isha', 'Neil', 'Tara'];

const HINTS: Record<TrackMode, string> = {
  id: 'Each row follows its member. Tick a box, then try every button: the tick stays with the person, and only really new or removed members touch the DOM.',
  index:
    'Rows stay in place and the data slides through them. Tick a box, then add or reverse: the tick stays on the position, not on the person.',
  identity:
    'A new object means a new row. Reload gives every member a new object, so every row is destroyed and built again, and every tick is lost.',
};

/** The same list with three track expressions, and a count of what each button did to the DOM. */
@Component({
  selector: 'app-for-track-demo',
  imports: [MemberRow],
  styleUrl: './for-track-demo.scss',
  templateUrl: './for-track-demo.html',
})
export default class ForTrackDemo {
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');
  private nextId = TEAM.length + 1;
  private measuring = false;

  protected readonly modes: { id: TrackMode; label: string }[] = [
    { id: 'id', label: 'track member.id' },
    { id: 'index', label: 'track $index' },
    { id: 'identity', label: 'track member' },
  ];

  // STATE
  protected readonly mode = signal<TrackMode>('id');
  protected readonly members = signal(TEAM);
  protected readonly hint = computed(() => HINTS[this.mode()]);

  // WHAT THE LAST BUTTON DID TO THE DOM
  protected readonly result = signal<({ action: string } & NodeChanges) | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = watchNodes(this.list().nativeElement, (changes) => {
        // Switching the track mode also rebuilds the list. That is not what we measure.
        if (!this.measuring) return;
        this.measuring = false;
        this.result.update((result) => result && { ...result, ...changes });
      });
      destroyRef.onDestroy(stop);
    });
  }

  protected setMode(mode: TrackMode): void {
    this.measuring = false;
    this.mode.set(mode);
    this.members.set(TEAM);
    this.result.set(null);
  }

  // Same data, brand-new objects: what a refetch from the server gives us
  protected reload(): void {
    this.run('Reload', (members) => members.map((member) => ({ ...member })));
  }

  protected addFirst(): void {
    const id = this.nextId++;
    const name = NEW_NAMES[id % NEW_NAMES.length];
    this.run('Add to top', (members) => [{ id, name, role: 'Intern' }, ...members]);
  }

  protected removeFirst(): void {
    this.run('Remove first', (members) => members.slice(1));
  }

  protected reverse(): void {
    this.run('Reverse', (members) => [...members].reverse());
  }

  // Starts from zero, because a button that changes nothing in the DOM never reaches the observer
  private run(action: string, change: (members: Member[]) => Member[]): void {
    this.measuring = true;
    this.result.set({ action, ...NO_CHANGES });
    this.members.update(change);
  }
}
