import { Context } from '@nuxt/types';
import { AxiosError } from 'axios';
import { keys } from 'lodash';

import statusErrorHandler
  from '@/utils/axios/helpers/statusErrorHandler';
import displayErrorNotification
  from '@/utils/axios/helpers/displayErrorNotification';
import { Store } from 'vuex';

function onResponseErrorHandler (
  { error, redirect, store}:
  { error: AxiosError, redirect: Context['redirect'], store: Store<any>}
): void {
  const { status } = error.response!;

  const hasStatusHandler = keys(statusErrorHandler)
    .includes(String(status));

  if (hasStatusHandler) {
    statusErrorHandler[status]({ error, redirect, store });
  } else {
    defaultResponseErrorHandler(error);
  }
}

export function defaultResponseErrorHandler (error: AxiosError): void {
  const { data } = error.response!;
  const { message, result } = data;

  if (result) {
    displayErrorNotification(result);
  } else {
    displayErrorNotification({ message });
  }
}

export default onResponseErrorHandler;
