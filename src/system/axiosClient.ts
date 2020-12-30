import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

export const axiosClient = axios.create({
  baseURL: isDev ? '' : 'https://api.vk.com/method/',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
