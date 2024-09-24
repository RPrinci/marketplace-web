import { api } from '@/lib/axios'

export interface GetProductQuery {
  id?: string
}

export interface GetProductById {
  product: {
    id: string
    title: string
    description: string
    priceInCents: number
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
  }
}

export async function getProductById({ id }: GetProductQuery) {
  const response = await api.get<GetProductById>(`/products/${id}`)

  return response.data
}
