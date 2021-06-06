import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { UserType } from '@/api/types'

export async function getAllUser(provider?: string): Promise<Array<UserType>> {
  const { data }: AxiosResponse = await ApiClient.getInstance().get(`/user`)

  const { users } = data

  return users
}
