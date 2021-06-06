/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import auth from '@/store/auth';
import flatNotification from '@/store/flatNotification';

let authStore: auth;
let flatNotificationStore: flatNotification;

function initializeModules (store: Store<any>): void {
  authStore = getModule(auth, store),
  flatNotificationStore = getModule(flatNotification, store);
}

export {
  initializeModules,
  authStore,
  flatNotificationStore,
};
