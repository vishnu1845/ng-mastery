import {
  ApplicationRef,
  Component,
  ElementRef,
  inject,
  NgModuleRef,
  OnDestroy,
  PlatformRef,
  signal,
  viewChild,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CodeBlock } from '@shared/ui/code-block/code-block';
import { since } from '../mini-app';
import { CounterModule } from './counter-module';
import { StandaloneCounter } from './standalone-counter';

const MODULE_CODE = `// main.ts
platformBrowser()
  .bootstrapModule(CounterModule);

// counter-module.ts
@NgModule({
  declarations: [ModuleCounter],
  imports: [BrowserModule],
  bootstrap: [ModuleCounter],
})
export class CounterModule {}`;

const STANDALONE_CODE = `// main.ts
bootstrapApplication(StandaloneCounter);

// no module file at all`;

/** The same counter started twice: once from an NgModule, once standalone. Both are real apps. */
@Component({
  imports: [CodeBlock],
  selector: 'app-standalone-vs-ngmodule-demo',
  styleUrl: './standalone-vs-ngmodule-demo.scss',
  templateUrl: './standalone-vs-ngmodule-demo.html',
})
export default class StandaloneVsNgmoduleDemo implements OnDestroy {
  // The platform our own app runs on; NgModule apps are started from it
  private readonly platform = inject(PlatformRef);

  private readonly moduleHost = viewChild.required<ElementRef<HTMLElement>>('moduleHost');
  private readonly standaloneHost = viewChild.required<ElementRef<HTMLElement>>('standaloneHost');
  private moduleRef?: NgModuleRef<CounterModule>;
  private standaloneRef?: ApplicationRef;

  protected readonly moduleCode = MODULE_CODE;
  protected readonly standaloneCode = STANDALONE_CODE;
  protected readonly moduleStatus = signal('');
  protected readonly standaloneStatus = signal('');

  protected async startModule(): Promise<void> {
    const start = performance.now();
    // bootstrap: [ModuleCounter] looks for <app-module-counter> in the page, so we add one
    this.moduleHost().nativeElement.replaceChildren(document.createElement('app-module-counter'));
    this.moduleRef = await this.platform.bootstrapModule(CounterModule);
    this.moduleStatus.set(`Running, started in ${since(start)}`);
  }

  protected async startStandalone(): Promise<void> {
    const start = performance.now();
    // Same idea: bootstrapApplication() renders into the <app-standalone-counter> it finds
    this.standaloneHost().nativeElement.replaceChildren(
      document.createElement('app-standalone-counter'),
    );
    this.standaloneRef = await bootstrapApplication(StandaloneCounter);
    this.standaloneStatus.set(`Running, started in ${since(start)}`);
  }

  protected stopAll(): void {
    this.moduleRef?.destroy();
    this.moduleRef = undefined;
    this.moduleHost().nativeElement.replaceChildren();
    this.standaloneRef?.destroy();
    this.standaloneRef = undefined;
    this.standaloneHost().nativeElement.replaceChildren();
    this.moduleStatus.set('');
    this.standaloneStatus.set('');
  }

  ngOnDestroy(): void {
    this.moduleRef?.destroy();
    this.standaloneRef?.destroy();
  }
}
