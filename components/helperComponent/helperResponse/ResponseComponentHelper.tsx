"use client";

import React from "react";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toaster/use-toast";

interface ToastOptions {
  title: string;
  description?: string;
  actionText?: string;
  actionAltText?: string;
  variant?: "default" | "error" | "success" | "info" | "warning";
}

const useToastHandler = () => {
  const { toast } = useToast();

  const showToast = ({
    title,
    description,
    actionText,
    actionAltText,
    variant,
  }: ToastOptions) => {
    toast({
      title,
      description,
      variant,
      action: actionText ? (
        <ToastAction altText={actionAltText || "Undo"}>
          {actionText}
        </ToastAction>
      ) : undefined,
    });
  };

  return { showToast };
};

export const useResponse = () => {
  const { showToast } = useToastHandler();

  const error = (message = "") => {
    showToast({
      title: "Error",
      description: message,
      variant: "error",
    });
  };

  const success = (message = "") => {
    showToast({
      title: "Success",
      description: message,
      variant: "success",
    });
  };

  const warning = (message = "") => {
    showToast({
      title: "Warning",
      description: message,
      variant: "warning",
    });
  };

  const info = (message = "") => {
    showToast({
      title: "Info",
      description: message,
      variant: "info",
    });
  };

  return { error, success, info, warning };
};

export const useResponseAction = () => {
  const { showToast } = useToastHandler();

  const errorAction = (description = "") => {
    showToast({
      title: "Error",
      description,
      actionText: "Retry",
      actionAltText: "Retry the action",
    });
  };

  const successAction = (description = "") => {
    showToast({
      title: "Success",
      description,
      actionText: "View",
      actionAltText: "View details",
    });
  };

  return { errorAction, successAction };
};
