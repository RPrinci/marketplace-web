import { api } from '@/lib/axios'

export interface GetMetricsViewsPerDay {
  viewsPerDay: [
    {
      date: string
      amount: number
    },
  ]
}

export async function getMetricsViewsPerDay() {
  const response = await api.get<GetMetricsViewsPerDay>(
    '/sellers/metrics/views/days',
  )

  return response.data
}
