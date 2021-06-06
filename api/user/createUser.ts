import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'
import { UserType } from '@/api/types'

export async function createUser(user: UserType): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient.getInstance().post(
    `/user`,
    user
  )

  return data as Dictionary
}
