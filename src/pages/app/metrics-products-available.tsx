import { useQuery } from '@tanstack/react-query'
import { Store04Icon } from 'hugeicons-react'

import { getMetricsProductsAvailable } from '@/api/get-metrics-products-amounts'
import { Card, CardContent } from '@/components/ui/card'

export function MetricsProductsAvailable() {
  const { data: productsAvailable } = useQuery({
    queryFn: getMetricsProductsAvailable,
    queryKey: ['metrics', 'products-available'],
  })

  return (
    <Card>
      <CardContent className="h-27 p-3">
        <div className="flex flex-row items-center">
          <label className="bg-shape flex aspect-square w-[5rem] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-blue-100">
            <Store04Icon className="size-8 text-blue-500" />
          </label>
          <div className="pl-4">
            {productsAvailable && (
              <span className="text-2xl font-bold tracking-tight">
                {productsAvailable.amount}
              </span>
            )}
            <p className="text-sm text-muted-foreground">
              Produtos
              <br />
              anunciados
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
