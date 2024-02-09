// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', async () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 1,
        b: 2,
        action: Action.Add,
      }),
    ).toBe(3);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 2,
        b: 1,
        action: Action.Subtract,
      }),
    ).toBe(1);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 2,
        b: 2,
        action: Action.Multiply,
      }),
    ).toBe(4);
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 9,
        b: 3,
        action: Action.Divide,
      }),
    ).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Exponentiate,
      }),
    ).toBe(8);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 1,
        b: 0,
        action: '&&',
      }),
    ).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: '2',
        b: '1',
        action: Action.Divide,
      }),
    ).toBeNull;
  });
});
