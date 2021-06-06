import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';
import { RegistryTypes } from '@/api/types';

export async function updateRegistry (registry: RegistryTypes, id: string): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .put(`/registry/${id}`, registry);

  return data as Dictionary;
}
