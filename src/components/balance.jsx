import { useQuery } from '@tanstack/react-query'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import BalanceItem from '@/components/balance-item'
import { useAuthContext } from '@/context/auth'
import { UserService } from '@/services/user'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const { data } = useQuery({
    queryKey: ['balance', user.id],
    queryFn: () => {
      const from = searchParams.get('from')
      const to = searchParams.get('to')

      return UserService.getBalance({ from, to })
    },
  })

  console.log({ data })

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label="Saldo"
        icon={<WalletIcon size={16} />}
        amount={data?.balance}
      />
      <BalanceItem
        label="Ganhos"
        icon={<TrendingUpIcon className="text-primary-green" size={16} />}
        amount={data?.earnings}
      />
      <BalanceItem
        label="Gastos"
        icon={
          <TrendingDownIcon className="rotate-180 text-primary-red" size={16} />
        }
        amount={data?.expenses}
      />
      <BalanceItem
        label="Investimentos"
        icon={<PiggyBankIcon size={16} className="text-primary-blue" />}
        amount={data?.investments}
      />
    </div>
  )
}

export default Balance
