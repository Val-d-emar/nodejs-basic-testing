// Uncomment the code below and write your tests
// import axios, { AxiosInstance } from 'axios';
import axios from 'axios';
// import ladash from 'lodash';

import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');

  //Mock the default export and named export
  return {
    __esModule: true,
    ...originalModule,
    throttle: (fn: () => unknown) => fn,
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    // Write your test here
    const base_url = 'https://jsonplaceholder.typicode.com';
    const ax = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/users');
    expect(ax).toHaveBeenCalledWith({
      baseURL: base_url,
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const relativePath = '/users';
    const ax = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    const get = jest.spyOn(ax.mock.results[0]?.value, 'get');
    await throttledGetDataFromApi(relativePath);
    expect(get).toBeCalled();
    expect(get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    // Write your test here
    const relativePath = '/users';
    const data = await throttledGetDataFromApi(relativePath);
    expect(data).not.toBeUndefined();
  });
});
