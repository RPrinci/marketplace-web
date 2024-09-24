import { api } from '@/lib/axios'

export interface GetSellerProductsQuery {
  status?: 'available' | 'sold' | 'cancelled'
  search?: string
}

export interface GetSellerProducts {
  products: [
    {
      id: string
      title: string
      description: string
      priceInCents: number
      status: string
      owner: {
        id: string
        name: string
        phone: string
        email: string
        avatar: {
          id: string
          url: string
        }
      }
      category: {
        id: string
        title: string
        slug: string
      }
      attachments: [
        {
          id: string
          url: string
        },
      ]
    },
  ]
}

export async function getSellerProducts({
  status,
  search,
}: GetSellerProductsQuery) {
  const response = await api.get<GetSellerProducts>('/products/me', {
    params: {
      status,
      search,
    },
  })

  return response.data
}
