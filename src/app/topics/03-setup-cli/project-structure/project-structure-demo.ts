import { Component, signal } from '@angular/core';
import { CodeBlock } from '@shared/ui/code-block/code-block';
import { NEW_PROJECT, OWNER_LABELS } from './new-project';

/** The project `ng new` creates: click any file to see who uses it and what's inside. */
@Component({
  imports: [CodeBlock],
  selector: 'app-project-structure-demo',
  styleUrl: './project-structure-demo.scss',
  templateUrl: './project-structure-demo.html',
})
export default class ProjectStructureDemo {
  protected readonly entries = NEW_PROJECT;
  protected readonly ownerLabels = OWNER_LABELS;

  // Start on the entry point
  protected readonly selected = signal(NEW_PROJECT.find((e) => e.path === 'main.ts')!);
}
