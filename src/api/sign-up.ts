import { api } from '@/lib/axios'

export interface SignUpBody {
  name: string
  phone: string
  email: string
  avatarImage: FileList
  password: string
  passwordConfirmation: string
}

export async function signUp({
  name,
  phone,
  email,
  avatarImage,
  password,
  passwordConfirmation,
}: SignUpBody) {
  if (avatarImage?.length && avatarImage.length > 0) {
    const files = new FormData()

    files.append('files', avatarImage[0])

    const avatar = await api.post('/attachments', files)

    const avatarId = avatar.data.attachments[0].id

    const response = await api.post('/sellers', {
      name,
      phone,
      email,
      avatarId,
      password,
      passwordConfirmation,
    })

    return response.data
  }
}
