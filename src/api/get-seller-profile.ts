import { api } from '@/lib/axios'

export interface GetSellerProfile {
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    }
  }
}

export async function getSellerProfile() {
  const response = await api.get<GetSellerProfile>('/sellers/me')

  return response.data
}
