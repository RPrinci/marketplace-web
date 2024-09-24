import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  ImageUploadIcon,
  Mail02Icon,
  UserIcon,
} from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signUp } from '@/api/sign-up'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const maxFileSize = 500000
const acceptedImageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const signUpForm = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  avatarImage: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine((files) => files?.[0]?.size <= maxFileSize, `Max file size is 5MB.`)
    .refine(
      (files) => acceptedImageTypes.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  password: z.string(),
  passwordConfirmation: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>()

  const { mutateAsync: registerNewSeller } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerNewSeller({
        name: data.name,
        phone: data.phone,
        email: data.email,
        avatarImage: data.avatarImage,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      })

      navigate(`/sign-in?email=${data.email}`, { replace: true })
    } catch (e) {
      toast.error(`Erro ao cadastrar: ${(e as Error).message}`)
    }
  }

  async function handleSignIn() {
    navigate('/sign-in', { replace: true })
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="mb-10 mt-10 overscroll-none p-8">
        <div className="flex w-[350px] flex-col justify-center gap-10">
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Crie sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Informe seus dados pessoais e de acesso
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div className="space-y-2">
              <h2 className="text-md font-semibold tracking-tighter">Perfil</h2>
            </div>

            <div className="space-y-4">
              <label className="bg-shape flex aspect-square w-[7.5rem] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-muted text-primary">
                <ImageUploadIcon className="text-orange-base size-8" />
                <input
                  className="hidden"
                  id="avatarImage"
                  type="file"
                  {...register('avatarImage')}
                />
                {errors.avatarImage?.message && (
                  <span>{errors.avatarImage.message}</span>
                )}
              </label>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <Label htmlFor="name">NOME</Label>
              <div className="relative w-full">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
                  <UserIcon size={18} className="text-muted-foreground" />
                </div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className="pl-8"
                  {...register('name')}
                />
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Label htmlFor="phoneNumber">TELEFONE</Label>
              <div className="relative w-full">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
                  <CallIcon size={18} className="text-muted-foreground" />
                </div>
                <Input
                  id="phone"
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="pl-8"
                  {...register('phone')}
                />
              </div>
            </div>

            <div className="space-y-2 pt-10">
              <h2 className="text-md font-semibold tracking-tighter">Acesso</h2>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Label htmlFor="email">E-MAIL</Label>
              <div className="relative w-full">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
                  <Mail02Icon size={18} className="text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu e-mail de acesso"
                  className="pl-8"
                  {...register('email')}
                />
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Label htmlFor="password">SENHA</Label>
              <div className="relative w-full">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
                  <AccessIcon size={18} className="text-muted-foreground" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha de acesso"
                  className="pl-8"
                  {...register('password')}
                />
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Label htmlFor="confirmPassword">CONFIRMAR SENHA</Label>
              <div className="relative w-full">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
                  <AccessIcon size={18} className="text-muted-foreground" />
                </div>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  placeholder="Confirme a senha"
                  className="pl-8"
                  {...register('passwordConfirmation')}
                />
              </div>
            </div>
            <div className="space-y-2 pt-6">
              <Button
                className="mt-2 w-full p-6"
                type="submit"
                disabled={isSubmitting}
              >
                Cadastrar
                <ArrowRight02Icon className="ml-auto mr-1 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="space-y-2 pt-10 text-sm text-muted-foreground">
            <Label>Já tem uma conta?</Label>
            <Button
              className="w-full border-primary p-6 text-primary"
              variant="outline"
              onClick={handleSignIn}
            >
              Acessar
              <ArrowRight02Icon className="ml-auto mr-1 h-4 w-4 text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
