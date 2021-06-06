import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { Category } from '@/api/types'

export async function getAllSubcategory(category?: string): Promise<Array<Category>> {
  let params:string = '?'
  params += category ? `provider=${category}` : ''
  const { data }: AxiosResponse = await ApiClient.getInstance().get(`/subcategory${params}`)

  const { subcategories } = data

  return subcategories
}
