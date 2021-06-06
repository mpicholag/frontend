import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'
import { CatalogoTypes } from '@/api/types'

export async function createCatalogo(catalogo: CatalogoTypes): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient.getInstance().post(
    `/catalogo`,
    catalogo
  )

  return data as Dictionary
}
