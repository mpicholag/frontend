import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';
import { DocumentTypes} from '@/api/types';

export async function createDocument (document: DocumentTypes): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .post(`/document`, document);

  return data as Dictionary;
}
