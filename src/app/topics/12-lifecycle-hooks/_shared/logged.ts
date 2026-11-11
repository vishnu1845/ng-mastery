import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Directive,
  DoCheck,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HookLog } from './hook-log';

/** The constructor, then the 8 hooks in the order Angular calls them. */
export const HOOKS = [
  'constructor',
  'ngOnChanges',
  'ngOnInit',
  'ngDoCheck',
  'ngAfterContentInit',
  'ngAfterContentChecked',
  'ngAfterViewInit',
  'ngAfterViewChecked',
  'ngOnDestroy',
];

/**
 * DEMO ONLY: a component that writes one line to the HookLog in every lifecycle hook.
 * Nothing else happens in the hooks, so the log shows exactly when Angular calls them.
 */
@Directive()
export abstract class Logged
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  protected abstract readonly who: string;
  protected readonly log = inject(HookLog);

  ngOnChanges(changes: SimpleChanges): void {
    const detail = Object.entries(changes)
      .map(([name, change]) =>
        change.firstChange
          ? `${name}: ${change.currentValue} (first)`
          : `${name}: ${change.previousValue} → ${change.currentValue}`,
      )
      .join(', ');
    this.log.record(this.who, 'ngOnChanges', detail);
  }

  ngOnInit(): void {
    this.log.record(this.who, 'ngOnInit');
  }

  ngDoCheck(): void {
    this.log.record(this.who, 'ngDoCheck');
  }

  ngAfterContentInit(): void {
    this.log.record(this.who, 'ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    this.log.record(this.who, 'ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    this.log.record(this.who, 'ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    this.log.record(this.who, 'ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    this.log.record(this.who, 'ngOnDestroy');
  }
}
