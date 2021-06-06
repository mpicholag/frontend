import { AxiosError } from 'axios';
import { Context } from '@nuxt/types';
import { Store } from 'vuex';

import onResponseErrorHandler from '@/utils/axios/interceptors/onResponseError';

export default function (
  { error, redirect, store }:
  { error: AxiosError, redirect: Context['redirect'], store: Store<any>}
) : void {
  if (error.response) {
    onResponseErrorHandler({ error, redirect, store});
  }
}
