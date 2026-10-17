import { maxSatisfying, satisfies } from './semver';

describe('satisfies', () => {
  it('lets ^ take minor and patch updates, but not a new major', () => {
    expect(satisfies('2.6.0', '^2.4.0')).toBe(true);
    expect(satisfies('2.3.9', '^2.4.0')).toBe(false);
    expect(satisfies('3.0.0', '^2.4.0')).toBe(false);
  });

  it('lets ~ take patch updates only', () => {
    expect(satisfies('2.4.9', '~2.4.0')).toBe(true);
    expect(satisfies('2.5.0', '~2.4.0')).toBe(false);
  });

  it('matches an exact version and nothing else', () => {
    expect(satisfies('2.4.0', '2.4.0')).toBe(true);
    expect(satisfies('2.4.1', '2.4.0')).toBe(false);
  });
});

describe('maxSatisfying', () => {
  const versions = ['2.0.0', '2.4.0', '2.4.5', '2.10.0', '3.0.0'];

  it('picks the highest match, comparing numbers (2.10 > 2.4)', () => {
    expect(maxSatisfying(versions, '^2.4.0')).toBe('2.10.0');
    expect(maxSatisfying(versions, '~2.4.0')).toBe('2.4.5');
  });

  it('returns undefined when nothing matches', () => {
    expect(maxSatisfying(versions, '^4.0.0')).toBeUndefined();
  });
});
