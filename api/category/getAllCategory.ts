import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { Category } from '@/api/types'

export async function getAllCategory(registry?: string): Promise<Array<Category>> {
  let params: string = '?'
  params += registry ? `registry=${registry}` : ''
  const { data }: AxiosResponse = await ApiClient.getInstance().get(`/category${params}`)

  const { categories } = data

  return categories
}
