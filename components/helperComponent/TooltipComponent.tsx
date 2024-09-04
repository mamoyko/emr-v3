import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const ToolTipControlled = ({
  ComponentTrigger,
  children,
  toolTipTools = { defaultOpen: false },
}) => {
  const [tooltipAction, setTooltipAction] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip
        open={tooltipAction}
        defaultOpen={toolTipTools.defaultOpen}
        onOpenChange={() => {
          setTooltipAction((prev) => !prev);
        }}
      >
        <TooltipTrigger asChild>{ComponentTrigger}</TooltipTrigger>
        <TooltipContent className="bg-zinc-700">{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
