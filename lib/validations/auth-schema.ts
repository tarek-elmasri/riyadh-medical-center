import * as z from "zod";

export const newUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email({ message: "الرجاء ادخال بريد الكتروني صحيح" }),
  password: z.string().min(6),
  isAdmin: z.boolean().default(false).optional(),
});

export const signinSchema = z.object({
  email: z.string().email({ message: "الرجاء ادخال بريد الكتروني صحيح" }),
  password: z.string().min(6),
});

export type NewUserForm = z.infer<typeof newUserSchema>;
export type SigninForm = Omit<NewUserForm, "name" | "isAdmin">;
