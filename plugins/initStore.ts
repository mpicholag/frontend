import { Context, Plugin } from '@nuxt/types';

import { initializeModules } from '@/store';

const accessor: Plugin = ({ store }: Context) => {
  initializeModules(store);
}

export default accessor;
