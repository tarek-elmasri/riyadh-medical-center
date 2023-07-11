"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
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
import DashboardPageHeader from "../dashboard/dashboard-page-header";
import {
  ScheduleFormType,
  scheduleSchema,
} from "@/lib/validations/schedule-schema";

const ScheduleForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ScheduleFormType>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: { label: "" },
  });

  const onSubmit: SubmitHandler<ScheduleFormType> = async (data) => {
    try {
      setIsLoading(true);

      await axios.post("/api/schedules", data);
      toast.success("تم حفظ الموعد بنجاح");
      window.location.assign("/dashboard/schedules");
    } catch (error) {
      toast.error("حدث خطأ. الرجاء المحاولة مرة اخرى");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DashboardPageHeader
        label={"اضافة موعد"}
        description={"اضافة موعد جديد"}
        disabled={isLoading}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-2 max-w-md mt-2">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوصف :</FormLabel>
                  <FormControl>
                    <Input required disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="mt-6">
              حفظ
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ScheduleForm;
