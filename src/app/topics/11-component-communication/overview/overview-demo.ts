import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '@shared/ui/code-block/code-block';
import { CHANNELS } from './channels';

/** "Who needs to talk to whom?" Pick a situation, get the channel, its code and its lesson. */
@Component({
  selector: 'app-overview-demo',
  imports: [CodeBlock, RouterLink],
  styleUrl: './overview-demo.scss',
  templateUrl: './overview-demo.html',
})
export default class OverviewDemo {
  protected readonly channels = CHANNELS;
  protected readonly picked = signal(CHANNELS[0].id);
  protected readonly channel = computed(
    () => CHANNELS.find((channel) => channel.id === this.picked()) ?? CHANNELS[0],
  );
}
