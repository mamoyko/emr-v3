"use client";

import React from "react";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface ToastOptions {
  title: string;
  description?: string;
  actionText?: string;
  actionAltText?: string;
}

export const useResponse = () => {
  const { toast } = useToast();

  const showToast = ({
    title,
    description,
    actionText,
    actionAltText,
  }: ToastOptions) => {
    return toast({
      title,
      description,
      action: actionText ? (
        <ToastAction altText={actionAltText || "Undo"}>
          {actionText}
        </ToastAction>
      ) : undefined,
    });
  };

  const error = () => {
    showToast({
      title: "Error",
      // description: "An error occurred. Please try again.",
      // actionText: "Retry",
      // actionAltText: "Retry the action",
    });
  };

  const success = () => {
    showToast({
      title: "Success",
      // description: "The operation was successful.",
      // actionText: "View",
      // actionAltText: "View details",
    });
  };

  return { error, success };
};
