"use client";

import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSchedulesForAppointments } from "@/app/actions/getSchedules";
import { Schedule } from "@prisma/client";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Loader from "@/components/ui/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useMultiStepForm from "@/hooks/useMultiStepForm";

const stepSchema = z.object({
  scheduleId: z.string().min(1, { message: "حقل مطلوب" }),
  date: z.date({ required_error: "حقل مطلوب" }),
});

type StepDataType = z.infer<typeof stepSchema>;

const AppointmentStepTwo: React.FC = () => {
  const { next, prev, form: data } = useMultiStepForm();
  const [isSchedulesLoading, setIsSchedulesLoading] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isNoResult, setIsNoResults] = useState(false);

  const form = useForm<StepDataType>({
    resolver: zodResolver(stepSchema),
    defaultValues: data,
  });

  const doctorId = data.doctorId;
  const date = form.watch("date");
  const scheduleId = form.watch("scheduleId");

  // fetch available appointments after doctor and date selections
  useEffect(() => {
    let isFetching = true;
    const fetchSchedules = async () => {
      try {
        setIsSchedulesLoading(true);
        setIsNoResults(false);
        const schedules = await getSchedulesForAppointments({
          doctorId,
          date: date.toISOString(),
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

    fetchSchedules();
    return () => {
      isFetching = false;
    };
  }, [doctorId, date]);

  const scheduleLabel = useMemo(
    () => schedules.find((schedule) => schedule.id === scheduleId)?.label,
    [scheduleId, schedules]
  );

  const handleNext = (newData: StepDataType) => {
    next({ ...newData, scheduleLabel });
  };

  return (
    <motion.div
      animate={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNext)}
          className="flex flex-col gap-6 h-full p-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            حدد التاريخ
          </h2>
          <Separator />

          <div className="flex flex-col gap-6">
            {doctorId.length !== 0 && (
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
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
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {isSchedulesLoading && (
              <div className="flex justify-center">
                <Loader size={18} />
              </div>
            )}

            {isNoResult ? (
              <p className="font-bold text-md text-slate-900">
                * لا يوجد مواعيد
              </p>
            ) : (
              !isSchedulesLoading &&
              date && (
                <FormField
                  control={form.control}
                  name="scheduleId"
                  render={({ field }) => (
                    <FormItem>
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
              )
            )}
          </div>

          <div className="mt-auto">
            <Separator className="mb-6" />

            <div className="flex items-center gap-6">
              <Button type="submit" className="text-md">
                التالي
              </Button>
              <Button
                type="button"
                variant={"ghost"}
                className="text-md"
                onClick={() => prev(form.getValues())}
              >
                عودة
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default AppointmentStepTwo;
