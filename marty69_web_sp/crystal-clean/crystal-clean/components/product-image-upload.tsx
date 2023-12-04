"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-2 pb-5">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-60 h-60 rounded-md overflow-hidden"
          >
            <div className="z-10 absolute bottom-1 right-1">
              <button
                onClick={() => onRemove(url)}
                className="rounded-md bg-black/60 px-2 py-1 text-sm font-semibold text-zinc-300 shadow-sm hover:bg-black/80"
              >
                <TrashIcon className="h-5 w-5" />
                <span className="sr-only">Smazat</span>
              </button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="nxgnwnik">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <div className="">
              <button
                className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                type="button"
                disabled={disabled}
                onClick={onClick}
              >
                <ImagePlus className="h-5 w-5 mx-auto" />
                Nahrát obrázek
              </button>
              <p className="mt-2 text-xs leading-5 text-gray-400">
                JPG, GIF nebo PNG. 10MB max.
              </p>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
