import { api } from '@/lib/axios'

export interface EditProduct {
  id: string
  title: string
  categoryId: string
  description: string
  priceInCents: number
  productImage: FileList
}

export async function editProduct({
  id,
  title,
  categoryId,
  description,
  priceInCents,
  productImage,
}: EditProduct) {
  if (productImage?.length && productImage.length > 0) {
    const files = new FormData()

    files.append('files', productImage[0])

    const attachment = await api.post('/attachments', files)

    const productImageId = attachment.data.attachments[0].id

    const attachmentsIds = []

    attachmentsIds.push(productImageId)

    priceInCents = priceInCents * 100

    const response = await api.put(`/products/${id}`, {
      title,
      categoryId,
      description,
      priceInCents,
      attachmentsIds,
    })

    return response.data
  }
}
