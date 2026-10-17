## Definition

A **Template Reference Variable** (`#var`) gives direct access to a DOM element or component in the template.

## Example

```html
<input type="email" #userInput /> <button (click)="getEmail(userInput)">Submit</button>
```

```ts
getEmail(input: HTMLInputElement) {
  this.email.set(input.value);
}
```

It avoids two-way binding when we only need the value on demand.

## What a ref points to

| We write                            | `#ref` gives us                       |
| ----------------------------------- | ------------------------------------- |
| `<input #box />`                    | the DOM element (`HTMLInputElement`)  |
| `<app-stopwatch #sw />`             | the component instance: `sw.start()`  |
| `<input ngModel #name="ngModel" />` | the directive, through its `exportAs` |
| `<ng-template #tpl>`                | a `TemplateRef`                       |

## Reading it in TS

```ts
private readonly emailBox = viewChild.required<ElementRef<HTMLInputElement>>('userInput');

focusEmail() {
  this.emailBox().nativeElement.focus();
}
```

## Scope

A ref belongs to its own template block. A ref created inside `@if` or `@for` can't be used outside it. Angular 22 stops the build with: _Property 'inner' does not exist on type 'MyComponent'_.

## Say it like this

"A template reference variable, written with a hash like `#emailInput`, gives the template direct access to an element or a component. With it, we can read a value on demand, like `emailInput.value` on click, without two-way binding. On a component, it gives us the instance, so we can call its methods, and with `exportAs`, like `#name=\"ngModel\"`, we get the directive itself. And if we need it in the TS class, we read it with `viewChild()`."
