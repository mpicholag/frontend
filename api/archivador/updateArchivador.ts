import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'
import { ArchivadorTypes } from '@/api/types'

export async function updateArchivador(
  archivador: ArchivadorTypes,
  id: string
): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient.getInstance().put(
    `/archivador/${id}`,
    archivador
  )

  return data as Dictionary
}
