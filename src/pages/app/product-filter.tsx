import { ArrowDown01Icon, SaleTag02Icon, Search01Icon } from 'hugeicons-react'
import { useState } from 'react'

import { GetSellerProductsQuery } from '@/api/get-seller-products'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

export function ProductFilter(props) {
  const [filterSearch, setFilterSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterStatusQuery, setFilterStatusQuery] = useState('')

  function handleApplyFilter() {
    const filterQuery: GetSellerProductsQuery | undefined = {
      status: undefined,
      search: undefined,
    }

    if (filterSearch) {
      filterQuery.search = filterSearch
    }

    if (
      filterStatusQuery &&
      (filterStatusQuery === 'available' ||
        filterStatusQuery === 'sold' ||
        filterStatusQuery === 'cancelled')
    ) {
      filterQuery.status = filterStatusQuery
    }

    props.setFilter(filterQuery)
  }

  const [statusAvailable, setStatusAvailable] = useState(true)
  const [statusSold, setStatusSold] = useState(false)
  const [statusCancelled, setStatusCancelled] = useState(false)

  function handleAvailableCheck() {
    if (!statusAvailable) {
      setStatusAvailable(true)
      setFilterStatus('Anunciado')
      setFilterStatusQuery('available')
    } else {
      setStatusAvailable(false)
      setFilterStatus('')
      setFilterStatusQuery('')
    }
    setStatusSold(false)
    setStatusCancelled(false)
  }

  function handleSoldCheck() {
    if (!statusSold) {
      setStatusSold(true)
      setFilterStatus('Vendido')
      setFilterStatusQuery('sold')
    } else {
      setStatusSold(false)
      setFilterStatus('')
      setFilterStatusQuery('')
    }
    setStatusAvailable(false)
    setStatusCancelled(false)
  }

  function handleCancelledCheck() {
    if (!statusCancelled) {
      setStatusCancelled(true)
      setFilterStatus('Desativado')
      setFilterStatusQuery('cancelled')
    } else {
      setStatusCancelled(false)
      setFilterStatus('')
      setFilterStatusQuery('')
    }
    setStatusAvailable(false)
    setStatusSold(false)
  }

  function handleSearchChange(e) {
    const value = e.target.value
    setFilterSearch(value)
  }

  return (
    <Card className="rounded-2xl">
      <CardContent className="h-27 p-4">
        <div className="flex flex-col">
          <span className="pb-4 font-bold text-muted-foreground">Filtrar</span>

          <div className="relative mb-6 w-full">
            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
              <Search01Icon size={18} className="text-muted-foreground" />
            </div>
            <Input
              id="search"
              type="text"
              placeholder="Pesquisar"
              className="pl-8"
              value={filterSearch}
              onChange={handleSearchChange}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative mb-10 w-full">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
                  <SaleTag02Icon size={18} className="text-muted-foreground" />
                </div>
                <Input
                  id="status"
                  type="text"
                  placeholder="Status"
                  className="pl-8"
                  value={filterStatus}
                />
                <div className="absolute right-1.5 top-1/3 transform">
                  <ArrowDown01Icon
                    size={18}
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96">
              <DropdownMenuCheckboxItem
                checked={statusAvailable}
                onCheckedChange={handleAvailableCheck}
              >
                Anunciado
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusSold}
                onCheckedChange={handleSoldCheck}
              >
                Vendido
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusCancelled}
                onCheckedChange={handleCancelledCheck}
              >
                Desativado
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="w-full rounded-lg border-primary p-6"
            onClick={handleApplyFilter}
          >
            Aplicar filtro
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
