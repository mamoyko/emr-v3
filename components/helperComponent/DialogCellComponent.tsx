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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <Button
        variant="ghost"
        className="capitalize text-rose-500"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Medical Details
      </Button>
      <CommandDialog
        open={isOpen}
        onOpenChange={() => setIsOpen((prev) => !prev)}
      >
        <DialogContent
          style={{ ...dialogStyle, display: "flex", flexDirection: "column" }}
        >
          <DialogHeader className="pl-4 pt-4">
            <DialogTitle>{ComponentDialogTitle}</DialogTitle>
          </DialogHeader>
          <DialogDescription
            className="flex grow flex-col overflow-auto"
            style={{ alignItems: "flex-start" }}
          >
            {ComponentDialogDescription}
          </DialogDescription>
          <DialogFooter className="pb-4 pr-4">
            <Button
              onClick={() => setIsOpen(false)}
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
