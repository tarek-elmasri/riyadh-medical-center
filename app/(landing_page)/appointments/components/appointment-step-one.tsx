"use client";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClinicsWithDoctors } from "@/app/types";
import { useMemo } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useMultiStepForm from "@/hooks/useMultiStepForm";

const stepSchema = z.object({
  clinicId: z.string().min(1, { message: "حقل مطلوب" }),
  doctorId: z.string().min(1, { message: "حقل مطلوب" }),
});

type StepSchemaType = z.infer<typeof stepSchema>;

const AppointmentStepOne: React.FC<{ clinics: ClinicsWithDoctors }> = ({
  clinics,
}) => {
  const { next, form: data } = useMultiStepForm();
  const form = useForm<StepSchemaType>({
    defaultValues: data,
    resolver: zodResolver(stepSchema),
  });

  const currentClinicId = form.watch("clinicId");
  const doctorId = form.watch("doctorId");

  //  filter doctors from current clinic selection
  const currentDoctorList = useMemo(() => {
    return clinics.find((clinic) => clinic.id === currentClinicId)?.doctors;
  }, [currentClinicId, clinics]);

  const handleNext = (newData: StepSchemaType) => {
    const doctor = currentDoctorList?.find((doctor) => doctor.id === doctorId);
    const clinic = clinics.find(
      (clinicItem) => clinicItem.id === currentClinicId
    );
    next({
      ...newData,
      doctorName: doctor?.name,
      doctorTitle: doctor?.title,
      clinicName: clinic?.name,
    });
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
            اختر العيادة
          </h2>
          <Separator />
          {/* form fields */}
          <div>
            <div className="flex flex-col gap-6">
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
                      <FormLabel className="text-lg font-bold">
                        العيادة:
                      </FormLabel>
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
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormLabel className="text-lg font-bold">
                        الطبيب:
                      </FormLabel>
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
            </div>
          </div>

          {/* form navigation */}
          <div className="mt-auto">
            <Separator className="mb-6" />
            <div className="flex items-center gap-6">
              <Button type="submit" className="text-md">
                التالي
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default AppointmentStepOne;
