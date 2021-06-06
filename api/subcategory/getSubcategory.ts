import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';

import { SubcategoryTypes } from '@/api/types';

export async function getSubcategory (id: string): Promise<NullablePrimitive<SubcategoryTypes>> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .get(`/subcategory/${id}`);
  const { subcategory } = data;

  return subcategory as SubcategoryTypes;
}
