// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    // Write your test here
    const str: unknown = 'Hello';
    const res = await resolveValue(str);
    expect(res).toBe(str);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    const str = 'Message23457';
    expect(() => throwError(str)).toThrow(str);
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    await expect(() => rejectCustomError()).rejects.toThrow(
      new MyAwesomeError(),
    );
  });
});
