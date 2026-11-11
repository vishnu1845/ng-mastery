import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  model,
  output,
} from '@angular/core';

/** The same directive in the older style: one decorator per binding and per listener. */
@Directive({ selector: '[appDropdownOld]' })
export class DropdownDecorators {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly open = model(false);
  readonly heard = output<void>();

  // HOST BINDINGS
  @HostBinding('class.is-open')
  protected get isOpen(): boolean {
    return this.open();
  }

  @HostBinding('attr.data-state')
  protected get state(): string {
    return this.open() ? 'open' : 'closed';
  }

  // HOST LISTENERS
  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: Event): void {
    this.heard.emit();
    const inside = event.target instanceof Node && this.host.contains(event.target);
    if (!inside) this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.open.set(false);
  }
}
