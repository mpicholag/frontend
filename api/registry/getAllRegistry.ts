import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'

import { RegistryTypes } from '@/api/types'

export async function getAllRegistry(): Promise<Array<RegistryTypes>> {
  const { data }: AxiosResponse = await ApiClient.getInstance().get('/registry')

  const { registries } = data

  return registries
}
