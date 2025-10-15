import { add } from './stringCalculator';

describe('String Calculator', () => {
  test('returns 0 for empty string', () => {
    expect(add('')).toBe(0);
  });

  test('returns 0 for whitespace only', () => {
    expect(add('   ')).toBe(0);
  });

  test('returns number for single number', () => {
    expect(add('1')).toBe(1);
  });

  test('returns sum for two comma-separated numbers', () => {
    expect(add('1,2')).toBe(3);
  });

  test('handles multiple numbers', () => {
    expect(add('1,2,3,4,5')).toBe(15);
  });

  test('handles newlines as delimiters', () => {
    expect(add('1\n2,3')).toBe(6);
  });

  test('supports custom delimiters', () => {
    expect(add('//;\n1;2')).toBe(3);
  });

  test('supports custom delimiter with special regex chars', () => {
    expect(add('//.\n1.2.3')).toBe(6);
    expect(add('//|\n1|2|3')).toBe(6);
  });

  test('throws error for negative numbers', () => {
    expect(() => add('1,-2,3')).toThrow('Negative numbers not allowed: -2');
  });

  test('throws error listing all negatives', () => {
    expect(() => add('1,-2,-3')).toThrow('Negative numbers not allowed: -2, -3');
  });

  test('ignores numbers greater than 1000', () => {
    expect(add('2,1001')).toBe(2);
    expect(add('1000,1001,2')).toBe(1002);
  });

  test('handles invalid custom delimiter format', () => {
    expect(() => add('//')).toThrow('Invalid format for custom delimiter');
  });

  test('handles non-numeric values gracefully', () => {
    expect(add('1,a,2')).toBe(3);
  });

  test('handles empty parts in number string', () => {
    expect(add('1,,2')).toBe(3);
    expect(add('1,\n,2')).toBe(3);
  });
});