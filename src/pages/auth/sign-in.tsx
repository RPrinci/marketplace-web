import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { AccessIcon, ArrowRight02Icon, Mail02Icon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: { email: searchParams.get('email') ?? '' },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email, password: data.password })

      navigate('/', { replace: true })
    } catch {
      toast.error('Credenciais inválidas.')
    }
  }

  async function handleSignUp() {
    navigate('/sign-up', { replace: true })
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="mb-auto mt-10 overscroll-none p-8">
        <div className="flex w-[350px] flex-col justify-center gap-10">
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acesse sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Informe seu e-mail e senha para entrar
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2 text-sm text-muted-foreground">
              <Label htmlFor="email">E-MAIL</Label>
              <div className="relative w-full">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
                  <Mail02Icon size={18} className="text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu e-mail cadastrado"
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
                  placeholder="Sua senha de acesso"
                  className="pl-8"
                  {...register('password')}
                />
              </div>
            </div>
            <div className="space-y-2 pt-6">
              <Button
                disabled={isSubmitting}
                className="mt-2 w-full p-6"
                type="submit"
              >
                Acessar
                <ArrowRight02Icon className="ml-auto mr-1 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="space-y-2 pt-14 text-sm text-muted-foreground">
            <Label>Ainda não tem uma conta?</Label>
            <Button
              className="w-full border-primary p-6 text-primary"
              variant="outline"
              onClick={handleSignUp}
            >
              Cadastrar
              <ArrowRight02Icon className="ml-auto mr-1 h-4 w-4 text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
