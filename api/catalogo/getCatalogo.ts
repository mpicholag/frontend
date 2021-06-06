import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';

import { CatalogoTypes } from '@/api/types';

export async function getCatalogo (id: string): Promise<NullablePrimitive<CatalogoTypes>> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .get(`/catalogo/${id}`);
  const { catalogo } = data;

  return catalogo as CatalogoTypes;
}
