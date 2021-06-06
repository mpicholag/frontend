import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { ArchivadorTypes } from '@/api/types'

export async function getArchivador(
  id: string
): Promise<NullablePrimitive<ArchivadorTypes>> {
  const { data }: AxiosResponse = await ApiClient.getInstance().get(
    `/archivador/${id}`
  )
  const { archivador } = data

  return archivador as ArchivadorTypes
}
