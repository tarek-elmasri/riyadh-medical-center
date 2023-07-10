"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardPageHeaderProps {
  label: string;
  addNewURL?: string;
  onDelete?: () => void;
  description?: string;
  disabled?: boolean;
}

const DashboardPageHeader: React.FC<DashboardPageHeaderProps> = ({
  label,
  addNewURL,
  description,
  onDelete,
  disabled,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-4xl">{label}</h1>
          <p className="font-semibold text-neutral-400 text-md mr-2">
            {description}
          </p>
        </div>

        {addNewURL && (
          <Button
            disabled={disabled}
            className="text-md"
            onClick={() => router.push(addNewURL)}
          >
            جديد
            <PlusCircle size={20} className="mr-2 " />
          </Button>
        )}

        {onDelete && (
          <Button
            variant={"destructive"}
            className="p-2 text-md"
            onClick={onDelete}
            disabled={disabled}
          >
            حذف
            <Trash size={20} className="mr-2 " />
          </Button>
        )}
      </div>
      <Separator className="my-4" />
    </>
  );
};

export default DashboardPageHeader;
