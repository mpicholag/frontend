import { AxiosResponse } from 'axios'

import ApiClient from '@/api/client'
import { RegistryTypes } from '@/api/types'

export async function createRegistry(registry: RegistryTypes): Promise<Dictionary> {
  const { data }: AxiosResponse = await ApiClient.getInstance().post(
    `/registry`,
    registry
  )

  return data as Dictionary
}
