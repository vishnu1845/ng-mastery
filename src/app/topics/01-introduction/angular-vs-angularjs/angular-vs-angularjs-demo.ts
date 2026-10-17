import { Component, signal } from '@angular/core';
import { CodeBlock } from '@shared/ui/code-block/code-block';

type Era = 'angularjs' | 'angular';

// The same counter written in both versions
const ANGULARJS_COUNTER = `// AngularJS 1.x (2010): a controller writes to $scope
angular.module('shop', []).controller('CounterCtrl', function ($scope) {
  $scope.count = 0;
  $scope.increment = function () {
    $scope.count++;
  };
});

// Template
// <div ng-controller="CounterCtrl">
//   <button ng-click="increment()">Clicked {{ count }} times</button>
// </div>`;

const ANGULAR_COUNTER = `// Angular 2+ (today: v22): a standalone component with a signal
@Component({
  selector: 'app-counter',
  template: \`
    <button (click)="increment()">Clicked {{ count() }} times</button>
  \`,
})
export class Counter {
  protected readonly count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}`;

/** The same counter in AngularJS and in Angular, plus the Angular one running live. */
@Component({
  imports: [CodeBlock],
  selector: 'app-angular-vs-angularjs-demo',
  styleUrl: './angular-vs-angularjs-demo.scss',
  templateUrl: './angular-vs-angularjs-demo.html',
})
export default class AngularVsAngularjsDemo {
  protected readonly era = signal<Era>('angular');
  protected readonly code: Record<Era, string> = {
    angularjs: ANGULARJS_COUNTER,
    angular: ANGULAR_COUNTER,
  };

  // LIVE COUNTER (the Angular version, running for real)
  protected readonly count = signal(0);

  protected increment(): void {
    this.count.update((value) => value + 1);
  }
}
