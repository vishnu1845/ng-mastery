import { Component, model } from '@angular/core';

/** MODERN: one model() is an input and an output together. */
@Component({
  selector: 'app-volume-knob',
  styleUrl: './volume-knob.scss',
  template: `
    <label class="field">
      <span>Child's slider, model()</span>
      <input
        #slider
        type="range"
        min="0"
        max="100"
        [value]="volume()"
        (input)="volume.set(+slider.value)"
      />
    </label>
    <span class="mono">{{ volume() }}%</span>
  `,
})
export class VolumeKnob {
  // Writing it here also emits volumeChange to the parent
  readonly volume = model(50);
}
