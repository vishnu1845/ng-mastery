## Definition

**Node.js** is a JavaScript runtime that runs JS **outside the browser**. The Angular CLI and build tools run on Node. **npm** is the package manager that comes with Node; we use it to install Angular and other libraries.

## Commands

```bash
node -v    # check Node version
npm -v     # check npm version

nvm install 24.15.0   # install another Node version
nvm use 24.15.0       # switch to it for this project
```

## Which Node for which Angular

| Angular | Node.js                               |
| ------- | ------------------------------------- |
| 22      | `^22.22.3 \|\| ^24.15.0 \|\| ^26.0.0` |
| 20, 21  | `^20.19.0 \|\| ^22.12.0 \|\| ^24.0.0` |
| 18, 19  | `^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0` |
| 17      | `^18.13.0 \|\| ^20.9.0`               |
| 16      | `^16.14.0 \|\| ^18.10.0`              |
| 9       | `^10.13.0 \|\| ^12.11.0`              |

Source: angular.dev → Reference → Versions.

## Key points

- **Angular 22** runs on **Node 22, 24 or 26**. Node 20 support was dropped in v22.
- **Older projects need older Node** (an Angular 9 app won't build on Node 24), so we use **nvm** to switch Node versions per project.
- **Key distinction:** Node is needed only for **development & building** (and for the server in SSR). The final app runs in the **browser** as plain JS, HTML and CSS.

## Say it like this

"Node.js lets JavaScript run outside the browser, and that's what the Angular CLI and build tools run on. npm comes with Node and installs our packages. So Node is a development tool for us; the final build is just static JS, HTML and CSS that runs in the browser. And since every Angular version supports specific Node versions, we use nvm when we switch between old and new projects."
