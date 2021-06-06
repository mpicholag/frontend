import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'
import { SubcategoryTypes } from '@/api/types'

export async function createSubcategory(subcategory: SubcategoryTypes): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient.getInstance().post(
    `/subcategory`,
    subcategory
  )

  return data as Dictionary
}
