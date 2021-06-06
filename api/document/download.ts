import { AxiosResponse } from 'axios';

import ApiClient from '@/api/client';
import { DonwloadTypes } from '@/api/types';

export async function downloadDocument (file: DonwloadTypes): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient
    .getInstance()
    .post(`/download`, file);

  return data as Dictionary;
}
