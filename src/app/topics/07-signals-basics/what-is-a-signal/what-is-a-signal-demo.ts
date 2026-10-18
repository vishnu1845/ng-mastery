import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { watchChanges } from '@shared/utils/dom-watch';

type NodeId = 'price' | 'qty' | 'coupon' | 'subtotal' | 'total' | 'viewSubtotal' | 'viewTotal';
type Kind = 'signal' | 'computed' | 'view';

interface GraphNode {
  id: NodeId;
  label: string;
  kind: Kind;
  x: number;
  y: number;
}

// THE GRAPH: who reads whom
const W = 100;
const H = 36;
const NODES: GraphNode[] = [
  { id: 'price', label: 'price', kind: 'signal', x: 10, y: 10 },
  { id: 'qty', label: 'qty', kind: 'signal', x: 130, y: 10 },
  { id: 'coupon', label: 'coupon', kind: 'signal', x: 250, y: 10 },
  { id: 'subtotal', label: 'subtotal', kind: 'computed', x: 70, y: 100 },
  { id: 'total', label: 'total', kind: 'computed', x: 250, y: 100 },
  { id: 'viewSubtotal', label: '{{ subtotal() }}', kind: 'view', x: 70, y: 190 },
  { id: 'viewTotal', label: '{{ total() }}', kind: 'view', x: 250, y: 190 },
];
const LINKS: [NodeId, NodeId][] = [
  ['price', 'subtotal'],
  ['qty', 'subtotal'],
  ['subtotal', 'total'],
  ['coupon', 'total'],
  ['subtotal', 'viewSubtotal'],
  ['total', 'viewTotal'],
];
const LABELS: Record<NodeId, string> = Object.fromEntries(
  NODES.map((n) => [n.id, n.label]),
) as Record<NodeId, string>;

/** Lines from the bottom of one node to the top of the next (or side to side on the same row). */
const EDGES = LINKS.map(([from, to]) => {
  const a = NODES.find((n) => n.id === from)!;
  const b = NODES.find((n) => n.id === to)!;
  const sameRow = a.y === b.y;
  return {
    to,
    x1: sameRow ? a.x + W : a.x + W / 2,
    y1: sameRow ? a.y + H / 2 : a.y + H,
    x2: sameRow ? b.x - 4 : b.x + W / 2,
    y2: sameRow ? b.y + H / 2 : b.y - 4,
  };
});

/**
 * A node lights up only when it really changed: effects watch the signals and computeds,
 * and a MutationObserver watches the DOM text Angular writes.
 */
@Component({
  selector: 'app-what-is-a-signal-demo',
  styleUrl: './what-is-a-signal-demo.scss',
  templateUrl: './what-is-a-signal-demo.html',
})
export default class WhatIsASignalDemo {
  private readonly cart = viewChild.required<ElementRef<HTMLElement>>('cart');

  protected readonly nodes = NODES;
  protected readonly edges = EDGES;
  protected readonly w = W;
  protected readonly h = H;

  // STATE
  protected readonly price = signal(499);
  protected readonly qty = signal(2);
  protected readonly coupon = signal(0);

  // DERIVED STATE
  protected readonly subtotal = computed(() => this.price() * this.qty());
  protected readonly total = computed(() =>
    Math.round(this.subtotal() * (1 - this.coupon() / 100)),
  );

  // WHAT LIT UP
  protected readonly lit = signal<ReadonlySet<NodeId>>(new Set());
  protected readonly wave = signal<NodeId[] | null>(null);
  protected readonly untouched = computed(() => {
    const wave = this.wave();
    return wave ? NODES.filter((n) => !wave.includes(n.id)).map((n) => n.label) : [];
  });
  protected readonly waveLabels = computed(() => (this.wave() ?? []).map((id) => LABELS[id]));

  private armed = false;
  private dimTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearTimeout(this.dimTimer));

    // One effect per node. An effect re-runs only when the value it reads really changed.
    const watched = [
      ['price', this.price],
      ['qty', this.qty],
      ['coupon', this.coupon],
      ['subtotal', this.subtotal],
      ['total', this.total],
    ] as const;
    for (const [id, read] of watched) {
      effect(() => {
        read();
        this.light(id);
      });
    }

    // The template's text nodes: light them when Angular actually writes to the DOM
    afterNextRender(() => {
      this.armed = true;
      const stop = watchChanges(this.cart().nativeElement, (changed) => {
        for (const element of changed) {
          const id = (element as HTMLElement).dataset['node'] as NodeId | undefined;
          if (id) this.light(id);
        }
      });
      destroyRef.onDestroy(stop);
    });
  }

  // EVERY CHANGE STARTS A NEW WAVE
  protected setPrice(value: number): void {
    this.startWave();
    this.price.set(value);
  }

  protected changeQty(by: number): void {
    this.startWave();
    this.qty.update((qty) => Math.max(1, qty + by));
  }

  protected setCoupon(value: number): void {
    this.startWave();
    this.coupon.set(value);
  }

  private startWave(): void {
    this.wave.set([]);
    this.lit.set(new Set());
  }

  private light(id: NodeId): void {
    if (!this.armed) return; // skip the first run of every effect
    this.lit.update((ids) => new Set(ids).add(id));
    this.wave.update((wave) => (!wave || wave.includes(id) ? wave : [...wave, id]));
    clearTimeout(this.dimTimer);
    this.dimTimer = setTimeout(() => this.lit.set(new Set()), 1400);
  }
}
