import { AxiosError } from 'axios';
import { Context } from '@nuxt/types';
import { Store } from 'vuex';

import { defaultResponseErrorHandler } from '@/utils/axios/interceptors/onResponseError';

function unauthorizedErrorHandler (
  { error, redirect, store }: { error: AxiosError, redirect: Context['redirect'], store: Store<any>}
): void {
  redirect({ name: 'login' });
  defaultResponseErrorHandler(error);
}

export default unauthorizedErrorHandler;
