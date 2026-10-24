import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  role: z.enum(["JOBSEEKER", "COMPANY"], {
    message: "نقش را انتخاب کنید",
  }),
});

export const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(1, "رمز عبور الزامی است"),
});

export const profileSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").optional(),
  bio: z.string().max(300, "بیو حداکثر ۳۰۰ کاراکتر").optional(),
  avatar: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export const jobSchema = z.object({
  title: z.string().min(2, "عنوان شغل الزامی است"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
  location: z.string().min(2, "مکان الزامی است"),
  type: z.enum(["full-time", "part-time", "remote", "contract"]),
  level: z.enum(["junior", "mid", "senior"]),
  salary: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export const offerSchema = z.object({
  jobseekerId: z.string().min(1, "کارجو را انتخاب کنید"),
  message: z.string().min(5, "پیام باید حداقل ۵ کاراکتر باشد"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "نام الزامی است"),
  email: z.string().email("ایمیل معتبر نیست"),
  subject: z.string().min(2, "موضوع الزامی است"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type JobInput = z.infer<typeof jobSchema>;
export type OfferInput = z.infer<typeof offerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;