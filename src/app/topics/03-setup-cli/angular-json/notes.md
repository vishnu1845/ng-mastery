## Definition

`angular.json` is the **workspace configuration file for the Angular CLI**. It tells the CLI **how to build, serve and test** each project: entry file, assets, styles, budgets and environment settings.

## Example (from a new v22 app)

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [{ "glob": "**/*", "input": "public" }],
            "styles": ["src/styles.css"]
          },
          "configurations": {
            "production": {
              "budgets": [{ "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" }],
              "outputHashing": "all"
            },
            "development": { "optimization": false, "sourceMap": true }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "defaultConfiguration": "development"
        },
        "test": { "builder": "@angular/build:unit-test" }
      }
    }
  }
}
```

## Keys

| Key                 | Meaning                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `projects`          | One workspace can hold many apps & libraries                      |
| `architect`         | Targets: `build`, `serve`, `test`…                                |
| `builder`           | The tool that runs the target (esbuild-based application builder) |
| `browser`           | Entry file → `src/main.ts`                                        |
| `assets` / `styles` | Static files & global CSS to include                              |
| `configurations`    | `production` vs `development` settings                            |
| `budgets`           | Warn / fail the build if [[bundle\|bundles]] get too big          |

## Key points

- `ng build` uses **production** by default, `ng serve` uses **development** by default (`defaultConfiguration`).
- `outputHashing: "all"` adds a content hash to file names (`main-ABC123.js`), so browsers never cache an old version.
- This project's real `angular.json` is in the **Code** tab.

## Say it like this

"angular.json is the brain of the CLI. When we run `ng build` or `ng serve`, the CLI reads this file to know the entry point, which assets and global styles to include, and which builder to use. It also holds configurations like production and development, so things like budgets, output hashing and source maps change based on the build we run."
