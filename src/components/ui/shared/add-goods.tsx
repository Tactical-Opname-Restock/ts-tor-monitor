import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { TGoodsForm } from '@/lib/validations/goods.schema'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputText } from '@/components/ui/shared/input-text'
import { goodsFormSchema } from '@/lib/validations/goods.schema'
import { useGoodMutation } from '@/hooks/mutation/use-goods-mutation/use-goods-mutation'

interface AddGoodsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddGoodsModal({
  open,
  onOpenChange,
  onSuccess,
}: AddGoodsModalProps) {
  const goodForm = useForm<TGoodsForm>({
    resolver: zodResolver(goodsFormSchema),
    mode: 'onChange',
    // defaultValues: {
    //   name: '',
    //   category: '',
    //   price: 0,
    //   stock_quantity: 0,
    // },
  })

  const goodsMutate = useGoodMutation()

  const onSubmit = (values: TGoodsForm) => {
    goodsMutate.mutate(values, {
      onSuccess: () => {
        toast.success('Produk Berhasil Ditambahkan', {
          position: 'top-right',
          richColors: true,
          description: 'Produk baru telah ditambahkan ke inventory',
        })

        goodForm.reset()
        onOpenChange(false)
        onSuccess?.()
      },
      onError: () => {
        toast.error('Gagal Menambahkan Produk', {
          position: 'top-right',
          richColors: true,
          description: 'Terjadi kesalahan saat menambahkan produk',
        })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Goods</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>

        <Form {...goodForm}>
          <form onSubmit={goodForm.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputText
                name="name"
                label="Product Name"
                placeholder="Enter product name"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={goodForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={goodForm.control}
                  name="stock_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <InputText
                name="category"
                label="Category"
                placeholder="Enter category"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="default"
                onClick={() => onOpenChange(false)}
                disabled={goodsMutate.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={goodsMutate.isPending}>
                Add Product
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
