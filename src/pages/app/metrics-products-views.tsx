import { useQuery } from '@tanstack/react-query'
import { UserMultipleIcon } from 'hugeicons-react'

import { getMetricsProductsViews } from '@/api/get-metrics-products-amounts'
import { Card, CardContent } from '@/components/ui/card'

export function MetricsProductsViews() {
  const { data: productsViews } = useQuery({
    queryFn: getMetricsProductsViews,
    queryKey: ['metrics', 'products-views'],
  })

  return (
    <Card>
      <CardContent className="h-27 p-3">
        <div className="flex flex-row items-center">
          <label className="bg-shape flex aspect-square w-[5rem] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-blue-100">
            <UserMultipleIcon className="size-8 text-blue-500" />
          </label>
          <div className="pl-4">
            {productsViews && (
              <span className="text-2xl font-bold tracking-tight">
                {productsViews.amount}
              </span>
            )}
            <p className="text-sm text-muted-foreground">
              Pessoas
              <br />
              visitantes
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
