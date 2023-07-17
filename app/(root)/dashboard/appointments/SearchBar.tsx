"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, standardDate } from "@/lib/utils";
import { Doctor } from "@prisma/client";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface SearchBarProps {
  handleSearch: (form: { doctorId: string; date: Date }) => void;
  doctors: Doctor[];
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch, doctors }) => {
  const form = useForm<{ doctorId: string; date: Date }>({
    defaultValues: {
      doctorId: "",
      date: standardDate(new Date()),
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSearch)}>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
            <div className="w-full">
              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormLabel>الطبيب:</FormLabel>
                      <FormControl>
                        <SelectTrigger className="flex-row-reverse">
                          <SelectValue placeholder="العيادة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem
                            key={doctor.id}
                            value={doctor.id}
                            className="flex-row-reverse"
                          >
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اليوم :</FormLabel>
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
                              <span>اليوم</span>
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
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            <div className="self-start mt-3 md:mt-0 md:self-end">
              <Button type="submit" size={"sm"}>
                بحث
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SearchBar;
