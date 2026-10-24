import { z } from 'zod'

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
    .max(50, 'نام نمی‌تواند بیش از ۵۰ کاراکتر باشد'),
  email: z.string().email('ایمیل نامعتبر است'),
  password: z
    .string()
    .min(8, 'پسورد باید حداقل ۸ کاراکتر باشد')
    .max(100, 'پسورد خیلی طولانی است'),
  role: z.enum(['JOBSEEKER', 'COMPANY'], {
    errorMap: () => ({ message: 'نقش نامعتبر است' }),
  }),
})

export const loginSchema = z.object({
  email: z.string().email('ایمیل نامعتبر است'),
  password: z.string().min(1, 'پسورد الزامی است'),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>