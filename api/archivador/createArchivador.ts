import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'
import { ArchivadorTypes } from '@/api/types'

export async function createArchivador(archivador: ArchivadorTypes): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient.getInstance().post(
    `/archivador`,
    archivador
  )

  return data as Dictionary
}
