import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import {
  getSellerProducts,
  GetSellerProductsQuery,
} from '@/api/get-seller-products'

import { ProductFilter } from './product-filter'
import { ProductOfList } from './product-of-list'

export function Products() {
  const [filter, setFilter] = useState<GetSellerProductsQuery | undefined>({
    status: undefined,
    search: undefined,
  })

  const { data: products } = useQuery({
    queryFn: () =>
      getSellerProducts({
        status: filter?.status,
        search: filter?.search,
      }),
    queryKey: ['products', 'listing', filter],
  })

  return (
    <>
      <Helmet title="Produtos" />
      <div className="min-h-screen bg-muted antialiased">
        <div className="">
          <h1 className="text-2xl">Seus produtos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie a sua lista de produtos à venda
          </p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4">
          <div>
            <ProductFilter setFilter={setFilter} />
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {products &&
                products.products.map((product) => {
                  return (
                    <div key={product.id}>
                      <ProductOfList product={product} />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
