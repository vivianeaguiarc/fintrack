import z from 'zod'

export const loginFormSchema = z.object({
  email: z.string().trim().email({
    message: 'Insira um email válido.',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  }),
})

export const signupFormSchema = z
  .object({
    firstName: z.string().trim().min(2, {
      message: 'O nome deve ter no mínimo 2 caracteres.',
    }),
    lastName: z.string().trim().min(2, {
      message: 'O sobrenome deve ter no mínimo 2 caracteres.',
    }),
    email: z.string().trim().email({
      message: 'Insira um email válido.',
    }),
    password: z.string().min(6, {
      message: 'A senha deve ter no mínimo 6 caracteres.',
    }),
    confirmPassword: z.string().min(6, {
      message: 'A confirmação de senha deve ter no mínimo 6 caracteres.',
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você deve aceitar os termos de uso e política de privacidade.',
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      message: 'As senhas não coincidem.',
      path: ['confirmPassword'],
    }
  )
