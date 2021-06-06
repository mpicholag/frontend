import { RegistryTypes } from '@/api/types'
export interface DocumentTypes {
  id?: number
  user_id?: string | null
  category_id?: string | null
  registry_id?: string | null
  subcategory_id?: string | null
  title: string
  description: string
  firm_date: string
  renovation_date: string
  expiration_date: string
  path_document?: string
  file: string
  extension: string,
  notify: boolean
}

export interface DonwloadTypes {
  name: string
}

export interface DocumentHistoryTypes {
  id?: number
  document_id?: string
  addres: string
  status: boolean
  description: string
}

export interface DocumentArchivadorTypes {
  id: number
  name: string
  registries: Array<RegistryTypes>
}

export interface DocumentParams {
  notify?: boolean
  userId?: string | number
  registry?: string | number
}