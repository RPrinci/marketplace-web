import { Helmet } from 'react-helmet-async'

import { MetricsProductsAmount } from './metrics-products-amounts'
import { MetricsProductsAvailable } from './metrics-products-available'
import { MetricsProductsViews } from './metrics-products-views'
import { VisitorsChart } from './visitors-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="min-h-screen bg-muted antialiased">
        <div className="">
          <h1 className="text-2xl">Últimos 30 dias</h1>
          <p className="text-sm text-muted-foreground">
            Confira as estatísticas da sua loja no último mês
          </p>
        </div>
        <div className="mt-10 grid grid-cols-5 gap-4">
          <div>
            <MetricsProductsAmount />
          </div>
          <div className="col-span-4 row-span-3">
            <VisitorsChart />
          </div>
          <div>
            <MetricsProductsAvailable />
          </div>
          <div>
            <MetricsProductsViews />
          </div>
        </div>
      </div>
    </>
  )
}
