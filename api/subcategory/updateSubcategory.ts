import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';
import { SubcategoryTypes } from '@/api/types';

export async function updateSubcategory (category: SubcategoryTypes, id: string): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .put(`/subcategory/${id}`, category);

  return data as Dictionary;
}
