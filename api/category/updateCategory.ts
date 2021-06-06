import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';
import { Category } from '@/api/types';

export async function updateCategory (category: Category, id: string): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .put(`/category/${id}`, category);

  return data as Dictionary;
}
