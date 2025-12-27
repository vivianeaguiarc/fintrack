import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetUserBalance } from '@/api/hooks/user'
import BalanceItem from '@/components/balance-item'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const { data } = useGetUserBalance({ from, to })

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
