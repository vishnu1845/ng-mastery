## Definition

**Environment files** hold **settings that change per build**, like the API URL. The CLI swaps the file at build time using `fileReplacements`.

## Setup

```bash
ng generate environments   # not created by default since v15
```

```ts
// src/environments/environment.ts (PRODUCTION, the default)
export const environment = {
  production: true,
  apiUrl: 'https://api.myshop.com',
};

// src/environments/environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};

// ANY SERVICE: always import the base file
import { environment } from '../../environments/environment';
private apiUrl = environment.apiUrl;
```

```json
// angular.json → build → configurations → development
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.development.ts"
  }
]
```

## Key points

- We always import `environment.ts`. The CLI swaps it for `environment.development.ts` only in the development build.
- `ng serve` uses development, `ng build` uses production, so the right URL is picked automatically.
- ⚠️ **Never put secrets** (API keys, passwords) in environment files. They are bundled into the JS and **anyone can read them** in the browser.

## Say it like this

"For values that change between dev and production, like the API URL, we run `ng generate environments`. It creates a base environment file for production and a development one, and adds `fileReplacements` in angular.json. So in our code we always import the base file, and at build time the CLI swaps in the right one. And we never keep secrets there, because everything ends up in the browser bundle."

## Rapid-fire (whole topic)

- **Default dev server port?** → `4200`; change with `ng serve --port 4300`
- **Where does the build go?** → `dist/<app-name>/browser`
- **Is `ng build` dev or prod?** → Production by default (since v12)
- **Why is `node_modules` not committed?** → It's huge and can be rebuilt from `package-lock.json`
- **What is the `.angular/` folder?** → CLI build cache; safe to delete, git-ignored
- **`npm install` vs `npm ci`?** → `ci` installs exactly from the lock file, clean & fast, for CI
- **`npm install` vs `ng add`?** → `ng add` installs **and** configures the [[library|library]]
