import { Component, EventEmitter, Input, Output } from '@angular/core';

/** OLDER: the same two-way contract written by hand, an input x and an output named xChange. */
@Component({
  selector: 'app-volume-knob-old',
  styleUrl: './volume-knob.scss',
  template: `
    <label class="field">
      <span>Child's slider, &#64;Input + &#64;Output</span>
      <input
        #slider
        type="range"
        min="0"
        max="100"
        [value]="volume"
        (input)="setVolume(+slider.value)"
      />
    </label>
    <span class="mono">{{ volume }}%</span>
  `,
})
export class VolumeKnobOld {
  @Input() volume = 50;
  // The name must be the input's name + "Change", or [( )] can't use it
  @Output() volumeChange = new EventEmitter<number>();

  protected setVolume(value: number): void {
    this.volume = value;
    this.volumeChange.emit(value);
  }
}
