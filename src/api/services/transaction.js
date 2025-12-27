import queryString from 'query-string'

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
  /**
   * Retorna as transações do usuário autenticado
   * @param {Object} input - Dados da transação
   * @param {string} input.from - Data inicial para filtro
   * @param {number} input.to - Data final para filtro
   * @returns {Array} Lista de transações
   */
  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to })
    const response = await protectedApi.get(`/transactions/me?${query}`)
    return response.data
  },
}
