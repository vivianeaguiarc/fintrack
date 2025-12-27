import z from 'zod'

export const loginFormSchema = z.object({
  email: z.string().trim().email({
    message: 'Insira um email válido.',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  }),
})
