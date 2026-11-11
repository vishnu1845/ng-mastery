## Definition

**`ElementRef`** is an Angular [[service|service]] that wraps the actual [[dom|DOM]] element. Its `nativeElement` is the real HTML element.

**`Renderer2`** is Angular's own API for changing the DOM, like `renderer.setStyle(el, 'color', 'red')`, instead of touching the element directly.

## Example

```ts
export class RendererTag {
  constructor() {
    const host = inject(ElementRef).nativeElement;
    const renderer = inject(Renderer2);

    afterNextRender(() => {
      const tag = renderer.createElement('span');
      renderer.addClass(tag, 'tag');
      renderer.appendChild(tag, renderer.createText('NEW'));
      renderer.appendChild(host, tag);
    });
  }
}
```

## Key points

The demo does the same job three ways and measures the result:

|                                                     | Template or host binding | `Renderer2` | `nativeElement` / `document` |
| --------------------------------------------------- | ------------------------ | ----------- | ---------------------------- |
| New element gets the [[component\|component]]'s CSS | Yes                      | Yes         | **No**                       |
| Unsafe HTML is cleaned                              | Yes                      | **No**      | **No**                       |
| Needs the browser's global `document`               | No                       | No          | Yes, to create elements      |

- **Why the CSS differs:** component styles are scoped with an attribute like `_ngcontent-ng-c123`. `Renderer2` adds that attribute to the elements it creates. `document.createElement` does not, so the scoped rule never matches.
- **Neither one protects from XSS.** `renderer.setProperty(el, 'innerHTML', html)` writes the string as it is, exactly like `nativeElement.innerHTML`. Only a [[template|template]] binding such as `[innerHTML]` is sanitized. In the demo, the `onclick` survives in both and is removed only by the binding.
- **What to use, in this order:**
  1. A template or `host` binding. It is the safest and needs no DOM code.
  2. `Renderer2`, when we must create or change elements from code.
  3. `ElementRef.nativeElement`, to read from the DOM (size, position), to call `focus()`, or to hand an element to a third-party [[library|library]].
- **Put DOM code in `afterNextRender`.** It runs only in the browser, after the element is on the page. The [[prerendering|prerendered]] HTML of this lesson contains only the tag from the template. The other two are added in the browser.
- `renderer.listen(el, 'click', handler)` returns a function. Calling it removes the listener.

## Say it like this

"`ElementRef` gives direct access to the DOM element through `nativeElement`. `Renderer2` is Angular's abstraction over DOM changes, so it does not depend on the browser's global objects, and the elements it creates get the component's scoped styles. But neither of them sanitizes HTML, only template bindings do that. So my order is: a template or host binding first, `Renderer2` when I have to create or change elements in code, and `nativeElement` for reading from the DOM or calling `focus()`, inside `afterNextRender` so it only runs in the browser."
