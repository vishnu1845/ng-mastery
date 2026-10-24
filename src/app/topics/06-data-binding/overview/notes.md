## Definition

**Data Binding** enables communication between the **[[component|component]] (TS)** and the **view (HTML)**. It allows static or dynamic data flow between component.ts and component.html.

## The 4 types

| Type             | Direction | Syntax               |
| ---------------- | --------- | -------------------- |
| Interpolation    | TS ➝ View | `{{ data }}`         |
| Property binding | TS ➝ View | `[property]="data"`  |
| Event binding    | View ➝ TS | `(event)="method()"` |
| Two-way binding  | TS ⬌ View | `[(ngModel)]="data"` |

Attribute, class and style binding (`[attr.x]`, `[class.x]`, `[style.x]`) are special forms of property binding. Template reference variables (`#ref`) give the [[template|template]] direct access to an element. Each one has its own lesson in this topic.

## Example

```ts
@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  template: `
    <h3>Hi, {{ name() }}</h3>
    <progress [value]="likes()" max="5"></progress>
    <button (click)="like()">Like</button>
    <input [(ngModel)]="name" />
  `,
})
export class Profile {
  name = signal('Vishnu');
  likes = signal(0);

  like() {
    this.likes.update((n) => n + 1);
  }
}
```

## Binding with signals

In modern Angular, we keep component state in **[[signal|signals]]**. The template calls them like functions (`name()`), and when a signal changes, Angular updates only the bindings that read it. No [[zone-js|zone.js]] needed: new apps are [[zoneless|zoneless]] by default since v21, and this whole site runs without zone.js.

## Say it like this

"Data binding is how the component class and the template talk to each other. There are four types. Interpolation and property binding send data from TS to the view, event binding sends user actions from the view back to TS, and two-way binding keeps both in sync with `[(ngModel)]`. And in modern Angular, we keep the state in signals, so when a value changes, Angular updates exactly the bindings that use it."
