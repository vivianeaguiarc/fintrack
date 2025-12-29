import { useSearchParams } from 'react-router-dom'

import { useGetTransactions } from '@/api/hooks/transactions'
import { DataTable } from '@/components/ui/data-table'

const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const typeMap = {
        EARNING: {
          label: 'Ganho',
          className: 'text-green-500',
        },
        EXPENSE: {
          label: 'Gasto',
          className: 'text-red-500',
        },
        INVESTMENT: {
          label: 'Investimento',
          className: 'text-blue-500',
        },
      }

      const type = row.original.type

      return (
        <span className={typeMap[type]?.className ?? 'text-gray-400'}>
          {typeMap[type]?.label ?? '—'}
        </span>
      )
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString('pt-BR'),
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row }) => {
      const amount = Number(row.original.amount)

      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
]

const TransactionsTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const { data, isLoading } = useGetTransactions({ from, to })

  const transactions = data?.transactions ?? data ?? []

  if (isLoading) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Carregando transações...
      </div>
    )
  }
  if (!transactions.length) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Nenhuma transação encontrada.
      </div>
    )
  }

  return <DataTable columns={columns} data={transactions} />
}

export default TransactionsTable
