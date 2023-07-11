"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { User } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
import AlertModal from "@/components/AlertModal";
import useModal from "@/hooks/useModal";
import {
  NewUserForm,
  UpdateUserForm,
  newUserSchema,
  updateUserSchema,
} from "@/lib/validations/auth-schema";
import { useSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";

interface UserFormProps {
  user: Omit<User, "password"> | null;
}

type UserFormType = UpdateUserForm | NewUserForm;
const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { open, close, isOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = user
    ? { ...user, password: "" }
    : { name: "", email: "", password: "", isAdmin: false };
  const form = useForm<UserFormType>({
    resolver: zodResolver(user ? updateUserSchema : newUserSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<UserFormType> = async (data) => {
    try {
      setIsLoading(true);
      if (user?.id) {
        await axios.patch(`/api/users/${user.id}`, data);
        toast.success("تم تحديث البيانات بنجاح");
      } else {
        await axios.post("/api/users", data);
        toast.success("تم انشاء الموظف بنجاح");
      }

      window.location.assign(isAdmin ? "/dashboard/users" : "/dashboard");
    } catch (error) {
      toast.error("حدث خطأ. الرجاء المحاولة مرة اخرى");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${user?.id}`);
      toast.success("تم حذف العيادة بنجاح");
      router.replace("/dashboard/users");
    } catch (error) {
      toast.error("حدث خطأ. الرجاء المحاولة مرة اخرى");
    } finally {
      close();
      setIsLoading(false);
    }
  };

  const VARIANT = user?.id ? "UPDATE" : "CREATE";
  const isAdmin = session?.user.isAdmin;

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={close}
        title="هل أنت متاكد من انك تريد حذف الموظف؟"
        disabled={isLoading}
        onDelete={onDelete}
      />
      <DashboardPageHeader
        label={user ? "تحديث موظف" : "اضافة موظف"}
        description={user ? "تحديث بيانات موظف" : "اضافة موظف جديد"}
        disabled={isLoading}
        {...(VARIANT === "UPDATE" && { onDelete: open })}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-2 max-w-md mt-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الموظف:</FormLabel>
                  <FormControl>
                    <Input required disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>البريد الالكتروني:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      required
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isAdmin && (
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>كلمة المرور :</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          required
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isAdmin"
                  render={({ field }) => (
                    <FormItem className="mt-4 flex items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(value) => field.onChange(!!value)}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel className="mr-2">أدمن</FormLabel>
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button disabled={isLoading} type="submit" className="mt-6">
              {VARIANT === "UPDATE" ? "تحديث" : "حفظ"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UserForm;
