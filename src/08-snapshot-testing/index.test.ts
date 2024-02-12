// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const tree = generateLinkedList(['http://ya.ru']);
    expect(tree).toMatchSnapshot();
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const tree = generateLinkedList([
      'http://ya.ru',
      'https://jsonplaceholder.typicode.com',
    ]);
    expect(tree).toMatchSnapshot();
  });
});
