## Definition

Both `type` and `interface` are used to **define the shape of data** in TypeScript, like the structure of an object. The difference is that `interface` is mainly used for objects and classes and supports **declaration merging**. A `type` is more flexible because, along with objects, it can also define **unions, intersections, primitives, and tuples**, which an interface cannot.

## Example

```ts
// OBJECT SHAPE: both work the same
interface User {
  name: string;
  age: number;
}
type UserType = { name: string; age: number };

// ONLY TYPE: unions, primitives, tuples
type Status = 'active' | 'inactive';
type ID = string | number;

// ONLY INTERFACE: declaration merging
interface Box {
  width: number;
}
interface Box {
  height: number;
} // Box now has width + height

// EXTENDING: different syntax
interface Admin extends User {
  role: string;
} // interface → extends
type AdminType = UserType & { role: string }; // type → &
```

## Comparison

|                              | `interface` | `type`                 |
| ---------------------------- | ----------- | ---------------------- |
| Object shapes                | ✅          | ✅                     |
| Unions / primitives / tuples | ❌          | ✅                     |
| Declaration merging          | ✅          | ❌                     |
| Extend                       | `extends`   | `&` (intersection)     |
| Class can `implements`       | ✅          | ✅ (object types only) |

## Say it like this

"Both define the shape of data. I use `interface` for object and class structures, like API models, because it's clean and supports declaration merging. And I use `type` when I need unions, intersections, or to alias primitives, like `type Status = 'active' | 'inactive'`. For plain object shapes, both work almost the same, so the key is to stay consistent."
