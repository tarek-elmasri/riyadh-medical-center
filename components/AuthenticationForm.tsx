"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  signinSchema,
  SigninForm,
  NewUserForm,
  newUserSchema,
} from "@/lib/validations/auth-schema";

type AuthForm = SigninForm;

const AuthenticationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AuthForm>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const onSubmit = async (data: AuthForm) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("البريد الالكتروني او كلمة المرور خاطئة");
        }

        if (!callback?.error && callback?.ok) {
          router.push(callbackUrl);
        }
      })
      .finally(() => setIsLoading(false));
  };

  // const handleCreateUser = async (data: AuthForm) => {
  //   try {
  //     setIsLoading(true);
  //     await axios.post("/api/users", { ...data });
  //     toast.success("تم انشاء حساب موظف جديد بنجاح");
  //     router.push("/dashboard");
  //   } catch (error) {
  //     toast.error(
  //       "حدث حطأ. الرجاء التأكد من ان البريد الالكتروني غير مسجل سابقا"
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const onSubmit: SubmitHandler<AuthForm> = async (data) =>
  //   variant === "SIGNIN" ? handleSignIn(data) : handleCreateUser(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>البريد الالكتروني:</FormLabel>
              <FormControl>
                <Input type="email" required {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>كلمة المرور:</FormLabel>
              <FormControl>
                <Input type="password" required {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="mt-6">
          تسجيل الدخول
        </Button>
      </form>
    </Form>
  );
};

export default AuthenticationForm;
