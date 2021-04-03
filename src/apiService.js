import axios from 'axios';
import qs from 'qs';
import cookies from 'js-cookie';

import { API_URL } from './constants';

let apiKey = cookies.get('apiKey');
let sessionId = cookies.get('sessionId');
let username = cookies.get('username');

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

apiClient.interceptors.request.use(function (config) {
  if (sessionId !== null) {
    config.headers.Authorization = `Bearer ${sessionId}`;
  }

  return config;
});

export const apiService = {
  auth: {
    async login(UserName, Password) {
      const data = {
        UserName,
        Password,
      };

      return await apiClient
        .post('?action=login', qs.stringify(data))
        .then((response) => {
          sessionId = response.data[0].Session_ID;
          cookies.set('sessionId', sessionId, {
            secure: true,
            sameSite: 'strict',
            domain: 'localhost',
          });

          apiKey = response.data[0].API_KEY;
          cookies.set('apiKey', apiKey, {
            secure: true,
            sameSite: 'strict',
            domain: 'localhost',
          });

          cookies.set('username', UserName, {
            secure: true,
            sameSite: 'strict',
            domain: 'localhost',
          });

          username = UserName;
          return response;
        })
        .catch((err) => alert(err));
    },
    async logout() {
      await apiClient.post('?action=logout');

      sessionId = null;
      apiKey = null;
      cookies.remove('apiKey');
      cookies.remove('sessionId');
      cookies.remove('username');
    },
    async register(data) {
      return await apiClient.post('?action=register', qs.stringify(data));
    },
  },
  sensorResults: {
    async getAllTemp() {
      return await apiClient.get(
        `?action=showAveragedData&StartDate=2021-03-14 00:00:00&EndDate=2021-03-15 23:59:59&UserName=${username}&ApiKey=${apiKey}`
      );
    },
  },
  sensors: {
    async getSensorsDetail() {
      const data = {
        UserName: cookies.get('username'),
        ApiKey: cookies.get('apiKey'),
      };
      return await apiClient.post(
        '?action=showSensorsDetails',
        qs.stringify(data)
      );
    },
    async getSensors() {
      return await apiClient.get(
        `?action=showSensors&UserName=${username}&ApiKey=${apiKey}`
      );
    },
    async getLastSensors() {
      return await apiClient.get(
        `?action=MyLasts&UserName=${username}&ApiKey=${apiKey}&ApiVersion=1.2`
      );
    },
  },
};
