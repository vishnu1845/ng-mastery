## Definition

A **Single Page Application (SPA)** is a web application that **loads only once** and then **dynamically updates content without reloading the entire page**, based on user interactions. A **Multi Page Application (MPA)** **loads a new HTML page from the server** every time the user navigates.

## Key distinctions

|              | SPA                                                  | MPA                                  |
| ------------ | ---------------------------------------------------- | ------------------------------------ |
| Page loads   | Once, then only data                                 | Full page reload on every navigation |
| Server sends | JSON data (APIs)                                     | Full HTML pages                      |
| Navigation   | Fast, app-like                                       | Slower, the screen flashes           |
| First load   | Heavier (JS [[bundle\|bundle]])                      | Lighter                              |
| SEO          | Needs [[ssr\|SSR]] or [[prerendering\|prerendering]] | SEO-friendly by default              |
| Examples     | Gmail, Angular apps                                  | Wikipedia, classic websites          |

## How Angular makes an SPA

The **Router** swaps [[component|components]] inside `<router-outlet>` when the URL changes, and **HttpClient** fetches only JSON data. There is no full page reload, so state in memory (like a cart) survives navigation.

## Say it like this

"In an MPA, every click goes to the server and we get a brand new HTML page, so the screen reloads and in-memory state is lost. In an SPA, the browser loads the app only once. After that, the router just swaps components and we fetch only JSON data, so navigation feels instant, like a mobile app. The trade-off is SEO and the first load, and that's exactly why Angular gives us SSR and prerendering."
