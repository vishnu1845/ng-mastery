## Definition

The **router** can carry data from one page to the next in three ways: a **path param** (`/orders/102`), a **query param** (`?tab=items`), and **navigation state**, which travels with the navigation but is not in the URL.

## Example

```html
<a [routerLink]="[order.id]" [queryParams]="{ tab: 'items' }" [state]="{ from: 'the order list' }">
  Open
</a>
```

```ts
// the same from code
this.router.navigate([order.id], {
  relativeTo: this.route,
  queryParams: { tab: 'payment' },
  state: { from: 'router.navigate()' },
});
```

```ts
// the next page, with provideRouter(routes, withComponentInputBinding())
export class OrderDetail {
  readonly id = input.required<string>(); // from :id
  readonly tab = input<string>(); // from ?tab=
  private readonly location = inject(Location);
  readonly state = this.location.getState(); // from the navigation
}
```

## Key points

| Channel     | Example         | In the URL | Survives a reload | Survives a copied link |
| ----------- | --------------- | ---------- | ----------------- | ---------------------- |
| Path param  | `/orders/102`   | Yes        | Yes               | Yes                    |
| Query param | `?tab=items`    | Yes        | Yes               | Yes                    |
| State       | `{ from: '…' }` | **No**     | Yes, same tab     | **No**                 |

- All three were measured in the demo, including the reload and a fresh tab.
- **`withComponentInputBinding()`** turns path params, query params and route data into [[component|component]] inputs, matched by name. Without it, read them from `ActivatedRoute`.
- **Use params for what identifies the page** (which order), **query params for options** (which tab, filters, page number), and **state only for extras** the page can live without, like "where did the user come from".
- Values in the URL are always **strings**. Convert them with `numberAttribute` or `Number()`.
- `router.getCurrentNavigation()` is deprecated since v20.2. Use the `router.currentNavigation()` [[signal|signal]] while navigating, or `Location.getState()` on the page.
- Routing gets two full topics later: 17 and 18.

## Say it like this

"To pass data between pages, the router gives three options. Path params identify the page, like an order id. Query params carry options, like the selected tab or filters. Both live in the URL, so they survive a reload and work in shared links. Navigation state travels with the navigation but not in the URL, so it is lost when someone opens a copied link. On the target page, `withComponentInputBinding()` lets me receive params and query params directly as inputs."
