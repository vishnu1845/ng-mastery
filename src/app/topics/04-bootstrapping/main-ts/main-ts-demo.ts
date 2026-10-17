import { ApplicationRef, Component, ElementRef, OnDestroy, signal, viewChild } from '@angular/core';
import { since, startMiniApp, stopMiniApp } from '../mini-app';
import { APP_NAME, MiniCounter } from './mini-counter';

/** Bootstraps a real second Angular app inside this lesson, step by step. */
@Component({
  selector: 'app-main-ts-demo',
  styleUrl: './main-ts-demo.scss',
  templateUrl: './main-ts-demo.html',
})
export default class MainTsDemo implements OnDestroy {
  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');
  private appRef?: ApplicationRef;

  protected readonly running = signal(false);
  protected readonly log = signal<string[]>([]);

  protected async bootstrap(): Promise<void> {
    const start = performance.now();
    this.log.set(['createApplication(appConfig) called']);

    this.appRef = await startMiniApp(MiniCounter, this.host().nativeElement, {
      providers: [{ provide: APP_NAME, useValue: 'Mini app #2' }],
    });

    this.log.update((log) => [
      ...log,
      `Root injector + providers ready, App bootstrapped (${since(start)})`,
      `Angular is now running ${this.appRef!.components.length} root component in the box`,
    ]);
    this.running.set(true);
  }

  protected destroy(): void {
    stopMiniApp(this.appRef, this.host().nativeElement);
    this.appRef = undefined;
    this.running.set(false);
    this.log.update((log) => [...log, 'appRef.destroy(): components and injector cleaned up']);
  }

  ngOnDestroy(): void {
    this.appRef?.destroy();
  }
}
