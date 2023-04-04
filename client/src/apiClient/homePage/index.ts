import aspida from '@aspida/axios';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiInstance, default as api } from '../../api/homePage/$api';

export const homePageClient = (config?: AxiosRequestConfig<any> | undefined) => {
  return api(
    aspida(
      axios.create(),
      Object.assign(
        {
          baseURL: 'http://localhost:8000',
          paramsSerializer: {
            indexes: false,
          },
          withCredentials: true,
        },
        config,
      ),
    ),
  ) as ApiInstance;
};
