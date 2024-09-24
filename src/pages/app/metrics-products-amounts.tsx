import { useQuery } from '@tanstack/react-query'
import { SaleTag02Icon } from 'hugeicons-react'

import { getMetricsProductsSold } from '@/api/get-metrics-products-amounts'
import { Card, CardContent } from '@/components/ui/card'

export function MetricsProductsAmount() {
  const { data: productsSold } = useQuery({
    queryFn: getMetricsProductsSold,
    queryKey: ['metrics', 'products-amount'],
  })

  return (
    <Card>
      <CardContent className="h-27 p-3">
        <div className="flex flex-row items-center">
          <label className="bg-shape flex aspect-square w-[5rem] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-blue-100">
            <SaleTag02Icon className="size-8 text-blue-500" />
          </label>
          <div className="pl-4">
            {productsSold && (
              <span className="text-2xl font-bold tracking-tight">
                {productsSold.amount}
              </span>
            )}
            <p className="text-sm text-muted-foreground">
              Produtos
              <br />
              vendidos
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
