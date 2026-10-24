## Definition

**Two-Way Binding** 🍌 "banana in a box" gives real-time sync input ⬌ [[component|component]], using `[(ngModel)]="data"`.

## Example

```ts
@Component({
  selector: 'app-root',
  imports: [FormsModule], // ngModel lives here
  template: `
    <input [(ngModel)]="userName" />
    <p>Username: {{ userName() }}</p>
  `,
})
export class App {
  userName = signal('@Buddy'); // works directly with a signal
}
```

⚠️ Requires **FormsModule**, in the component's `imports` (standalone) or in an [[ngmodule|NgModule]] (legacy). Without it, the [[template|template]] fails to compile: _Can't bind to 'ngModel' since it isn't a known property of 'input'_.

## How `[(ngModel)]` works internally

It's syntactic sugar for property binding plus event binding:

```html
<input [ngModel]="userName()" (ngModelChange)="userName.set($event)" />
```

`[ngModel]` sends the value into the input, and `(ngModelChange)` sends every new value back.

## Not just ngModel

`[(x)]` works on **any** component with an `x` input and an `xChange` output. `model()` creates both in one line:

```ts
export class QtyStepper {
  value = model(1);
}
```

```html
<app-qty-stepper [(value)]="quantity" />
```

## Say it like this

"Two-way binding keeps a value in sync both ways, from TS to the view and back, using the banana-in-a-box syntax `[(ngModel)]`. It needs FormsModule, and under the hood it's just property binding plus event binding: `[ngModel]` sends the value in, and `(ngModelChange)` sends the new value back. It works directly with signals, and we can build the same thing for our own components with `model()`, like `[(value)]` on a quantity stepper."
