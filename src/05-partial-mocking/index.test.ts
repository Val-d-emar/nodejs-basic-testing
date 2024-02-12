// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  //Mock the default export and named export
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => 'foo'),
    mockTwo: jest.fn(() => 'bar'),
    mockThree: jest.fn(() => 'baz'),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });
  console.log = jest.fn((args) => args);
  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // Write your test here
    mockOne();
    expect(console.log).not.toHaveBeenCalled();

    mockTwo();
    expect(console.log).not.toHaveBeenCalled();

    mockThree();
    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    unmockedFunction();
    expect(console.log).toHaveBeenCalled();
  });
});
