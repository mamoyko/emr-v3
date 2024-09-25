"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";

import { handleDateFormat } from "@/components/helperComponent/helperDate/dateHelper";
import { useResponse } from "@/components/helperComponent/helperResponse/ResponseComponentHelper";
import { SkeletonGeneric } from "@/components/helperComponent/SkeletonComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updatePatient } from "@/lib/actions/patient.actions";
import { cn } from "@/lib/utils";

import { DetailComponentControllable } from "../PatientProfileInfoHelper";

const PatientInfoV1Component = ({ dataCollection }) => {
  const { error, success } = useResponse();
  const [patientInfo, setPatientInfo] = useState<any>({});
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
    <Card className="flex w-full flex-col gap-5">
      <CardHeader
        className="flex flex-row items-center gap-5"
        style={{
          border: "1px solid white",
          // width: "50%"
        }}
      >
        <Avatar
          className="flex size-40 items-center justify-center overflow-hidden rounded-full"
          style={{ border: "1px solid white" }}
        >
          <AvatarImage
            src={dataCollection?.avatarUrl}
            alt={dataCollection?.name}
          />
          <AvatarFallback>
            {dataCollection?.name ??
              ""
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{dataCollection?.name}</CardTitle>
          <CardDescription>{dataCollection?.role ?? "Patient"}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex size-full flex-col items-start justify-start gap-5 bg-gradient-to-r lg:flex-row">
        <span className="size-full items-center justify-center space-y-2 text-center lg:py-1 lg:text-left">
          <p className="py-2 text-start text-xl font-bold">Patient Details</p>
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
          ].map((item, index) => (
            <DetailComponentControllable
              key={index}
              item={item}
              articleClass={"w-full flex-col md:flex-row"}
              valueClass="w-full"
            />
          ))}
        </span>
        <span className="size-full items-center justify-center space-y-2 text-center lg:py-1 lg:text-left">
          <p className="py-2 text-start text-xl font-bold">Emergency Contact</p>
          {[
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
      </CardContent>
    </Card>
  );
};

export default PatientInfoV1Component;
