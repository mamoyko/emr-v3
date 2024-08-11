import React, { ReactNode, useState } from "react";

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
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 p-6">
      <div className="w-full grow justify-start">
        <Button
          variant="ghost"
          className="capitalize text-rose-500"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          View
        </Button>
      </div>
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
    </div>
  );
};

export default DialogCellComponent;
