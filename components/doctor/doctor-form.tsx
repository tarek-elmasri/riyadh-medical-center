"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Clinic, Doctor, Schedule } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
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
import { DoctorFormType, doctorSchema } from "@/lib/validations/doctor-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface DoctorFormProps {
  doctor: (Doctor & { schedules: Schedule[] }) | null;
  clinics: Clinic[];
  schedules: Schedule[];
}
const DoctorForm: React.FC<DoctorFormProps> = ({
  doctor,
  clinics,
  schedules,
}) => {
  const router = useRouter();
  const { open, close, isOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = doctor
    ? {
        ...doctor,
        scheduleIds: doctor.schedules.map((schedule) => schedule.id),
      }
    : { name: "", title: "", imageUrl: undefined, scheduleIds: [] };

  const form = useForm<DoctorFormType>({
    resolver: zodResolver(doctorSchema),
    defaultValues,
  });

  const scheduleIds = form.watch("scheduleIds");

  const handleScheduleCheck = (id: string) => {
    console.log("handling");
    console.log("value: ", id);
    const newScheduleIds: string[] = [];

    schedules.map((schedule) => {
      if (schedule.id !== id) {
        if (scheduleIds.indexOf(schedule.id) !== -1) {
          newScheduleIds.push(schedule.id);
        }
      } else {
        if (scheduleIds.indexOf(id) === -1) {
          newScheduleIds.push(id);
        }
      }
    });
    console.log(newScheduleIds);
    return newScheduleIds;
  };

  const VARIANT = doctor ? "UPDATE" : "CREATE";
  const onSubmit: SubmitHandler<DoctorFormType> = async (data) => {
    try {
      setIsLoading(true);
      if (doctor?.id) {
        await axios.patch(`/api/doctors/${doctor.id}`, data);
        toast.success("تم تحديث البيانات بنجاح");
      } else {
        await axios.post("/api/doctors", data);
        toast.success("تم اضافة الطبيب بنجاح");
      }

      window.location.assign("/dashboard/doctors");
    } catch (error) {
      console.log((error as Error).message);
      toast.error("حدث خطأ. الرجاء المحاولة مرة اخرى");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/clinics/${doctor?.id}`);
      toast.success("تم حذف الطبيب بنجاح");
      router.replace("/dashboard/doctors");
    } catch (error) {
      toast.error("حدث خطأ. الرجاء المحاولة مرة اخرى");
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
        title="هل أنت متاكد من انك تريد حذف الطبيب؟"
        description="سيتم حذف جميع المواعيد المرتبطة بالطبيب!"
        disabled={isLoading}
        onDelete={onDelete}
      />
      <DashboardPageHeader
        label={VARIANT === "UPDATE" ? "تحديث بيانات الطبيب" : "اضافة طبيب"}
        disabled={isLoading}
        {...(VARIANT === "UPDATE" && { onDelete: open })}
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
                  <FormLabel>اسم الطبيب:</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>التخصص :</FormLabel>
                  <FormControl>
                    <Input required disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clinicId"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex-row-reverse">
                        <SelectValue placeholder="العيادة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clinics.map((clinic) => (
                        <SelectItem
                          key={clinic.id}
                          value={clinic.id}
                          className="flex-row-reverse"
                        >
                          {clinic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scheduleIds"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>المواعيد</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-64 justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          حدد مواعيد الحجز للطبيب
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0">
                      <Command>
                        <CommandGroup>
                          {schedules.map((schedule) => (
                            <CommandItem
                              value={schedule.id}
                              key={schedule.id}
                              onSelect={(value) => {
                                form.setValue(
                                  "scheduleIds",
                                  handleScheduleCheck(value)
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value?.indexOf(schedule.id) !== -1
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {schedule.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    هذه المواعيد ستكون متاحة لحجز المواعيد من قبل المرضى
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="mt-6">
              {VARIANT === "UPDATE" ? "تحديث" : "اضافة"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default DoctorForm;
