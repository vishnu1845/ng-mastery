import { afterNextRender, Component, ElementRef, signal, viewChild } from '@angular/core';
import { BlockCard, InlineCard, ThemedCard } from './cards';

const ACCENTS = [
  { name: 'Rose', value: '#e11d48' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Violet', value: '#7c3aed' },
];

/** :host on the component's own tag, :host(.active), and theming a child with a CSS variable. */
@Component({
  imports: [InlineCard, BlockCard, ThemedCard],
  selector: 'app-host-styling-demo',
  styleUrl: './host-styling-demo.scss',
  templateUrl: './host-styling-demo.html',
})
export default class HostStylingDemo {
  private readonly inline = viewChild.required(InlineCard, { read: ElementRef });
  private readonly block = viewChild.required(BlockCard, { read: ElementRef });

  protected readonly accents = ACCENTS;
  protected readonly accent = signal(ACCENTS[0].value);
  protected readonly active = signal(true);

  // REAL computed `display` of each host, read from the browser
  protected readonly inlineDisplay = signal('');
  protected readonly blockDisplay = signal('');

  constructor() {
    afterNextRender(() => {
      this.inlineDisplay.set(getComputedStyle(this.inline().nativeElement).display);
      this.blockDisplay.set(getComputedStyle(this.block().nativeElement).display);
    });
  }
}
