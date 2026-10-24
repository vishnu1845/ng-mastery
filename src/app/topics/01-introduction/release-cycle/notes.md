## Definition

Angular follows **[[semver|semantic versioning]]** (`major.minor.patch`) and a fixed release schedule. Since **Angular 22**, a new **major version ships once a year**, and every major is supported for **24 months**: 12 months of active support plus 12 months of long-term support (LTS).

## Key points

- **A major release every 12 months**, with 4 to 6 minor releases in between and a patch release almost every week.
- **Until v22** the cycle was a major every 6 months, supported for 18 months (6 active + 12 LTS).
- **Active support**: regular updates and patches. **LTS**: only critical fixes and security patches.
- **Only majors can bring breaking changes**, and `ng update` migrates our code automatically.
- **Angular 22** was released in June 2026. **Angular 23** is expected in June 2027.

## Version highlights

| Version | Must remember                                                                                    |
| ------- | ------------------------------------------------------------------------------------------------ |
| 16      | Signals (developer preview), required inputs, `DestroyRef` / `takeUntilDestroyed()`              |
| 17      | `@if` / `@for` / `@switch`, `@defer`, esbuild + Vite builder, angular.dev                        |
| 18      | [[zoneless\|Zoneless]] (experimental), Material 3, `@let` (developer preview)                    |
| 19      | Standalone by default, `input()` / `output()` / `model()` stable                                 |
| 20      | Signal APIs stable, zoneless stable, `*ngIf` / `*ngFor` deprecated, new style guide              |
| 21      | Zoneless by default, Signal Forms (experimental), Vitest by default, Angular Aria                |
| 22      | [[onpush\|OnPush]] by default, Signal Forms and resources stable, Fetch by default, `@Service()` |

## Say it like this

"Angular follows a predictable schedule. Since version 22, a new major ships once a year, and each major is supported for 24 months: 12 months active plus 12 months LTS. Before that it was every six months. The big shift started in v16 with signals, then v17 gave us the new control flow and @defer, and from v19 to v21 Angular moved to standalone by default, stable signals and zoneless apps. Now in v22, OnPush is the default and Signal Forms are stable, so modern Angular is fully signal-first."
