import { Component, signal } from '@angular/core';
import { CodeBlock } from '@shared/ui/code-block/code-block';

// NUMERIC ENUM: Pending = 0, Shipped = 1, Delivered = 2
enum OrderStatus {
  Pending,
  Shipped,
  Delivered,
}

// WHAT COMES AFTER EACH STATUS (a Record keyed by the enum)
const NEXT_STATUS: Record<OrderStatus, OrderStatus> = {
  [OrderStatus.Pending]: OrderStatus.Shipped,
  [OrderStatus.Shipped]: OrderStatus.Delivered,
  [OrderStatus.Delivered]: OrderStatus.Delivered,
};

/** An order tracker built on an enum, plus the real JavaScript the enum turns into. */
@Component({
  imports: [CodeBlock],
  selector: 'app-enums-demo',
  styleUrl: './enums-demo.scss',
  templateUrl: './enums-demo.html',
})
export default class EnumsDemo {
  // Expose the enum so the template can use OrderStatus.Delivered etc.
  protected readonly OrderStatus = OrderStatus;
  protected readonly steps = [OrderStatus.Pending, OrderStatus.Shipped, OrderStatus.Delivered];

  protected readonly status = signal(OrderStatus.Pending);

  // An enum is a real object at runtime, so we can print it
  protected readonly enumAtRuntime = JSON.stringify(OrderStatus, null, 2);

  protected next(): void {
    this.status.update((current) => NEXT_STATUS[current]);
  }
}
