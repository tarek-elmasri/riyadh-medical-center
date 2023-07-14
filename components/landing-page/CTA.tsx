"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface CTAProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const CTA: React.FC<CTAProps> = ({ className, children, ...others }) => {
  return (
    <Link href="/">
      <Button
        className={cn(
          "bg-red-800 text-neutral-100 font-bold text-sm md:text-lg md:p-6 hover:bg-red-700",
          className
        )}
        {...others}
      >
        {children}
      </Button>
    </Link>
  );
};

export default CTA;
