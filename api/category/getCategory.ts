import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';

import { Category } from '@/api/types';

export async function getCategory (id: string): Promise<NullablePrimitive<Category>> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .get(`/category/${id}`);
  const { category } = data;

  return category as Category;
}
