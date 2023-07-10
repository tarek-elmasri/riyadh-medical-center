"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoctorColumn } from "./Columns";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";
import AlertModal from "@/components/AlertModal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";

const CellActions = ({ data }: { data: DoctorColumn }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const { close, open, isOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/doctors/${data.id}`);
      close();
      toast.success("تم حذف الطبيب بنجاح");
      router.refresh();
    } catch (error) {
      close();
      toast.error("حدث خطأ. الرجاء المحاولة مرة اخرى");
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = !!session?.user.isAdmin;

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={close}
        onDelete={handleOnDelete}
        disabled={isLoading}
        title="هل ترغب في حذف الطبيب؟"
        description="سيتم حذف جميع المواعيد المرتبطة بالطبيب!"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            disabled={!isAdmin || isLoading}
            className="flex-row-reverse"
            onClick={() => router.push(`/dashboard/doctors/${data.id}`)}
          >
            تحديث البيانات
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!isAdmin || isLoading}
            className="flex-row-reverse"
            onClick={open}
          >
            حذف الطبيب
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
