import { api } from '@/lib/axios'

export interface GetCategories {
  categories: [
    {
      id: string
      title: string
    },
  ]
}

export async function getCategories() {
  const response = await api.get<GetCategories>('/categories')

  return response.data
}
