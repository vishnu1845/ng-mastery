## Definition

A **template reference** on a child is a **pull-based** alternative: instead of the child pushing data out with `emit()`, the parent directly reaches into the child and reads its state, or calls its methods, whenever it wants.

## Example

```html
<app-player #player (finished)="onFinished()" />

<button (click)="player.play()">Play</button>
<button (click)="player.pause()">Pause</button>
<p>{{ player.position() }}s</p>
```

```ts
export class SignalPlayer {
  readonly position = signal(0);
  readonly finished = output<void>();

  play() { … }
  pause() { … }
}
```

## Key points

- **What gives access, and what keeps it live.** `#player` gives the parent the child instance. A **[[signal|signal]]** is what makes the parent's view update when the child's value changes. Say it precisely: "we read the child through a template reference, and the signal keeps the parent's view in sync."
- **Measured in the demo.** The player's timer changes the position every second:

| Inside the child | What the parent shows while playing                                            |
| ---------------- | ------------------------------------------------------------------------------ |
| `signal(0)`      | Every second                                                                   |
| `position = 0`   | **Stays at 0.** Any click makes Angular look again, and the real time jumps in |

- With a plain property, nothing tells Angular about a change made by a timer, so no view refreshes. It "works" in a quick test only because a click happens to refresh the page.
- **Push and pull together.** The parent pulls with `#player` and gets pushed `(finished)` when the track ends.

| Approach               | Direction                | Mechanism                      |
| ---------------------- | ------------------------ | ------------------------------ |
| [[output\|`output()`]] | The child **pushes** out | An event the parent listens to |
| `#ref` + a signal      | The parent **pulls** in  | Direct access, read any time   |

- A template reference works only **in the [[template|template]]**. To use the child in the class, use [[view-child|`viewChild()`]].
- Only **public** members can be used through the reference.

## Say it like this

"Besides outputs, a parent can pull from a child with a template reference variable, like `#player`. That gives the parent the child instance, so the template can call `player.play()` or read `player.position()`. The reference is what gives access, and the signal is what keeps the parent's view updated. If the child kept the value in a plain property and changed it in a timer, the parent's view would not update, because nothing tells Angular about the change. So output is push from the child, and a reference is pull by the parent."
