"use client";

import Modal from "@/components/ui/modal";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  disabled?: boolean;
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
  title: string;
  description?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onDelete,
  onClose,
  title,
  description,
  disabled,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <DialogFooter>
        <div className="flex gap-4 items-center justify-start">
          <Button
            variant={"destructive"}
            onClick={onDelete}
            disabled={disabled}
          >
            حذف
          </Button>
          <Button variant={"secondary"} onClick={onClose} disabled={disabled}>
            الغاء
          </Button>
        </div>
      </DialogFooter>
    </Modal>
  );
};

export default AlertModal;
