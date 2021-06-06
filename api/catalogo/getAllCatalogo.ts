import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { CatalogoTypes } from '@/api/types'

export async function getAllCatalogo(registry?: string): Promise<Array<CatalogoTypes>> {
  const { data }: AxiosResponse = await ApiClient.getInstance().get(`/catalogo`)

  const { catalogos } = data

  return catalogos
}
