import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';
import { CatalogoTypes } from '@/api/types';

export async function updateCatalogo (catalogo: CatalogoTypes, id: string): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .put(`/catalogo/${id}`, catalogo);

  return data as Dictionary;
}
