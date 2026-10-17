import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Catalog, topicNumber } from '@topics/catalog';
import { Logo } from '../logo/logo';

/** Topic navigation, generated from the registry. Only parts with live lessons are listed. */
@Component({
  imports: [RouterLink, RouterLinkActive, NgIcon, Logo],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  protected readonly catalog = inject(Catalog);
  protected readonly topicNumber = topicNumber;
  protected readonly liveTopicCount = this.catalog.liveParts.reduce(
    (sum, part) => sum + part.topics.length,
    0,
  );
}
