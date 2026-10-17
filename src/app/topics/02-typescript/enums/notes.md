## Definition

An **enum** is a **named set of constant values**. It can be numeric (auto-numbered from 0) or string-based.

## Example

```ts
// NUMERIC ENUM: Pending = 0, Shipped = 1, Delivered = 2
enum OrderStatus {
  Pending,
  Shipped,
  Delivered,
}

// STRING ENUM
enum Theme {
  Light = 'LIGHT',
  Dark = 'DARK',
}

let status = OrderStatus.Shipped; // 1

// USING AN ENUM IN A TEMPLATE: expose it on the component
export class Orders {
  protected readonly OrderStatus = OrderStatus;
}

// ALTERNATIVE MANY TEAMS PREFER: no extra JS generated
type OrderState = 'pending' | 'shipped' | 'delivered';
```

## Key distinction

An enum **generates real JavaScript code**, while a literal union type is **erased at compile time**. That's why many teams prefer union types. A numeric enum also maps both ways: `OrderStatus.Shipped` is `1`, and `OrderStatus[1]` is `'Shipped'`.

## Say it like this

"An enum is a named set of constants, like order statuses, so we don't scatter magic strings or numbers around the code. Enums can be numeric or string-based. One thing to know is that enums generate extra JavaScript, so for simple cases many teams prefer literal union types, which disappear after compilation."
