import React, { Fragment, ReactNode, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CommandDialog } from "@/components/ui/command";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DialogCellComponentProps = {
  row: any;
  ComponentDialogDescription: ReactNode;
  ComponentDialogTitle: ReactNode;
  dialogStyle: any;
};

type DialogGenericComponentProps = {
  row: any;
  ComponentDialogDescription: ReactNode;
  ComponentDialogTitle: ReactNode;
  dialogStyle: any;
  DialogComponentView: ReactNode;
  dialogInAction: any;
};

export const DialogCellComponent: React.FC<DialogCellComponentProps> = ({
  row,
  ComponentDialogDescription,
  ComponentDialogTitle,
  dialogStyle,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleState = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Fragment>
      <button
        type="button"
        className="border-none bg-transparent text-orange-100 hover:text-orange-500"
        onClick={handleState}
      >
        View Details
      </button>

      <CommandDialog open={isOpen} onOpenChange={handleState}>
        <DialogContent
          style={{
            ...dialogStyle,
            spacing: "",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogHeader className="pb-6 pt-4">
            <DialogTitle>{ComponentDialogTitle}</DialogTitle>
            <div className="w-full border" />
          </DialogHeader>
          <DialogDescription
            className="flex grow flex-col overflow-auto"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            {ComponentDialogDescription}
          </DialogDescription>
          <DialogFooter className="pb-4 pr-4">
            <Button
              onClick={handleState}
              type="button"
              variant="secondary"
              size="sm"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </CommandDialog>
    </Fragment>
  );
};

export const DialogGenericComponent: React.FC<DialogGenericComponentProps> = ({
  row,
  ComponentDialogDescription,
  ComponentDialogTitle,
  dialogStyle,
  DialogComponentView,
  dialogInAction = {
    isInAction: false,
    isOpenDialog: false,
    handleDialogAction: () => {},
  },
}) => {
  return (
    <Fragment>
      {DialogComponentView && DialogComponentView}
      <CommandDialog
        open={dialogInAction.isOpenDialog}
        onOpenChange={() =>
          dialogInAction.handleDialogAction(!dialogInAction.isOpenDialog)
        }
      >
        <DialogContent
          style={{
            ...dialogStyle,
            spacing: "",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogHeader className="pb-6 pt-4">
            <DialogTitle>{ComponentDialogTitle}</DialogTitle>
            <div className="w-full border" />
          </DialogHeader>
          <DialogDescription
            className="flex grow flex-col overflow-auto"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            {ComponentDialogDescription}
          </DialogDescription>
          <DialogFooter className="pb-4 pr-4">
            <Button
              onClick={() => {
                dialogInAction.handleDialogAction(!dialogInAction.isOpenDialog);
              }}
              type="button"
              variant="secondary"
              size="sm"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </CommandDialog>
    </Fragment>
  );
};
