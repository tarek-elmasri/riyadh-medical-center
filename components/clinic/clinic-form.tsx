"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Clinic } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader from "@/components/ui/imageUploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DashboardPageHeader from "../dashboard/dashboard-page-header";
import AlertModal from "@/components/AlertModal";
import useModal from "@/hooks/useModal";
import { ClinicFormType, clinicSchema } from "@/lib/validations/clinic-schema";

interface ClinicFormProps {
  clinic: Clinic | null;
}
const ClinicForm: React.FC<ClinicFormProps> = ({ clinic }) => {
  const router = useRouter();
  const { open, close, isOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = clinic ? clinic : { name: "", imageUrl: undefined };
  const form = useForm<ClinicFormType>({
    resolver: zodResolver(clinicSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<ClinicFormType> = async (data) => {
    try {
      setIsLoading(true);
      if (clinic?.id) {
        await axios.patch(`/api/clinics/${clinic.id}`, data);
        toast.success("تم تحديث البيانات بنجاح");
      } else {
        await axios.post("/api/clinics", data);
        toast.success("تم انشاء العيادة بنجاح");
      }

      router.push("/dashboard/clinics");
    } catch (error) {
      toast.error("حدث خطأ. الرجاء المحاولة مرة اخرى");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/clinics/${clinic?.id}`);
      toast.success("تم حذف العيادة بنجاح");
      router.replace("/dashboard/clinics");
    } catch (error) {
      toast.error("الرجاء التأكد من عدوم ارتباط أطباء بالعيادة");
    } finally {
      close();
      setIsLoading(false);
    }
  };

  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={close}
        title="هل أنت متاكد من انك تريد حذف العيادة؟"
        disabled={isLoading}
        onDelete={onDelete}
      />
      <DashboardPageHeader
        label={clinic ? "تحديث عيادة" : "اضافة عيادة"}
        description={clinic ? "تحديث بيانات العبادة" : "اضافة عيادة جديد"}
        disabled={isLoading}
        {...(clinic?.id && { onDelete: open })}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <ImageUploader
                  preset={preset!}
                  maxFiles={1}
                  disabled={isLoading}
                  values={field.value ? [field.value] : []}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  onRemove={() => {
                    field.onChange("");
                  }}
                />
                <FormMessage className="mr-2" />
              </FormItem>
            )}
          />
          <div className="p-2 max-w-md mt-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم العيادة:</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="mt-6">
              {clinic?.id ? "تحديث" : "انشاء"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ClinicForm;
