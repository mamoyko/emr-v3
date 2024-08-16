import React, { Fragment, ReactNode, useState } from "react";

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

const DialogCellComponent: React.FC<DialogCellComponentProps> = ({
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
        className="rounded-md bg-gradient-to-r from-lime-100 via-lime-500 to-lime-100 p-1 text-xs font-medium text-gray-900 shadow-rose-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-lime-300 dark:shadow-lg dark:shadow-rose-800/80 dark:focus:ring-green-800"
        onClick={handleState}
      >
        View Details
      </button>
      <CommandDialog open={isOpen} onOpenChange={handleState}>
        <DialogContent
          style={{ ...dialogStyle, display: "flex", flexDirection: "column" }}
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

export default DialogCellComponent;
