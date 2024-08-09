import React, { useState } from "react";

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
};

const DialogCellComponent: React.FC<DialogCellComponentProps> = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 p-6">
      <Button
        variant="ghost"
        className="capitalize text-rose-500"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        View
      </Button>
      <CommandDialog
        open={isOpen}
        onOpenChange={() => setIsOpen((prev) => !prev)}
      >
        <DialogContent className="flex h-[80vh] w-[80vw] flex-col sm:h-[70vh] sm:w-[70vw] md:h-[60vh] md:w-[60vw] lg:h-[50vh] lg:w-[50vw] xl:h-[40vh] xl:w-[40vw]">
          <DialogHeader>
            <DialogTitle>{`${row.name} medical details`}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="grow overflow-auto">
            <p>
              Content goes here. You can make this section scrollable if the
              content overflows.
            </p>
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
