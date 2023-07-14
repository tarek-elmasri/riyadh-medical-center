"use client";

import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  loading?: boolean;
  message?: string;
  className?: string;
  color?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ message, className, ...others }) => {
  return (
    <>
      <ClipLoader
        className={cn("", className)}
        {...others}
        aria-label="Loading Spinner"
      />
      {message && <p className={"mt-12"}>{message}</p>}
    </>
  );
};

export default Loader;
