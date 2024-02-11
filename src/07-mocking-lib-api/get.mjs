import axios from 'axios';
// import { throttle } from 'lodash';
import pkg from 'lodash';
const { throttle } = pkg;

export const THROTTLE_TIME = 5000;

const getDataFromApi = async (relativePath) => {
  const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });
  console.log(axiosClient);
  const response = await axiosClient.get(relativePath);
  return response.data;
};

// export const throttledGetDataFromApi = throttle(getDataFromApi, THROTTLE_TIME);
const throttledGetDataFromApi = throttle(getDataFromApi, THROTTLE_TIME);

// console.log(throttledGetDataFromApi);
await getDataFromApi('users');
