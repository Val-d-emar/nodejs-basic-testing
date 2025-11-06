// Uncomment the code below and write your tests
import axios, { Axios } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  //Mock the default export and named export
  __esModule: true,
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

const relativePath = 'users';

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    const base_url = 'https://jsonplaceholder.typicode.com';
    const ax = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(ax).toHaveBeenCalledWith({
      baseURL: base_url,
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const spy = jest
      .spyOn(Axios.prototype, 'get')
      .mockResolvedValue({ data: 'any data' });

    await throttledGetDataFromApi(relativePath);
    expect(spy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    // Write your test here
    const resp = { data: 'response data' };
    jest.spyOn(Axios.prototype, 'get').mockResolvedValue(resp);
    const res = await throttledGetDataFromApi(relativePath);
    expect(res).toBe(resp.data);
  });
});
