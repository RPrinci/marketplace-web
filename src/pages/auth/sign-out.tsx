import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '@/lib/axios'

export function SignOut() {
  const navigate = useNavigate()

  useEffect(() => {
    api.post('/sign-out')

    Cookies.set('token', '')

    navigate('/sign-in', { replace: true })
  }, [navigate])

  return <></>
}
