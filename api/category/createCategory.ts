import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'
import { Category } from '@/api/types'

export async function createCategory(category: Category): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient.getInstance().post(
    `/category`,
    category
  )

  return data as Dictionary
}
