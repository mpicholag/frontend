import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'
import { DocumentHistoryTypes } from '@/api/types'

export async function createDocumentHistory(
  document: DocumentHistoryTypes
): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient.getInstance().post(
    `/document-history`,
    document
  )

  return data as Dictionary
}
