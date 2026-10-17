## Definition

**Generics** let us write **reusable code that works with any type** while still keeping type safety. We pass the type as a parameter, usually written as `<T>`.

## Example

```ts
// GENERIC FUNCTION
function first<T>(items: T[]): T | undefined {
  return items[0];
}
first([1, 2, 3]);      // number
first(['a', 'b']);     // string

// GENERIC INTERFACE: one shape for every API response
interface ApiResponse<T> {
  data: T;
  message: string;
}
getUsers() {
  return this.http.get<ApiResponse<User[]>>('/api/users');
}

// CONSTRAINT: T must have an id
function findById<T extends { id: number }>(list: T[], id: number) {
  return list.find(item => item.id === id);
}
```

## We already use generics everywhere in Angular

`signal<User[]>([])`, `http.get<User>()`, `Observable<T>`, `input<string>()`, `output<number>()`.

## Say it like this

"Generics let us write one piece of code that works with many types without losing type safety. So instead of writing a separate function for users and products, we write it once with a type parameter `T`. And we use generics all the time in Angular, like `http.get<User[]>()` or `signal<User[]>([])`, so the response is fully typed."
