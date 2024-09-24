import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowDown01Icon, ImageUploadIcon } from 'hugeicons-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getCategories } from '@/api/get-categories'
import { newProduct } from '@/api/new-product'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface Category {
  id: string
  title: string
}

const maxFileSize = 500000
const acceptedImageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const signUpForm = z.object({
  title: z.string(),
  categoryId: z.string(),
  description: z.string(),
  priceInCents: z.number(),
  productImage: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine((files) => files?.[0]?.size <= maxFileSize, `Max file size is 5MB.`)
    .refine(
      (files) => acceptedImageTypes.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
})

type NewProductForm = z.infer<typeof signUpForm>

export function NewProduct() {
  const navigate = useNavigate()

  const { data: categoriesList } = useQuery({
    queryFn: getCategories,
    queryKey: ['products', 'categories'],
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewProductForm>()

  const [category, setCategory] = useState<Category>({
    id: '',
    title: '',
  })

  const { mutateAsync: registerNewProduct } = useMutation({
    mutationFn: newProduct,
  })

  async function handleRegisterNewProduct(data: NewProductForm) {
    try {
      await registerNewProduct({
        title: data.title,
        categoryId: category.id,
        description: data.description,
        priceInCents: data.priceInCents,
        productImage: data.productImage,
      })

      toast.success(`Produto cadastrado com sucesso!`)
    } catch (e) {
      toast.error(`Erro ao cadastrar: ${(e as Error).message}`)
    }
  }

  function handleCategoryCheck(id: string, title: string) {
    setCategory({ id, title })
  }

  function handleCancel() {
    navigate('/products', { replace: true })
  }

  return (
    <>
      <Helmet title="Novo Produto" />
      <div className="min-h-screen bg-muted antialiased">
        <div className="">
          <h1 className="text-2xl">Novo produto</h1>
          <p className="text-sm text-muted-foreground">
            Cadastre um produto para venda no marketplace
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleRegisterNewProduct)}
          encType="multipart/form-data"
        >
          <div className="mt-10 grid w-[1030px] grid-cols-5 gap-4">
            <div className="col-span-2">
              <div className="space-y-4">
                <label className="flex aspect-square h-[340px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-red-100 text-primary">
                  <ImageUploadIcon className="text-orange-base size-8" />
                  <input
                    className="hidden"
                    id="productImage"
                    type="file"
                    {...register('productImage')}
                  />
                </label>
              </div>
            </div>
            <div className="col-span-3">
              <Card>
                <CardContent className="p-6">
                  <h1 className="mb-6">Dados do produto</h1>
                  <div className="mb-4 grid grid-flow-col grid-cols-5 gap-4">
                    <div className="col-span-3 space-y-2 text-sm text-muted-foreground">
                      <Label htmlFor="title">TÍTULO</Label>
                      <div className="relative w-full">
                        <Input
                          id="title"
                          type="text"
                          placeholder="Nome do produto"
                          {...register('title')}
                        />
                      </div>
                    </div>
                    <div className="col-span-2 space-y-2 text-sm text-muted-foreground">
                      <Label htmlFor="priceInCents">VALOR</Label>
                      <div className="relative w-full">
                        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform text-gray-700">
                          R$
                        </div>
                        <Input
                          id="priceInCents"
                          type="text"
                          className="pl-8"
                          placeholder="0,00"
                          {...register('priceInCents')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <Label htmlFor="description">DESCRIÇÃO</Label>
                    <div className="relative w-full">
                      <Textarea
                        id="description"
                        placeholder="Escreva detalhes sobre o produto, tamanho, características"
                        {...register('description')}
                      />
                    </div>
                  </div>
                  <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <Label htmlFor="description">CATEGORIA</Label>
                    <div className="relative w-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="relative mb-10 w-full">
                            <Input
                              id="categoryId"
                              type="text"
                              placeholder="Selecione"
                              value={category.title}
                              {...register('categoryId')}
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
                          {categoriesList &&
                            categoriesList.categories.map((item) => {
                              return (
                                <DropdownMenuCheckboxItem
                                  key={item.id}
                                  onCheckedChange={() =>
                                    handleCategoryCheck(item.id, item.title)
                                  }
                                >
                                  {item.title}
                                </DropdownMenuCheckboxItem>
                              )
                            })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="mb-4 grid grid-flow-col grid-cols-2 gap-4">
                    <Button
                      className="border-primary text-primary"
                      variant={'outline'}
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      Salvar e publicar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
