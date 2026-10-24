## Definition

**AngularJS** (1.x, 2010) was the first version, written in JavaScript and based on MVC with `$scope`. **Angular** (2+, 2016) is a **complete rewrite** in [[typescript|TypeScript]] with a [[component|component]]-based architecture.

## Key distinctions

|                                                | AngularJS (1.x)                                 | Angular (2+)                                                           |
| ---------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------- |
| Released                                       | 2010                                            | 2016 (complete rewrite)                                                |
| Language                                       | JavaScript                                      | TypeScript                                                             |
| Architecture                                   | MVC with `$scope` and controllers               | Component-based                                                        |
| [[change-detection\|Change detection]]         | Digest cycle (dirty checking), slow in big apps | [[zone-js\|Zone.js]], now [[signal\|signals]] + [[zoneless\|zoneless]] |
| [[dependency-injection\|Dependency injection]] | Basic                                           | Hierarchical                                                           |
| Compilation                                    | In the browser at runtime                       | [[aot-compilation\|AOT]] at build time                                 |
| CLI                                            | No                                              | Yes, [[angular-cli\|Angular CLI]]                                      |
| Status                                         | Support ended (January 2022)                    | Actively developed                                                     |

## Say it like this

"AngularJS was the first version, written in JavaScript and based on MVC with `$scope` and a digest cycle, and that digest cycle got slow in large apps. So Google rewrote it from scratch as Angular 2 in TypeScript, with a component-based architecture, hierarchical DI, AOT compilation and the CLI. AngularJS support ended in January 2022, so today when we say Angular, we mean Angular 2 and above."

## Rapid-fire

- **Why is there no Angular 3?** The router package was already at v3, so the team jumped from 2 to 4 to keep every package on the same version.
