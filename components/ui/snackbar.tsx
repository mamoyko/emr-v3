"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import React from "react";

import { cn } from "@/lib/utils";

const SnackBar = ToastPrimitive.Root;

const SnackTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn("font-semibold text-lg", className)}
    {...props}
  />
));
SnackTitle.displayName = ToastPrimitive.Title.displayName;

const SnackDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-600 dark:text-gray-300", className)}
    {...props}
  />
));
SnackDescription.displayName = ToastPrimitive.Description.displayName;

const SnackAction = ToastPrimitive.Action;

const SnackViewport = ToastPrimitive.Viewport;

export { SnackBar, SnackTitle, SnackDescription, SnackAction, SnackViewport };
