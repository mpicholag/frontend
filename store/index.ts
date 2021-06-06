import { Store } from 'vuex';

import { initializeModules } from '@/utils/storeAccessor';

const initializer = (store: Store<any>): void =>
  initializeModules(store);

export const plugins = [initializer];;

export * from '@/utils/storeAccessor';
