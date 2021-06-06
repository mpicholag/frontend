import { Context } from '@nuxt/types';

export default function ({ $axios }: Context): void {
  $axios.onResponse(() => {
    console.log('cargando');
  });
  $axios.onResponseError(() => {
    console.log('fin')
  });
}
