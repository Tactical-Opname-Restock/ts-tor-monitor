import { Plus } from 'lucide-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useGoodsQuery } from '@/hooks/query/use-goods-query/use-goods-query'
import { ProductCard } from '@/components/ui/shared/goods-product'
import { DashboardLayout } from '@/components/ui/shared/dashboard-layout'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { AddGoodsModal } from '@/components/ui/shared/add-goods'

const searchSchema = z.object({
  page_index: z.number().default(1),
  limit: z.number().default(8),
  q: z.string().default(''),
})

type SearchParams = z.infer<typeof searchSchema>

export const Route = createFileRoute('/dashboard/goods/')({
  validateSearch: (search): SearchParams => searchSchema.parse(search),
  component: GoodsPage,
})

function GoodsPage() {
  const navigate = useNavigate({ from: Route.fullPath })
  const search = Route.useSearch()
  const queryClient = useQueryClient()

  const { page_index, limit, q } = search
  const { data, isLoading } = useGoodsQuery({ page_index, limit, q })
  const totalPages = data ? Math.ceil(data.total / limit) : 1

  const [isModalOpen, setIsModalOpen] = useState(false)

  const updateSearch = (patch: Partial<SearchParams>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...patch,
      }),
      replace: true,
    })
  }

  const handleAddSuccess = () => {
    // Invalidate and refetch goods query
    queryClient.invalidateQueries({ queryKey: ['goods'] })
  }
  const handleDelete = (id: string) => {
    console.log(id)
  }
  return (
    <DashboardLayout title="Goods" description="Manage product list">
      <div className="flex justify-between items-center mb-6 gap-4">
        <Input
          placeholder="Search..."
          defaultValue={q}
          onChange={(e) => updateSearch({ q: e.target.value, page_index: 1 })}
          className="max-w-sm"
        />

        <div className="flex items-center gap-3">
          <Select
            value={limit.toString()}
            onValueChange={(value) =>
              updateSearch({ limit: Number(value), page_index: 1 })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              {[5, 8, 12, 20, 50].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Goods
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {isLoading && <div>Loading...</div>}
        {data?.data.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  page_index > 1 && updateSearch({ page_index: page_index - 1 })
                }
                className={page_index <= 1 ? 'opacity-50  cursor-pointer' : ''}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page_index === i + 1}
                  onClick={() => updateSearch({ page_index: i + 1 })}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  page_index < totalPages &&
                  updateSearch({ page_index: page_index + 1 })
                }
                className={
                  page_index >= totalPages
                    ? 'opacity-50 pointer-events-none'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <AddGoodsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={handleAddSuccess}
      />
    </DashboardLayout>
  )
}
