import {
  ApplicationRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  provideAppInitializer,
  signal,
  viewChild,
} from '@angular/core';
import { since, startMiniApp, stopMiniApp } from '../mini-app';
import { RemoteConfig, ShopHeader } from './remote-config';

type Status = 'idle' | 'waiting' | 'running' | 'failed';

/** A real app whose provideAppInitializer() loads config first. The screen stays empty until it's done. */
@Component({
  selector: 'app-app-initializer-demo',
  styleUrl: './app-initializer-demo.scss',
  templateUrl: './app-initializer-demo.html',
})
export default class AppInitializerDemo implements OnDestroy {
  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');
  private appRef?: ApplicationRef;

  // OPTIONS
  protected readonly delayMs = signal(1500);
  protected readonly fail = signal(false);

  // STATE
  protected readonly status = signal<Status>('idle');
  protected readonly log = signal<string[]>([]);

  protected async start(): Promise<void> {
    this.stop();
    const start = performance.now();
    const add = (line: string) => this.log.update((log) => [...log, `${since(start)}  ${line}`]);
    const [delayMs, fail] = [this.delayMs(), this.fail()];

    this.status.set('waiting');
    this.log.set([]);
    add('createApplication() called');

    try {
      this.appRef = await startMiniApp(ShopHeader, this.host().nativeElement, {
        providers: [
          // THE INITIALIZER: Angular waits for this Promise before rendering anything
          provideAppInitializer(() => {
            add('initializer started: loading config…');
            return inject(RemoteConfig)
              .load(delayMs, fail)
              .then(() => add('initializer finished'));
          }),
        ],
      });
      add('root component rendered with the config');
      this.status.set('running');
    } catch (error) {
      add(`bootstrap rejected: ${error instanceof Error ? error.message : error}`);
      add('the root component was never created');
      add('Angular also reported it to its ErrorHandler (see the console)');
      this.status.set('failed');
    }
  }

  protected stop(): void {
    stopMiniApp(this.appRef, this.host().nativeElement);
    this.appRef = undefined;
    this.status.set('idle');
  }

  ngOnDestroy(): void {
    this.appRef?.destroy();
  }
}
