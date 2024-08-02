import { Row } from "@tanstack/react-table";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { CommandDialog } from "@/components/ui/command";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Encounters } from "@/types/appwrite.types";

type EncounterDialogCellProps = {
  row: Row<Encounters>;
};

const EncounterDialogPage: React.FC<EncounterDialogCellProps> = ({ row }) => {
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
        <DialogContent className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <DialogHeader>
            <DialogTitle>Encounter Patient Details</DialogTitle>
          </DialogHeader>
          <div className="size-[500px]">
            ,msabajsba abs vasmamsasa a dads f saaslkdjdsdsfdsfdsfsm,fdsf sdsf
            nmds f,mdsn fdsmfdsnmfds fnds fndsf sdfndsfds dsfnmdsj,f dsmfsdf
            dsfkdsfkdsjfdsf s,dfdsfsd mf dsfdsfdsfdsf dfdsfsdfdsf
          </div>
          <DialogFooter>
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

export default EncounterDialogPage;
