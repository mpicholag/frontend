import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { ArchivadorTypes } from '@/api/types'

export async function getAllArchivador(provider?: string): Promise<Array<ArchivadorTypes>> {
  const { data }: AxiosResponse = await ApiClient.getInstance().get(`/archivador`)

  const { archivadors } = data

  return archivadors
}
