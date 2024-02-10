// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from './index';

describe('BankAccount', () => {
  const balance = 23456;
  const amount = 123456;
  test('should create account with initial balance', () => {
    // Write your test here
    expect(getBankAccount(balance)).toMatchObject({ _balance: balance });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => getBankAccount(balance).withdraw(amount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    expect(() =>
      getBankAccount(balance).transfer(amount, getBankAccount(balance)),
    ).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const acc = getBankAccount(balance);
    expect(() => acc.transfer(amount, acc)).toThrow();
  });

  test('should deposit money', () => {
    // Write your test here
    expect(getBankAccount(0).deposit(balance)).toMatchObject({
      _balance: balance,
    });
  });

  test('should withdraw money', () => {
    // Write your test here
    expect(getBankAccount(amount).withdraw(balance)).toMatchObject({
      _balance: amount - balance,
    });
  });

  test('should transfer money', () => {
    // Write your test here
    const acc1 = getBankAccount(amount);
    const acc2 = getBankAccount(0);
    expect(acc1.transfer(balance, acc2)).toMatchObject({
      _balance: amount - balance,
    });
    expect(acc2).toMatchObject({ _balance: balance });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const acc = getBankAccount(amount);
    const res = await acc.fetchBalance();
    if (res !== null) {
      expect(typeof res).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const acc = getBankAccount(balance);
    const newBalance = 123;
    const spy = jest.spyOn(acc, 'fetchBalance');
    spy.mockResolvedValue(newBalance);
    await acc.synchronizeBalance();
    expect(spy).toBeCalled();
    expect(acc.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const acc = getBankAccount(balance);
    const newBalance = null;
    const spy = jest.spyOn(acc, 'fetchBalance');
    spy.mockResolvedValue(newBalance);
    await expect(() => acc.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
