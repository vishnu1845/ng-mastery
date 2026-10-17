## Definition

- **Library**: a collection of modules/classes used to achieve a **specific task** (e.g., Chart.js, PrimeNG).
- **Framework**: a collection of libraries/packages at a single point, with **its own rules and structure** to build complete web apps.

## Key distinction: who is in control?

We call a library when we need it. A framework calls our code. This is called **Inversion of Control**.

|           | Library                  | Framework                                     |
| --------- | ------------------------ | --------------------------------------------- |
| Control   | We call it               | It calls our code                             |
| Scope     | One specific task        | Complete application                          |
| Structure | We decide                | The framework decides (rules and conventions) |
| Examples  | Chart.js, PrimeNG, React | Angular                                       |

## Angular vs React

|               | Angular                                     | React                                  |
| ------------- | ------------------------------------------- | -------------------------------------- |
| Type          | Full framework                              | UI library                             |
| Language      | TypeScript by default                       | JavaScript / JSX (TypeScript optional) |
| Built in      | Router, forms, HttpClient, DI, testing, CLI | Only the UI layer                      |
| Data binding  | One-way and two-way                         | One-way                                |
| Reactivity    | Signals                                     | State and hooks                        |
| Maintained by | Google                                      | Meta                                   |

## Say it like this

"The main difference is control. With a library, we call it only when we need it, like Chart.js just for charts. With a framework, the framework calls our code and gives us the full structure. That's why Angular is a framework: routing, forms, HTTP, dependency injection and the CLI all come built in. React, on the other hand, is a UI library, so we pick separate libraries for routing, forms and data fetching."
