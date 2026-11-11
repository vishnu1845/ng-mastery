import { Component, signal } from '@angular/core';
import { EventLog, LogBook } from '../_shared/event-log';
import { VolumeKnob } from './volume-knob';
import { VolumeKnobOld } from './volume-knob-old';

/** One parent value, three children: two with two-way binding, one with one-way only. */
@Component({
  selector: 'app-model-two-way-demo',
  imports: [VolumeKnob, VolumeKnobOld, EventLog],
  styleUrl: './model-two-way-demo.scss',
  templateUrl: './model-two-way-demo.html',
})
export default class ModelTwoWayDemo {
  protected readonly volume = signal(50);
  protected readonly log = new LogBook(5);

  protected readonly bindings = {
    model: '<app-volume-knob [(volume)]="volume" />',
    old: '<app-volume-knob-old [(volume)]="volume" />',
    oneWay: '<app-volume-knob [volume]="volume()" />',
  };

  protected changed(from: string, value: number): void {
    this.log.addValue('volumeChange', `${from} sent ${value}`, value);
  }
}
