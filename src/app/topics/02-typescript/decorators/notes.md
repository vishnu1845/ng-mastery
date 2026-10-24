## Definition

A **Decorator** is a **TypeScript feature** (defined with the **@ symbol**) that tells Angular **how to process a class**. It adds [[metadata|metadata]] to modify or enhance the behavior of a class, property, method, or parameter — without changing its actual code.

## Under the hood

A decorator is just a **function** that runs on the thing it decorates. Angular's compiler reads them at build time ([[aot-compilation|AOT]]).

```ts
@Component({ selector: 'app-user', template: '...' }) // CLASS decorator
export class UserCard {
  @Input() name = ''; // PROPERTY decorator
  @HostListener('click') onClick() {} // METHOD decorator
  constructor(@Optional() private logger: Logger) {} // PARAMETER decorator
}
```

## Our own decorator (from the demo)

```ts
export function logCall(_target: object, methodName: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: number[]) {
    const result = original.apply(this, args);
    console.log(`${methodName}(${args.join(', ')}) → ${result}`);
    return result;
  };
}

class PriceCalculator {
  @logCall
  withTax(price: number) {
    return Math.round(price * 1.18);
  }
}
```

## Modern Angular

Most property & parameter decorators now have **function** versions: `input()`, `output()`, `model()`, `viewChild()`, `inject()`. Class decorators like `@Component` stay.

**Trap question:** Are decorators an Angular feature? → No, they are a **TypeScript** feature. Angular just uses them heavily for metadata.

## Say it like this

"A decorator is a TypeScript feature written with the @ symbol. It's basically a function that attaches metadata to a class, property, method or parameter. So `@Component` turns a plain class into a component, and `@Injectable` makes it available for dependency injection. In modern Angular, many decorators like `@Input` and `@ViewChild` are being replaced by signal functions like `input()` and `viewChild()`, but class decorators stay."
