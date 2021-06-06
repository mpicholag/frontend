import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { UserType } from '@/api/types'

export async function getMe(): Promise<NullablePrimitive<UserType>> {
  const { data }: AxiosResponse = await ApiClient.getInstance().get('/me')
  const { user } = data

  return user as UserType
}
