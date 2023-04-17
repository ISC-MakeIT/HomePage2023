import aspida from '@aspida/axios';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiInstance, default as api } from '../../api/homePage/$api';

export const homePageClient = (config?: AxiosRequestConfig<any> | undefined) => {
  return api(
    aspida(
      axios.create(),
      Object.assign(
        {
          baseURL: process.env.NEXT_PUBLIC_API_URL,
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
