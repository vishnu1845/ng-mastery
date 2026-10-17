import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { AvatarTheme, avatarUrl } from './avatar';

interface DomValue {
  property: string;
  value: string;
  type: string;
}

/** Property binding keeps real types. Every value below is read back from the actual element. */
@Component({
  selector: 'app-property-demo',
  styleUrl: './property-demo.scss',
  templateUrl: './property-demo.html',
})
export default class PropertyDemo {
  private readonly image = viewChild.required<ElementRef<HTMLImageElement>>('image');
  private readonly nameInput = viewChild.required<ElementRef<HTMLInputElement>>('nameInput');
  private readonly saveButton = viewChild.required<ElementRef<HTMLButtonElement>>('saveButton');
  private readonly bar = viewChild.required<ElementRef<HTMLProgressElement>>('bar');
  private readonly propButton = viewChild.required<ElementRef<HTMLButtonElement>>('propButton');
  private readonly textButton = viewChild.required<ElementRef<HTMLButtonElement>>('textButton');

  protected readonly themes: AvatarTheme[] = ['sunset', 'ocean', 'forest'];

  // PROFILE STATE
  protected readonly name = signal('Vishnu Bandgar');
  protected readonly theme = signal<AvatarTheme>('sunset');
  protected readonly locked = signal(false);
  protected readonly saving = signal(false);
  protected readonly saves = signal(0);
  protected readonly avatar = computed(() => avatarUrl(this.name(), this.theme()));

  // THE TRAP
  protected readonly blocked = signal(false);
  protected readonly clicks = signal({ prop: 0, text: 0 });

  // READ BACK FROM THE DOM
  protected readonly domValues = signal<DomValue[]>([]);
  protected readonly trapResult = signal({ prop: '…', text: '…' });

  constructor() {
    // Runs after Angular has updated the DOM, every time one of these signals changes
    afterRenderEffect({
      read: () => {
        this.avatar();
        this.locked();
        this.saving();
        this.saves();
        this.blocked();
        this.readDom();
      },
    });
  }

  protected save(): void {
    this.saving.set(true);
    setTimeout(() => {
      this.saving.set(false);
      this.saves.update((count) => Math.min(count + 1, 3));
    }, 1200);
  }

  protected countClick(button: 'prop' | 'text'): void {
    this.clicks.update((clicks) => ({ ...clicks, [button]: clicks[button] + 1 }));
  }

  private readDom(): void {
    const show = (property: string, value: unknown): DomValue => ({
      property,
      value:
        typeof value === 'string' && value.length > 34
          ? `"${value.slice(0, 34)}…"`
          : JSON.stringify(value),
      type: typeof value,
    });

    this.domValues.set([
      show('img.src', this.image().nativeElement.src),
      show('input.readOnly', this.nameInput().nativeElement.readOnly),
      show('button.disabled', this.saveButton().nativeElement.disabled),
      show('progress.value', this.bar().nativeElement.value),
    ]);

    this.trapResult.set({
      prop: String(this.propButton().nativeElement.disabled),
      text: String(this.textButton().nativeElement.disabled),
    });
  }
}
