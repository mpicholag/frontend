export interface Document {
  id?: number
  title: string
  description: string
  category: number
  firmDate: string
  renovationDate: string
  expirationDate: string
}

export interface DocumentCategory {
  id: number
  label: string
}