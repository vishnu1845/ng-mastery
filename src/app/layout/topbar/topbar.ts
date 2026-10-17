import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { APP_LINKS } from '@core/app-links';
import { Logo } from '../logo/logo';
import { ThemeMenu } from '../theme-menu/theme-menu';

@Component({
  imports: [RouterLink, NgIcon, Logo, ThemeMenu],
  selector: 'app-topbar',
  styleUrl: './topbar.scss',
  templateUrl: './topbar.html',
})
export class Topbar {
  readonly menuClick = output<void>();
  readonly searchClick = output<void>();

  protected readonly repoUrl = APP_LINKS.repo;
}
