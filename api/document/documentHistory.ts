import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { DocumentHistoryTypes } from '@/api/types'

export async function getAllDocumentHistory(document: string): Promise<Array<DocumentHistoryTypes>> {
  let params = '?'
  params += document ? `document=${document}` : '';
  const { data }: AxiosResponse = await ApiClient.getInstance().get(`/document-history${params}`)

  const { document_histories } = data

  return document_histories as Array<DocumentHistoryTypes>
}
