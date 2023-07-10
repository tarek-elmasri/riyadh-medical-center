"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface UserButtonProps {
  userFirstLeter: string;
}
const UserButton: React.FC<UserButtonProps> = ({ userFirstLeter }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-[2.5rem] aspect-square rounded-full bg-cyan-800  flex justify-center items-center cursor-pointer hover:ring-2 focus-within:outline-none ring-slate-800 ring-offset-2">
        <p className="text-white mt-1">{userFirstLeter}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row-reverse">
          حسابي
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex-row-reverse">
          اعداداتي
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex-row-reverse"
          onClick={() => signOut()}
        >
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
