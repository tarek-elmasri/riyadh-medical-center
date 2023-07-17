"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AppointmentFormType,
  appointmentSchema,
} from "@/lib/validations/appointment-schema";
import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
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
import {
  AppointmentWithDoctorAndPatient,
  ClinicsWithDoctors,
} from "@/app/types";
import { getSchedulesForAppointments } from "@/app/actions/getSchedules";
import { Schedule } from "@prisma/client";
import { toast } from "react-hot-toast";
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
import { format, isFriday } from "date-fns";
import { arSA } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn, standardDate } from "@/lib/utils";
import Loader from "../ui/Loader";
import axios from "axios";

interface NewAppointmentFormProps {
  clinics: ClinicsWithDoctors;
  initialAppointment: AppointmentWithDoctorAndPatient | null;
}

const NewAppointmentForm: React.FC<NewAppointmentFormProps> = ({
  clinics,
  initialAppointment,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSchedulesLoading, setIsSchedulesLoading] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isNoResults, setIsNoResults] = useState(false);

  const defaultValues = {
    clinicId: initialAppointment?.doctor.clinicId || "",
    doctorId: initialAppointment?.doctor.id || "",
    date: initialAppointment?.date || standardDate(new Date()),
    patientName: initialAppointment?.patient.patientName || "",
    phoneNo: initialAppointment?.patient.phoneNo || "",
  };

  const form = useForm<AppointmentFormType & { clinicId: string }>({
    resolver: zodResolver(appointmentSchema),
    defaultValues,
  });

  const currentClinicId = form.watch("clinicId");
  const doctorId = form.watch("doctorId");
  const date = form.watch("date");

  const currentDoctorList = useMemo(
    () => clinics.find((clinic) => clinic.id === currentClinicId)?.doctors,
    [currentClinicId, clinics]
  );

  // fetch available appointments after doctor and date selections
  useEffect(() => {
    let isFetching = true;
    const fetchSchedules = async () => {
      try {
        setIsSchedulesLoading(true);
        setIsNoResults(false);
        const schedules = await getSchedulesForAppointments({
          doctorId,
          date: date,
        });
        if (isFetching) {
          setSchedules(schedules);
          if (!schedules.length) setIsNoResults(true);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      } finally {
        setIsSchedulesLoading(false);
      }
    };

    if (doctorId.length === 0) {
      form.setValue("scheduleId", "");
      setSchedules([]);
      return;
    }
    fetchSchedules();
    return () => {
      isFetching = false;
    };
  }, [doctorId, date, form]);

  const onSubmit = async (data: AppointmentFormType & { clinicId: string }) => {
    try {
      setIsSubmitting(true);
      if (initialAppointment?.id) {
        await axios.patch(`/api/appointments/${initialAppointment.id}`, data);
      } else {
        await axios.post("/api/appointments", data);
      }

      toast.success("تم حجز الموعد بنجاح");
      window.location.assign("/dashboard/appointments");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const VARIANT = initialAppointment ? "UPDATE" : "CREATE";

  return (
    <div className="mb-32">
      <DashboardPageHeader
        label={VARIANT === "CREATE" ? "اضافة موعد" : "تغيير موعد"}
        description={
          VARIANT === "CREATE"
            ? "اضافة موعد جديد"
            : `الموعد الحالي: ${initialAppointment?.schedule.label}`
        }
        disabled={isSubmitting}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-2 mt-2 grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="clinicId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("doctorId", "");
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormLabel>العيادة:</FormLabel>
                    <FormControl className="text-md">
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ الزيارة:</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 flex justify-between font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy/MM/dd", {
                              locale: arSA,
                            })
                          ) : (
                            <span>حدد التاريخ</span>
                          )}
                          <CalendarIcon className=" h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(selectedDate) =>
                          field.onChange(selectedDate as Date)
                        }
                        locale={arSA}
                        disabled={(date) =>
                          date < standardDate(new Date()) || isFriday(date)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem className="">
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormLabel>الطبيب:</FormLabel>
                    <FormControl className="text-md">
                      <SelectTrigger className="flex-row-reverse">
                        <SelectValue placeholder="الطبيب" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currentDoctorList?.map((doctor) => (
                        <SelectItem
                          key={doctor.id}
                          value={doctor.id}
                          className="flex-row-reverse"
                        >
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
            {isSchedulesLoading && (
              <div className="flex items-end">
                <Loader size={18} className="my-3" />
              </div>
            )}

            {!isSchedulesLoading &&
            schedules.length === 0 &&
            doctorId.length !== 0 ? (
              <div className="">* لا يوجد مواعيد</div>
            ) : (
              <FormField
                control={form.control}
                name="scheduleId"
                render={({ field }) => (
                  <FormItem className="">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormLabel>حدد الموعد:</FormLabel>
                      <FormControl>
                        <SelectTrigger
                          className="flex-row-reverse"
                          disabled={schedules.length === 0}
                        >
                          <SelectValue placeholder="المواعيد" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {schedules.length &&
                          schedules.map((schedule) => (
                            <SelectItem
                              key={schedule.id}
                              value={schedule.id}
                              className="flex-row-reverse"
                            >
                              {schedule.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>الاسم :</FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>رقم الهاتف :</FormLabel>
                  <FormControl>
                    <Input placeholder="05xxxxxxxx" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isSubmitting || isNoResults}
            type="submit"
            className="m-3"
          >
            حفظ
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/dashboard/appointments")}
            variant={"ghost"}
            className="m-3"
          >
            عودة
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewAppointmentForm;
