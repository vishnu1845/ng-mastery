## Definition

`index.html` is the **single HTML page** of our SPA. It holds the `<app-root>` tag, which is where Angular **renders the root component**.

## Example

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>MyApp</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <app-root>Loading…</app-root>
    <!-- shown until Angular renders -->
  </body>
</html>
```

## Key points

- **No `<script>` tags** in the source; the CLI **injects** the bundled JS & CSS at build time.
- `<app-root>` must match the root component's `selector: 'app-root'`.
- `<base href="/">` tells the router the base URL of the app.
- Anything inside `<app-root>` (like a loader) shows until Angular takes over.
- Once the app is running, Angular adds an `ng-version` attribute to `<app-root>`. Open DevTools on any Angular site to see its version.

## Say it like this

"Since Angular is an SPA, `index.html` is the only HTML page we have. It mainly contains the `<app-root>` tag, which matches our root component's selector, and that's where Angular renders the whole app. We don't add script tags ourselves; the CLI injects the bundles during the build. And we can even put a loading message inside `<app-root>` that shows until Angular starts."
