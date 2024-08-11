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
  children: ReactNode;
};

const DialogCellComponent: React.FC<DialogCellComponentProps> = ({
  row,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("=====", row);
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
        <DialogContent className="flex h-[80vh] w-[80vw] flex-col sm:h-[70vh] sm:w-[70vw] md:h-[60vh] md:w-[60vw] lg:h-[50vh] lg:w-[50vw] xl:h-[40vh] xl:w-[40vw]">
          <DialogHeader>
            <DialogTitle>{` medical details`}</DialogTitle>
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
