import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

import { CardTitle } from "@/components/ui/card";

const PatientDetailsComponent = () => {
  return (
    <div>
      <Avatar className="size-20">
        <AvatarImage alt="Patient" src="/placeholder.svg?height=80&width=80" />
        <AvatarFallback>SR</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle className="text-2xl text-white">Shawn Robertson</CardTitle>
        <p className="text-gray-400">
          Bloodtype: AB+ Height: 72.83 in Weight: 198 lb
        </p>
      </div>
    </div>
  );
};

export default PatientDetailsComponent;
