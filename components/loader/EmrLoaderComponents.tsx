"use client";

import Image from "next/image";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EmrLoaderDialogProps {
  isLoading: boolean;
}

export const EmrLoader = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative size-16">
        <Image
          src="/assets/icons/leon-cares-eclinic_logo_white-01.png"
          height={64}
          width={64}
          alt="Loading..."
          className="animate-spin"
        />
      </div>
    </div>
  );
};

export const EmrLoaderDialog: React.FC<EmrLoaderDialogProps> = ({
  isLoading,
}) => {
  return (
    <Dialog open={isLoading}>
      <DialogContent className="m-0 flex items-center justify-center bg-transparent p-0 shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Loading...</DialogTitle>
        </DialogHeader>
        <div className="bg-transparent">
          <Image
            src="/assets/icons/leon-cares-eclinic_logo_white-01.png"
            height={32}
            width={162}
            alt="logo"
            className="h-12 w-fit"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
