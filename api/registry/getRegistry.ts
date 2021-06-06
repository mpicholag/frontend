import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';

import { RegistryTypes } from '@/api/types';

export async function getRegistry (id: string): Promise<NullablePrimitive<RegistryTypes>> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .get(`/registry/${id}`);
  const { registry } = data;

  return registry as RegistryTypes
  ;
}
