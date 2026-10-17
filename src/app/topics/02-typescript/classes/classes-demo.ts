import { Component, computed, signal } from '@angular/core';
import { Circle, HiddenCircle, Shape, Square } from './shapes';

/** Abstract classes, parameter properties, and the `private` vs `#private` trap. */
@Component({
  selector: 'app-classes-demo',
  styleUrl: './classes-demo.scss',
  templateUrl: './classes-demo.html',
})
export default class ClassesDemo {
  protected readonly size = signal(3);

  // POLYMORPHISM: different classes, one Shape type, same describe() call
  protected readonly shapes = computed<Shape[]>(() => [
    new Circle(this.size()),
    new Square(this.size()),
  ]);

  // THE TRAP: what each object really looks like at runtime
  protected readonly tsPrivate = computed(() => JSON.stringify(new Circle(this.size())));
  protected readonly jsPrivate = computed(() => JSON.stringify(new HiddenCircle(this.size())));
}
