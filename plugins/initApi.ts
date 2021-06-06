import { Context } from '@nuxt/types';
import ApiClient from '@/api/client';

export default function ({ $axios }: Context): void {
  if (!$axios) {
    throw new Error('Nuxt Axios plugin must be configured');
  }
  ApiClient.setInstance($axios);
}
