import Vue from 'vue';
import { Context } from '@nuxt/types';
import { AxiosError } from 'axios';

import axiosErrorHandler from '@/utils/axios/axiosErrorHandler';

export default function ({ redirect, store }: Context): void {
  Vue.config.errorHandler = (error: Error): void => {
    if (isAxiosError(error)) {
      axiosErrorHandler({
        error: error as AxiosError,
        redirect,
        store
      });
    }
  };
};

function isAxiosError (error: Error): boolean {
  return (error as AxiosError).isAxiosError;
}
