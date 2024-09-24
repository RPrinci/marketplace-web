import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInBody) {
  const response = await api.post('/sellers/sessions', { email, password })

  if (response.data) {
    const token = response.data.accessToken

    Cookies.set('token', token, { expires: 7, secure: true })
  }
}
