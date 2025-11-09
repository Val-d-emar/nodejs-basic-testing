// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    jest.spyOn(global, 'setTimeout');
    const cb = () => undefined;
    const timeout = 100;
    doStuffByTimeout(cb, timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn(() => undefined);
    const timeout = 1000;
    doStuffByTimeout(cb, timeout);
    expect(cb).not.toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(cb, timeout);
    jest.runAllTimers();
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    jest.spyOn(global, 'setInterval');
    const cb = () => undefined;
    const timeout = 100;
    doStuffByInterval(cb, timeout);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(cb, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn(() => undefined);
    const timeout = 1000;
    const times = 10;
    doStuffByInterval(cb, timeout);
    jest.advanceTimersByTime(times * timeout);
    expect(cb).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    jest.spyOn(path, 'join');
    expect(path.join).not.toHaveBeenCalled();
    await readFileAsynchronously(' ');
    expect(path.join).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const res = await readFileAsynchronously(' ');
    expect(res).toBeNull;
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const cont = 'Test file content';
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockReturnValueOnce(new Promise((resolve) => resolve(cont)));
    const res = await readFileAsynchronously(' ');
    expect(res).toBe(cont);
  });
});
