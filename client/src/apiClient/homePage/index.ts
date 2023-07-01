import aspida from '@aspida/axios';
import axios, { type AxiosRequestConfig } from 'axios';
import { type ApiInstance, default as api } from '../../api/homePage/$api';

// eslint-disable-next-line
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
        config
      )
    )
  ) as ApiInstance;
};
