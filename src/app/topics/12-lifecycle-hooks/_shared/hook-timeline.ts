import { Component, computed, inject, input } from '@angular/core';
import { HookLog } from './hook-log';

/**
 * Shows what HookLog recorded: each button press with its hooks in order,
 * and optionally a table of how many times each hook ran.
 *
 * It reads the log in its own template, so showing the log refreshes only this component.
 * The demo components are never checked again just because the log changed.
 */
@Component({
  selector: 'app-hook-timeline',
  styleUrl: './hook-timeline.scss',
  template: `
    @if (rows().length) {
      <div class="table-wrap">
        <table class="data-table counts">
          <caption>
            How many times each hook ran
          </caption>
          <thead>
            <tr>
              <th scope="col">Hook</th>
              @for (name of who(); track name) {
                <th scope="col">
                  <span class="who" [attr.data-who]="name">{{ name }}</span>
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of rows(); track row.hook) {
              <tr>
                <th scope="row" class="mono">{{ row.hook }}</th>
                @for (count of row.counts; track $index) {
                  <td class="mono" [class.zero]="count === 0">{{ count }}</td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>
    }

    <div class="steps" aria-live="polite">
      @for (step of log.steps(); track step.id; let latest = $first) {
        <section class="step" [class.latest]="latest">
          <h3>
            {{ step.label }}
            <span class="muted"
              >{{ step.calls.length }} {{ step.calls.length === 1 ? 'call' : 'calls' }}</span
            >
          </h3>
          <ol>
            @for (call of step.calls; track call.id) {
              <li>
                <span class="who" [attr.data-who]="call.who">{{ call.who }}</span>
                <span class="what">
                  <code>{{ call.hook }}</code>
                  @if (call.detail) {
                    <span class="detail">{{ call.detail }}</span>
                  }
                </span>
              </li>
            } @empty {
              <li class="none">No hook ran.</li>
            }
          </ol>
        </section>
      } @empty {
        <p class="none">{{ empty() }}</p>
      }
    </div>
  `,
})
export class HookTimeline {
  protected readonly log = inject(HookLog);

  /** Components to count, in column order. Leave it empty to hide the table. */
  readonly who = input<string[]>([]);
  /** Hooks to count, in row order. */
  readonly hooks = input<string[]>([]);
  readonly empty = input('Nothing ran yet.');

  protected readonly rows = computed(() => {
    const counts = this.log.counts();
    if (this.who().length === 0) return [];
    return this.hooks().map((hook) => ({
      hook,
      counts: this.who().map((who) => counts[`${who}.${hook}`] ?? 0),
    }));
  });
}
