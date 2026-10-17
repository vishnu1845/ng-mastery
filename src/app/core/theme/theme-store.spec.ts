import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeStore } from './theme-store';

describe('ThemeStore', () => {
  beforeEach(() => localStorage.clear());

  it('defaults to the dark theme with the Angular accent', () => {
    const theme = TestBed.inject(ThemeStore);

    expect(theme.mode()).toBe('dark');
    expect(theme.accent()).toBe('angular');
    expect(theme.resolved()).toBe('dark');
  });

  it('applies and saves a new theme', () => {
    const theme = TestBed.inject(ThemeStore);
    const root = TestBed.inject(DOCUMENT).documentElement;

    theme.setMode('light');
    theme.setAccent('ocean');
    TestBed.tick();

    expect(root.getAttribute('data-theme')).toBe('light');
    expect(root.getAttribute('data-accent')).toBe('ocean');
    expect(localStorage.getItem('ngm-theme')).toBe('light');
  });

  it('ignores an unknown saved value', () => {
    localStorage.setItem('ngm-theme', 'neon');
    expect(TestBed.inject(ThemeStore).mode()).toBe('dark');
  });
});
