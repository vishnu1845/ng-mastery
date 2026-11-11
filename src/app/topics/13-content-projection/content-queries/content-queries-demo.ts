import { Component, signal } from '@angular/core';
import { Tab, Tabs } from './tabs';

interface Profile {
  name: string;
  about: string;
}

/** The same tabs twice: default contentChildren, and with descendants: true. */
@Component({
  selector: 'app-content-queries-demo',
  imports: [Tabs, Tab],
  styleUrl: './content-queries-demo.scss',
  templateUrl: './content-queries-demo.html',
})
export default class ContentQueriesDemo {
  protected readonly profiles = signal<Profile[]>([
    { name: 'Edward', about: 'Fullmetal Alchemist, youngest State Alchemist.' },
    { name: 'Erza', about: 'Titania, S-class wizard of Fairy Tail.' },
  ]);

  private readonly extra: Profile[] = [
    { name: 'Killua', about: 'Assassin family heir, Hunter.' },
    { name: 'Itachi', about: 'Uchiha prodigy.' },
    { name: 'Nezuko', about: 'Bamboo muzzle, strong will.' },
  ];

  protected addTab(): void {
    const next = this.extra[(this.profiles().length - 2) % this.extra.length];
    this.profiles.update((profiles) => [...profiles, next]);
  }

  protected removeTab(): void {
    this.profiles.update((profiles) => profiles.slice(0, -1));
  }
}
