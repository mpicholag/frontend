export interface UserType {
  id?: string | number
  first_name: string
  last_name: string
  cui?: string
  user_name?: string
  email: string
  birthdate?: string
  status: boolean
  verified?: boolean
  api_token?: string
  email_verified_at?: string
  password?: string
  password_confirmation?: string
}