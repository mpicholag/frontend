export * from '@/api/product/types'
export * from '@/api/category/types'
export * from '@/api/subcategory/types'
export * from '@/api/registry/types'
export * from '@/api/document/types'
export * from '@/api/user/types'
export * from '@/api/archivador/types'
export * from '@/api/catalogo/types'

export interface LoginParams {
  email: string
  password: string
}

export interface ErrorApiResponse {
  code?: number
  message?: string
}
