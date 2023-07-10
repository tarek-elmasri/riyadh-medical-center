"use client";

import { PlusCircle, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  values: string[];
  maxFiles?: number;
  preset: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  disabled,
  onChange,
  onRemove,
  values,
  maxFiles,
  preset,
}) => {
  const onUpload = (results: any) => {
    onChange(results.info.secure_url);
  };

  return (
    <div className="p-2 space-y-4">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-6">
        {values.length === 0 && <p className="text-sm">* لا يوجد صورة</p>}
        {values.map((value) => (
          <div
            key={value}
            className="bg-neutral-300 w-full h-44 relative border border-neutral-200 shadow-sm"
          >
            <Image src={value} alt="Image" fill sizes="(max-width: 400px)" />
            <div
              onClick={() => onRemove(value)}
              className="absolute top-4 left-4 p-1 bg-red-500 text-white rounded-md cursor-pointer"
            >
              <Trash size={18} />
            </div>
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset={preset}
        options={{ maxFiles: maxFiles }}
        onUpload={onUpload}
      >
        {({ open }) => {
          const onClick = () => open();

          return (
            <Button
              type="button"
              variant="secondary"
              onClick={onClick}
              disabled={disabled}
            >
              <PlusCircle className="ml-2" size={18} />
              اضافة صورة
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
