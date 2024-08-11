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

import useWindowDimension from "../helperFunctions/useWindowDimension";

type DialogCellComponentProps = {
  row: any;
  children: ReactNode;
};

const DialogCellComponent: React.FC<DialogCellComponentProps> = ({
  row,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { height } = useWindowDimension();

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
        <DialogContent style={{ height: height ? `${height - 50}px` : "auto" }}>
          <DialogHeader>
            <DialogTitle>{`${row?.patient?.name} medical details`}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="grow overflow-auto">
            {children}
          </DialogDescription>
          <DialogFooter className="mt-auto">
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
