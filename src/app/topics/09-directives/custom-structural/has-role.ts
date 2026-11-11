import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role, Session } from './session';

/** Renders its element only for the given roles: `<button *appHasRole="'admin'">`. */
@Directive({ selector: '[appHasRole]' })
export class HasRole {
  // The element we sit on, as a template that is not rendered yet
  private readonly template = inject(TemplateRef);
  // The place in the DOM where we can stamp that template
  private readonly container = inject(ViewContainerRef);
  private readonly session = inject(Session);

  readonly roles = input.required<Role | Role[]>({ alias: 'appHasRole' });
  /** Filled by the `else` word: `*appHasRole="'admin'; else locked"`. The name is selector + word. */
  readonly appHasRoleElse = input<TemplateRef<unknown> | null>(null);

  constructor() {
    // Runs again whenever the role, the allowed roles or the fallback changes
    effect(() => {
      const allowed = [this.roles()].flat().includes(this.session.role());
      const view = allowed ? this.template : this.appHasRoleElse();

      this.container.clear();
      if (view) this.container.createEmbeddedView(view);
    });
  }
}
