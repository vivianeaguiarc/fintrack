import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  /**
   *
   * cria um novo usuario
   * @param {Object} input - Usuario a ser criado
   * @param {string} input.firstName - Nome do usuario
   * @param {string} input.lastName - Sobrenome do usuario
   * @param {string} input.email - Email do usuario
   * @param {string} input.password - Senha do usuario
   * @returns {Object} Usuario criado
   */
  signup: async (input) => {
    const response = await publicApi.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },
  /**
   *
   * realiza o login do usuario
   * @param {Object} input - Dados de login
   * @param {string} input.email - Email do usuario
   * @param {string} input.password - Senha do usuario
   * @returns {Object} Usuario logado
   */
  login: async (input) => {
    const response = await publicApi.post('/users/login', {
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },
  /**
   * Retorna usuario autenticado
   *
   * @returns {Object} Usuario autenticado
   */
  me: async () => {
    const response = await protectedApi.get('/users/me')
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
    }
  },
}
