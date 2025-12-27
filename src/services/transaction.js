import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma nova transação
   * @param {Object} input - Dados da transação
   * @param {string} input.name - Nome da transação
   * @param {number} input.amount - Valor da transação
   * @param {string} input.date - Data da transação
   * @param {string} input.type - Tipo da transação (income ou expense)
   * @returns {Object} Transação criada
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },
}
