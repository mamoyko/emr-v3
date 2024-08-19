import { ToastProvider } from "@radix-ui/react-toast";
import React, { useState } from "react";

import {
  SnackAction,
  SnackBar,
  SnackDescription,
  SnackTitle,
  SnackViewport,
} from "@/components/ui/snackbar";

const SnackbarFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  console.log("isOpen", isOpen);
  return (
    <div className="size-full border-white">
      <button
        onClick={() => {
          handleOpen();
          console.log("working", isOpen);
        }}
      >
        Show Snackbar
      </button>
      <SnackBar open={isOpen} onOpenChange={handleClose}>
        <SnackTitle>Success</SnackTitle>
        <SnackDescription>
          This is a sabdanmsbdsabdasmndsavda dvsaj dsadv sadvnsadvsa dad
          message.
        </SnackDescription>
        <SnackAction asChild altText="Close">
          <button onClick={handleClose}>Close</button>
        </SnackAction>
        <SnackViewport />
      </SnackBar>
    </div>
  );
};

export default SnackbarFn;
