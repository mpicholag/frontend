import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';
import { DocumentTypes } from '@/api/types';

export async function updateDocument (document: DocumentTypes, id: string): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .put(`/document/${id}`, document);

  return data as Dictionary;
}
