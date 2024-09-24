import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface Status {
  color: string
  title: string
}

type ProductList = {
  product: {
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
  }
}

export function ProductOfList(item: ProductList) {
  const navigate = useNavigate()

  const newStatus: Status = { color: '', title: '' }

  const [status, setStatus] = useState(newStatus)

  useEffect(() => {
    if (item && item.product && item.product.status) {
      if (item.product.status === 'available') {
        setStatus({ color: 'bg-blue-500', title: 'Anunciado' })
      } else if (item.product.status === 'sold') {
        setStatus({ color: 'bg-green-500', title: 'Vendido' })
      } else {
        setStatus({ color: 'bg-gray-500', title: 'Desativado' })
      }
    }
  }, [item])

  async function handleEditProduct(id: string) {
    navigate(`/product?id=${id}`)
  }

  return (
    <>
      {item && (
        <Link to={`/product?id=${item.product?.id}`}>
          <Card className="rounded-2xl">
            <CardContent className="h-27 p-1">
              <div className="relative flex flex-col items-start">
                <div className="absolute flex w-full justify-end p-2">
                  <Badge className={status.color}>{status.title}</Badge>
                  <Badge className="ml-2 bg-gray-800">
                    {item.product?.category.title}
                  </Badge>
                </div>
                <img
                  className="h-48 w-full rounded-2xl object-cover"
                  src={item.product?.attachments[0].url}
                  alt={item.product?.title}
                />

                <div className="grid w-full auto-cols-max grid-flow-col grid-cols-2 pb-2 pl-4 pt-4">
                  <div className="">
                    <span className="text-sm font-bold tracking-tight">
                      {item.product?.title}
                    </span>
                  </div>
                  <div className="ml-auto pr-4">
                    <span className="text-sm font-bold tracking-tight">
                      R${' '}
                    </span>
                    <span className="font-bold tracking-tight">
                      {(item.product?.priceInCents / 100).toLocaleString(
                        'pt-BR',
                        {
                          currency: 'BRL',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        },
                      )}
                    </span>
                  </div>
                </div>
                <div className="pl-4">
                  <p className="pb-4 text-sm text-muted-foreground">
                    {item.product?.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}
    </>
  )
}
