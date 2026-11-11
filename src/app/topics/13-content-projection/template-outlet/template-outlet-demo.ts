import { Component, signal } from '@angular/core';
import { RunCount } from '@shared/ui/run-count/run-count';
import { RunCounter } from '@shared/utils/run-counter';
import { ChartWidget } from '../_shared/chart-widget';
import {
  ContentCollapsible,
  ContentRepeat,
  TemplateCollapsible,
  TemplateRepeat,
} from '../_shared/content-vs-template';
import { PeopleList, Person } from './people-list';

/** <ng-content> next to a template: when content is created, how often, and a template passed as an input. */
@Component({
  selector: 'app-template-outlet-demo',
  imports: [
    ContentCollapsible,
    TemplateCollapsible,
    ContentRepeat,
    TemplateRepeat,
    ChartWidget,
    RunCount,
    PeopleList,
  ],
  providers: [RunCounter],
  styleUrl: './template-outlet-demo.scss',
  templateUrl: './template-outlet-demo.html',
})
export default class TemplateOutletDemo {
  protected readonly compact = signal(true);
  protected readonly people: Person[] = [
    { name: 'Naruto Uzumaki', team: 'Team 7' },
    { name: 'Hinata Hyuga', team: 'Team 8' },
    { name: 'Sakura Haruno', team: 'Team 7' },
  ];
}
