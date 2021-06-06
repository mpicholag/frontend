import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { DocumentArchivadorTypes } from '@/api/types'

export async function getAllDocumentArchivador(): Promise<Array<DocumentArchivadorTypes>> {
  const { data }: AxiosResponse = await ApiClient.getInstance().get(`/document-archivador`)

  const { archivadores } = data

  return archivadores
}
