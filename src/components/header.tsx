import { useQuery } from '@tanstack/react-query'
import {
  ChartHistogramIcon,
  Logout01Icon,
  PackageIcon,
  PlusSignIcon,
} from 'hugeicons-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getSellerProfile } from '@/api/get-seller-profile'

import logo from '../assets/logomarca.svg'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function Header() {
  const navigate = useNavigate()

  const [avatarUrl, setAvatarUrl] = useState('')

  const { data: sellerProfile } = useQuery({
    queryFn: getSellerProfile,
    queryKey: ['seler', 'profile'],
  })

  useEffect(() => {
    if (
      sellerProfile &&
      sellerProfile.seller &&
      sellerProfile.seller.avatar &&
      sellerProfile.seller.avatar.url
    ) {
      setAvatarUrl(sellerProfile.seller.avatar.url)
    } else {
      setAvatarUrl('')
    }
  }, [sellerProfile])

  const activeButton =
    'border-primary bg-red-100 text-primary hover:bg-red-100 hover:text-primary'

  const inactiveButton =
    'border-primary text-zinc-500 hover:bg-muted hover:text-primary'

  const [dashboardButtonClass, setDashboardButtonClass] = useState(activeButton)
  const [productsdButtonClass, setProductsButtonClass] = useState(activeButton)

  useEffect(() => {
    const currentPath = window.location.pathname

    if (currentPath === '/products') {
      setDashboardButtonClass(inactiveButton)
      setProductsButtonClass(activeButton)
    } else if (currentPath === '/new-product') {
      setDashboardButtonClass(inactiveButton)
      setProductsButtonClass(inactiveButton)
    } else if (currentPath === '/product') {
      setDashboardButtonClass(inactiveButton)
      setProductsButtonClass(inactiveButton)
    } else {
      setDashboardButtonClass(activeButton)
      setProductsButtonClass(inactiveButton)
    }
  }, [window.location.pathname])

  async function handleGoToDashboard() {
    navigate('/')
  }

  async function handleGoToProducts() {
    navigate('/products')
  }

  async function handleNewProduct() {
    navigate('/new-product', { replace: true })
  }

  async function handleSignOut() {
    navigate('/sign-out', { replace: true })
  }

  return (
    <div className="flex h-20 flex-row items-center border-b bg-muted">
      <div className="basis-1/4 gap-6 px-4">
        <img
          src={logo}
          alt="logo"
          className="cursor-pointer"
          onClick={handleGoToDashboard}
        />
      </div>
      <div className="mr-24 flex basis-2/4 justify-center gap-6 space-x-4 px-4">
        <Button
          className={dashboardButtonClass}
          variant="ghost"
          onClick={handleGoToDashboard}
        >
          <ChartHistogramIcon className="mr-1 h-4 w-4" />
          Dashboard
        </Button>
        <Button
          className={productsdButtonClass}
          variant="ghost"
          onClick={handleGoToProducts}
        >
          <PackageIcon className="mr-1 h-4 w-4" />
          Produtos
        </Button>
      </div>
      <div className="flex basis-1/4 items-center justify-end space-x-4 px-4">
        <Button onClick={handleNewProduct}>
          <PlusSignIcon className="mr-1 h-4 w-4" />
          Novo produto
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {avatarUrl && <AvatarImage src={avatarUrl} />}
              <AvatarFallback>
                {sellerProfile?.seller?.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex h-12 flex-row items-center p-1">
                <Avatar>
                  {avatarUrl && <AvatarImage src={avatarUrl} />}
                  <AvatarFallback>
                    {sellerProfile?.seller?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-4 text-wrap text-xs">
                  {sellerProfile?.seller?.name}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                className="w-full border-primary text-primary"
                variant="ghost"
                onClick={handleSignOut}
              >
                Sair
                <Logout01Icon className="ml-auto mr-1 h-4 w-4 text-primary" />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
