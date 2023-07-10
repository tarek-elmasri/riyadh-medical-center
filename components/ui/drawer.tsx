"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@/components/ui//button";
import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Transition show={isOpen} as={"nav"} appear>
      <Dialog onClose={onClose}>
        {/* Transition Backfrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed z-10 inset-0 bg-black/30" />
        </Transition.Child>

        {/* transition content */}
        <Transition.Child
          as={"div"}
          className="transition duration-500 fixed z-50 inset-y-0 right-0 flex flex-col w-full h-full bg-white border-l border-neutral-400 overflow-y-auto max-w-xs"
          enter="ease-in-out"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel
            className={"p-4 space-y-4 flex flex-col h-full items-start"}
          >
            {/* x button */}
            <Button
              type="button"
              variant={"ghost"}
              className="p-2 rounded-full"
              onClick={onClose}
            >
              <X className="text-neutral-600" />
            </Button>
            <div className="mr-4 h-full" onClick={onClose}>
              {children}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Drawer;
