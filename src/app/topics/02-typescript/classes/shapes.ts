// ABSTRACT CLASS: a base we can't create directly; subclasses must fill in the abstract parts
export abstract class Shape {
  abstract readonly name: string;
  abstract area(): number;

  // A normal method every shape inherits
  describe(): string {
    return `${this.name}: ${this.area().toFixed(2)}`;
  }
}

// PARAMETER PROPERTY: `private readonly radius` declares and assigns in one line
export class Circle extends Shape {
  override readonly name = 'Circle';

  constructor(private readonly radius: number) {
    super();
  }

  override area(): number {
    return Math.PI * this.radius ** 2;
  }
}

export class Square extends Shape {
  override readonly name = 'Square';

  constructor(private readonly side: number) {
    super();
  }

  override area(): number {
    return this.side ** 2;
  }
}

// JAVASCRIPT PRIVATE FIELD: #radius is hidden at runtime too, not only while coding
export class HiddenCircle {
  readonly #radius: number;

  constructor(radius: number) {
    this.#radius = radius;
  }

  area(): number {
    return Math.PI * this.#radius ** 2;
  }
}
