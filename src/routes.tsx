import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { EditProduct } from './pages/app/edit-product'
import { NewProduct } from './pages/app/new-product'
import { Products } from './pages/app/products'
import { SignIn } from './pages/auth/sign-in'
import { SignOut } from './pages/auth/sign-out'
import { SignUp } from './pages/auth/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/products', element: <Products /> },
      { path: '/new-product', element: <NewProduct /> },
      { path: '/product/*', element: <EditProduct /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
      { path: '/sign-out', element: <SignOut /> },
    ],
  },
])
