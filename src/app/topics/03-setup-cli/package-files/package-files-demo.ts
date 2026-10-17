import { Component, computed, signal } from '@angular/core';
import { compare, maxSatisfying, satisfies } from './semver';

type When = 'today' | 'later';

// A MADE-UP PACKAGE ON NPM
const TODAY = ['1.9.0', '2.0.0', '2.3.1', '2.4.0', '2.4.5', '3.0.0'];
const NEXT_MONTH = ['2.4.9', '2.6.0']; // released after we committed

const RANGES = ['^2.4.0', '~2.4.0', '2.4.0'];

/** Why we commit package-lock.json: the same range can install different versions over time. */
@Component({
  selector: 'app-package-files-demo',
  styleUrl: './package-files-demo.scss',
  templateUrl: './package-files-demo.html',
})
export default class PackageFilesDemo {
  protected readonly ranges = RANGES;

  protected readonly range = signal(RANGES[0]);
  protected readonly when = signal<When>('today');

  // WHAT IS ON NPM RIGHT NOW (a sorted copy, never sorting the constants in place)
  protected readonly published = computed(() =>
    [...TODAY, ...(this.when() === 'later' ? NEXT_MONTH : [])].sort(compare),
  );

  // YOU, TODAY: npm install picks a version and writes it to package-lock.json
  protected readonly locked = computed(() => maxSatisfying(TODAY, this.range())!);

  // YOUR TEAMMATE WITHOUT A LOCK FILE: gets whatever matches on npm right now
  protected readonly withoutLock = computed(() => maxSatisfying(this.published(), this.range())!);

  protected readonly chips = computed(() =>
    this.published().map((version) => ({
      version,
      matches: satisfies(version, this.range()),
      isNew: NEXT_MONTH.includes(version),
      isLocked: version === this.locked(),
    })),
  );
}
