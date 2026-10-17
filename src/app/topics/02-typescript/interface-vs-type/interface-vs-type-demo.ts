import { Component, signal } from '@angular/core';
import { CodeBlock } from '@shared/ui/code-block/code-block';

type Answer = 'interface' | 'type' | 'both';

interface Need {
  label: string;
  answer: Answer;
  why: string;
  code: string;
}

// WHAT WE WANT TO DESCRIBE → WHICH KEYWORD FITS
const NEEDS: Need[] = [
  {
    label: 'An API model (object shape)',
    answer: 'both',
    why: 'For object shapes both work the same. Most teams pick interface for models, the key is to stay consistent.',
    code: `interface User {
  id: number;
  name: string;
}

type UserType = {
  id: number;
  name: string;
};`,
  },
  {
    label: 'Only a few fixed values',
    answer: 'type',
    why: 'A union of values is not an object, so only type can describe it.',
    code: `type Status = 'active' | 'inactive';
type ID = string | number;`,
  },
  {
    label: 'A tuple or a primitive alias',
    answer: 'type',
    why: 'Interfaces describe objects only. Tuples and primitives need type.',
    code: `type LatLng = [lat: number, lng: number];
type Price = number;`,
  },
  {
    label: 'Build on top of another shape',
    answer: 'both',
    why: 'Both can do it with different syntax: interface uses extends, type uses & (intersection).',
    code: `interface Admin extends User {
  role: string;
}

type AdminType = UserType & { role: string };`,
  },
  {
    label: 'Add fields to an existing declaration',
    answer: 'interface',
    why: 'Only interfaces support declaration merging: two declarations with the same name combine.',
    code: `interface Box { width: number; }
interface Box { height: number; }

// Box now has width + height`,
  },
  {
    label: 'A contract a class implements',
    answer: 'both',
    why: 'A class can implement an interface or an object type (not a union).',
    code: `interface Shape {
  area(): number;
}

class Square implements Shape {
  constructor(private readonly side: number) {}
  area() {
    return this.side ** 2;
  }
}`,
  },
];

/** A quick decision helper: what are we describing, and which keyword fits? */
@Component({
  imports: [CodeBlock],
  selector: 'app-interface-vs-type-demo',
  styleUrl: './interface-vs-type-demo.scss',
  templateUrl: './interface-vs-type-demo.html',
})
export default class InterfaceVsTypeDemo {
  protected readonly needs = NEEDS;
  protected readonly selected = signal(NEEDS[0]);
}
