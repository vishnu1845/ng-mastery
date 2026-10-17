import { Component, computed, signal } from '@angular/core';
import { ANGULAR_RELEASES, NODE_MAJORS, supportedNodes } from './node-versions';

interface Cell {
  angular: number;
  node: number;
}

/** Which Node.js can build which Angular version: click any cell of the grid. */
@Component({
  selector: 'app-node-npm-demo',
  styleUrl: './node-npm-demo.scss',
  templateUrl: './node-npm-demo.html',
})
export default class NodeNpmDemo {
  protected readonly nodeMajors = NODE_MAJORS;

  // GRID ROWS: every Angular version with the Node lines it supports
  protected readonly rows = ANGULAR_RELEASES.map((release) => {
    const supported = supportedNodes(release.node);
    return {
      ...release,
      supported,
      runsOn: (major: number) => supported.some((node) => node.major === major),
    };
  });

  protected readonly picked = signal<Cell>({ angular: 22, node: 24 });

  // THE ANSWER FOR THE PICKED CELL
  protected readonly answer = computed(() => {
    const { angular, node } = this.picked();
    const row = this.rows.find((r) => r.angular === angular)!;
    const match = row.supported.find((s) => s.major === node);
    const newest = row.supported[row.supported.length - 1];

    return { row, node, match, newest };
  });

  protected pick(angular: number, node: number): void {
    this.picked.set({ angular, node });
  }
}
