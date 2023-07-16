"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { appointmentSchema } from "@/lib/validations/appointment-schema";

const stepSchema = appointmentSchema.pick({ patientName: true, phoneNo: true });
type StepSchemaType = z.infer<typeof stepSchema>;

const AppointmentStepThree = () => {
  const { form: data, prev, next } = useMultiStepForm();
  const form = useForm<StepSchemaType>({
    resolver: zodResolver(stepSchema),
    defaultValues: data,
  });

  return (
    <motion.div
      animate={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(next)}
          className="flex flex-col gap-6 h-full p-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            ادخل بياناتك
          </h2>
          <Separator />
          <div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormLabel>رقم الهاتف :</FormLabel>
                    <FormControl>
                      <Input placeholder="05xxxxxxxx" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

export default AppointmentStepThree;
