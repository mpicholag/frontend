import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { DocumentTypes, DocumentParams } from '@/api/types'

export async function getAllDocument(params: DocumentParams): Promise<Array<DocumentTypes>> {
  let query = '?';
  query += params.notify ? 'notify=true' : 'notify='
  query += params.registry ? `&registry=${params.registry}` : 'registry='
  const { data }: AxiosResponse = await ApiClient.getInstance().get(`/document${query}`)

  const { documents } = data

  return documents
}
