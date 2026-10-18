import { Component, signal } from '@angular/core';
import { CityCard, ItemList, User } from './shop-views';

const START_ITEMS = ['Milk', 'Bread', 'Eggs'];
const EXTRAS = ['Tea', 'Jam', 'Rice', 'Dal', 'Curd'];
const CITIES = ['Mumbai', 'Delhi', 'Goa', 'Pune'];

interface Message {
  ok: boolean;
  text: string;
}

const startUser = (): User => ({ name: 'Vishnu', address: { city: 'Pune' } });

/** Same reference = no update. The child components only update when they get a new one. */
@Component({
  imports: [ItemList, CityCard],
  selector: 'app-immutable-updates-demo',
  styleUrl: './immutable-updates-demo.scss',
  templateUrl: './immutable-updates-demo.html',
})
export default class ImmutableUpdatesDemo {
  private extraIndex = 0;
  private cityIndex = 0;

  // A "{" in template text starts an ICU message, so this button label lives here
  protected readonly objectUpdate =
    'user.update(u => ({ ...u, address: { ...u.address, city: x } }))';

  // STATE
  protected readonly items = signal<string[]>([...START_ITEMS]);
  protected readonly user = signal<User>(startUser());

  protected readonly itemsMessage = signal<Message | null>(null);
  protected readonly userMessage = signal<Message | null>(null);

  // ❌ MUTATE: push into the same array, then set the same array back
  protected pushInPlace(): void {
    this.items().push(this.nextExtra());
    this.items.set(this.items());
    this.itemsMessage.set({
      ok: false,
      text: `The array really has ${this.items().length} items now, but the list still shows the old ones. Same reference, so Angular saw no change.`,
    });
  }

  // ✅ IMMUTABLE: a brand new array
  protected addImmutably(): void {
    const item = this.nextExtra();
    this.items.update((list) => [...list, item]);
    this.itemsMessage.set({
      ok: true,
      text: 'New array, so the list updated. Anything pushed in place earlier shows up now too: it was there all along.',
    });
  }

  // ❌ MUTATE: change a nested property on the same object
  protected moveInPlace(): void {
    this.user().address.city = this.nextCity();
    this.user.set(this.user());
    this.userMessage.set({
      ok: false,
      text: `user().address.city is "${this.user().address.city}" now, but the card still shows the old city.`,
    });
  }

  // ✅ IMMUTABLE: new object, and a new copy of the nested level we change
  protected moveImmutably(): void {
    const city = this.nextCity();
    this.user.update((user) => ({ ...user, address: { ...user.address, city } }));
    this.userMessage.set({ ok: true, text: 'New object, so the card updated.' });
  }

  protected reset(): void {
    this.items.set([...START_ITEMS]);
    this.user.set(startUser());
    this.extraIndex = 0;
    this.cityIndex = 0;
    this.itemsMessage.set(null);
    this.userMessage.set(null);
  }

  private nextExtra(): string {
    return EXTRAS[this.extraIndex++ % EXTRAS.length];
  }

  private nextCity(): string {
    return CITIES[this.cityIndex++ % CITIES.length];
  }
}
