import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowDown01Icon } from 'hugeicons-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { editProduct } from '@/api/edit-product'
import { getCategories } from '@/api/get-categories'
import { getProductById } from '@/api/get-product-by-id'
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

type EditProductForm = z.infer<typeof signUpForm>

export function EditProduct() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const productId = searchParams.get('id') + ''

  const { data: productById } = useQuery({
    queryFn: () => getProductById({ id: productId }),
    queryKey: ['product', 'edit', productId],
  })

  const { data: categoriesList } = useQuery({
    queryFn: getCategories,
    queryKey: ['products', 'categories'],
  })

  const [productTitle, setProductTitle] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPriceInCents, setProductPriceInCents] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EditProductForm>({
    values: {
      title: productTitle,
      description: productDescription,
      priceInCents: productPriceInCents,
    },
  })

  const [category, setCategory] = useState<Category>({
    id: '',
    title: '',
  })

  useEffect(() => {
    if (productById?.product) {
      setCategory({
        id: productById.product.category.id,
        title: productById.product.category.title,
      })
      setProductTitle(productById.product.title)
      setProductDescription(productById.product.description)
      setProductPriceInCents(productById.product.priceInCents / 100)
    }
  }, [productById])

  const { mutateAsync: updateProduct } = useMutation({
    mutationFn: editProduct,
  })

  async function handleRegisterNewProduct(data: EditProductForm) {
    try {
      const updated = await updateProduct({
        id: productId,
        title: data.title,
        categoryId: category.id,
        description: data.description,
        priceInCents: data.priceInCents,
        productImage: data.productImage,
      })

      console.log(JSON.stringify(updated))

      toast.success(`Produto atualizado com sucesso!`)
    } catch (e) {
      toast.error(`Erro ao atualizar: ${(e as Error).message}`)
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
      <Helmet title="Editar Produto" />
      {productById?.product && (
        <div className="min-h-screen bg-muted antialiased">
          <div className="">
            <h1 className="text-2xl">Editar produto</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie as informações do produto cadastrado
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleRegisterNewProduct)}
            encType="multipart/form-data"
          >
            <div className="mt-10 grid w-[1030px] grid-cols-5 gap-4">
              <div className="col-span-2">
                <div className="space-y-4">
                  <label className="flex aspect-square h-[340px] w-full cursor-pointer justify-center overflow-hidden rounded-xl text-primary">
                    <img
                      className="h-48 w-full rounded-2xl object-cover"
                      src={productById.product?.attachments[0].url}
                      alt={productById.product?.title}
                    />
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
      )}
    </>
  )
}
