import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { DocumentTypes } from '@/api/types'

export async function getDocument(
  id: string
): Promise<DocumentTypes> {
  const { data }: AxiosResponse = await ApiClient.getInstance().get(
    `/document/${id}`
  )
  const { document } = data

  return document as DocumentTypes
}
