import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSearchParams } from 'react-router-dom'

import { useGetTransactions } from '@/api/hooks/transactions'
import TransactionTypeBadge from '@/components/transaction-type-badge'
import { DataTable } from '@/components/ui/data-table'
import { formatCurrency } from '@/helpers/currency'

const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />
    },
  },

  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => {
      const date = new Date(row.original.date)

      return format(date, "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },
  },

  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row }) => {
      const amount = Number(row.original.amount)
      return formatCurrency(amount)
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
