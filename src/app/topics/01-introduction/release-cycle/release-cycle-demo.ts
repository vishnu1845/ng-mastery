import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Release, RELEASES } from './releases';

type SupportStatus = 'Active' | 'LTS' | 'Ended';

/** Pick a version to see what it shipped and where it sits in its support window. */
@Component({
  imports: [DatePipe],
  selector: 'app-release-cycle-demo',
  styleUrl: './release-cycle-demo.scss',
  templateUrl: './release-cycle-demo.html',
})
export default class ReleaseCycleDemo {
  protected readonly releases = RELEASES;
  protected readonly selected = signal<Release>(RELEASES[RELEASES.length - 1]);

  private readonly thisMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  protected readonly selectedStatus = computed(() => this.status(this.selected()));

  /** Months of active support vs LTS, used for the bar widths. */
  protected readonly window = computed(() => {
    const release = this.selected();
    return {
      active: monthsBetween(release.released, release.activeEnds),
      lts: monthsBetween(release.activeEnds, release.ltsEnds),
    };
  });

  protected status(release: Release): SupportStatus {
    if (this.thisMonth < release.activeEnds) return 'Active';
    if (this.thisMonth < release.ltsEnds) return 'LTS';
    return 'Ended';
  }
}

function monthsBetween(from: string, to: string): number {
  const [fromYear, fromMonth] = from.split('-').map(Number);
  const [toYear, toMonth] = to.split('-').map(Number);
  return (toYear - fromYear) * 12 + (toMonth - fromMonth);
}
