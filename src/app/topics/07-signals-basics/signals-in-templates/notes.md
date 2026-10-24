## Definition

In [[template|templates]], we read a signal by **calling it**: `{{ count() }}`. The template becomes a reader of that signal, so when the signal changes, Angular refreshes **only that [[component|component]]** and writes **only the [[dom|DOM]] nodes whose values changed**.

## Example

<!-- prettier-ignore -->
```html
<!-- interpolation and property binding -->
<h3>{{ name() }}</h3>
<span [class.online]="online()">{{ online() ? 'Online' : 'Away' }}</span>

<!-- @let: read once, reuse in this template -->
@let total = price() * qty();
<p>{{ qty() }} × ₹{{ price() }} = ₹{{ total }}</p>

<!-- @if with "as": unwrap a signal that can be null -->
@if (user(); as u) {
  <p>Hi {{ u.name }}</p>
}
```

## Key points

- Forgot the `()`? Angular 22 warns twice at build time: **NG8109** (_followers is a function and should be invoked: followers()_) and **NG8117** (_Function in text [[interpolation|interpolation]] should be invoked: followers()_). In dev mode, the screen would show `[Signal: 12]` instead of `12`.
- Reading a signal in the template is what tells Angular to refresh that component. With signals, we never call `markForCheck()` by hand, even with [[onpush|OnPush]] (the default in v22).
- Angular patches only the text and attributes that actually changed. The demo flashes every DOM node that really changed.
- `@let` (v18.1+) keeps a template value in a local variable. It's still recalculated on every refresh, so heavy logic belongs in a `computed()`.

## Say it like this

"In the template, we read a signal by calling it, like `{{ count() }}`. That read registers the template as a reader, so when the signal changes, Angular marks just that component for update and patches only the DOM nodes that use it. If we forget the parentheses, the compiler warns us with NG8109. And with `@let` or `@if` with `as`, we can read a signal once and reuse the value in the template."
