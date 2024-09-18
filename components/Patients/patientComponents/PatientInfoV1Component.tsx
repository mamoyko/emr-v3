"use client";

import { useEffect, useState } from "react";

import { handleDateFormat } from "@/components/helperComponent/helperDate/dateHelper";
import { useResponse } from "@/components/helperComponent/helperResponse/ResponseComponentHelper";
import { updatePatient } from "@/lib/actions/patient.actions";

import { DetailComponentControllable } from "../patientMedicalDetailsTable/PatientProfileInfoHelper";

const PatientInfoV1Component = ({ dataCollection }) => {
  const { error, success } = useResponse();
  const [patientInfo, setPatientInfo] = useState<any>({});
  const [dialogAction, setDialogAction] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updatePatientInfo = async (patientId: string, patientData: any) => {
    setIsLoading(true);
    const response = await updatePatient(patientId, patientData);
    if (response.ok) {
      setPatientInfo(response?.data);
      success(response.message || "");
    } else {
      error(response.message || "");
    }
    setIsLoading(false);
  };

  return (
    <figure className="flex size-full flex-col rounded-lg bg-gradient-to-r p-1">
      <span className="size-full space-y-2 text-center lg:px-8 lg:py-1 lg:text-left">
        {[
          { label: "Address", value: dataCollection?.address || "" },
          { label: "Contact no.", value: dataCollection?.phone || "" },
          { label: "Email", value: dataCollection?.email || "" },
          { label: "Gender", value: dataCollection?.gender || "" },
          { label: "Occupation", value: dataCollection?.occupation || "" },
          {
            label: "Birth Date",
            value: handleDateFormat(dataCollection?.birthDate) || "",
          },
          {
            label: "Emergency Contact",
            value: dataCollection?.emergencyContactName || "",
          },
          {
            label: "Emergency Contact no.",
            value: dataCollection?.emergencyContactNumber || "",
          },
        ].map((item, index) => (
          <DetailComponentControllable
            key={index}
            item={item}
            articleClass={"w-full flex-col md:flex-row"}
            valueClass="w-full"
          />
        ))}
      </span>
    </figure>
  );
};

export default PatientInfoV1Component;
