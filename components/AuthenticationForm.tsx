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

interface AuthenticateFormProps {
  variant: "SIGNIN" | "CREATE_USER";
}

type AuthForm = SigninForm | NewUserForm;

const AuthenticationForm: React.FC<AuthenticateFormProps> = ({ variant }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AuthForm>({
    resolver: zodResolver(variant === "SIGNIN" ? signinSchema : newUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isAdmin: false,
    },
  });

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const handleSignIn = async (data: AuthForm) => {
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

  const handleCreateUser = async (data: AuthForm) => {
    try {
      setIsLoading(true);
      await axios.post("/api/users", { ...data });
      toast.success("تم انشاء حساب موظف جديد بنجاح");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        "حدث حطأ. الرجاء التأكد من ان البريد الالكتروني غير مسجل سابقا"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<AuthForm> = async (data) =>
    variant === "SIGNIN" ? handleSignIn(data) : handleCreateUser(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {variant === "CREATE_USER" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>اسم الموظف:</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

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

        {variant === "CREATE_USER" && (
          <FormField
            control={form.control}
            name="isAdmin"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormControl>
                  <div className="flex items-center justify-start gap-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(!!value)}
                    />
                    <FormLabel>أدمن</FormLabel>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button disabled={isLoading} type="submit" className="mt-6">
          {variant === "SIGNIN" ? "تسجيل الدخول" : "انشاء الحساب"}
        </Button>
      </form>
    </Form>
  );
};

export default AuthenticationForm;
