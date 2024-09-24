import { api } from '@/lib/axios'

export interface GetMetricsProductsAmount {
  amount: number
}

export async function getMetricsProductsSold() {
  const response = await api.get<GetMetricsProductsAmount>(
    '/sellers/metrics/products/sold',
  )

  return response.data
}

export async function getMetricsProductsAvailable() {
  const response = await api.get<GetMetricsProductsAmount>(
    '/sellers/metrics/products/available',
  )

  return response.data
}

export async function getMetricsProductsViews() {
  const response = await api.get<GetMetricsProductsAmount>(
    '/sellers/metrics/views',
  )

  return response.data
}
