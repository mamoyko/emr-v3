"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import UseRouting from "@/components/helperFunctions/UseRouting";
import SubmitButton from "@/components/SubmitButton";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import { createEncounter } from "@/lib/actions/encounters.action";
import { getEncounterSchema } from "@/lib/validation";

import CustomFormField, { FormFieldType } from "../../CustomFormField";

import "react-datepicker/dist/react-datepicker.css";

interface EncounterDetail {
  value: string;
  label: string;
  type?: "input" | "textarea" | "datetime-local";
}

const ENCOUNTER_DETAILS_FIELDS: EncounterDetail[] = [
  { value: "primaryPhysician", label: "Physician" },
  { value: "date_and_time", label: "Date and Time", type: "datetime-local" },
  { value: "patient", label: "Patient" },
  { value: "encounter_type", label: "Encounter Type" },
  { value: "location", label: "Location", type: "textarea" },
  { value: "reason", label: "Reason", type: "textarea" },
];

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date).replace(",", "");
};

const EncountersAddPatientPage: React.FC = ({
  type = "create",
}: {
  type?: string;
}) => {
  const router = useRouter();
  const EncountertFormValidation = getEncounterSchema(type);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof EncountertFormValidation>>({
    resolver: zodResolver(EncountertFormValidation),
    defaultValues: {
      primaryPhysician: "",
      date_and_time: new Date(Date.now()),
      patient: "",
      encounter_type: "",
      location: "",
      reason: "",
    },
  });

  const methods = useForm({
    defaultValues: ENCOUNTER_DETAILS_FIELDS.reduce(
      (acc, field) => {
        acc[field.value] = "";
        return acc;
      },
      {} as Record<string, string>
    ),
  });

  const { handleSubmit, control, reset } = methods;

  const onSubmit = async (values: z.infer<typeof EncountertFormValidation>) => {
    setIsLoading(true);

    try {
      if (type === "create") {
        const encounters = {
          primaryPhysician: values.primaryPhysician,
          date_and_time: new Date(values.date_and_time),
          patient: "",
          encounter_type: values.encounter_type,
          reason: values.reason!,
          location: values.location,
        };
        const newEncounter = await createEncounter(encounters);
        if (newEncounter) {
          form.reset();
          router.push(`/admin/encounters`);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Doctor"
          placeholder="Select a doctor"
        >
          {Doctors.map((doctor, i) => (
            <SelectItem key={doctor.name + i} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt="doctor"
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="date_and_time"
          label="Date and time"
          showTimeSelect
          dateFormat="MM/dd/yyyy  -  h:mm aa"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="Patients"
          label="Patient name"
          placeholder="Patient name"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="encounter_type"
          label="Encounter type"
          placeholder="Encounter type"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="location"
          label="Location"
          placeholder="Location"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="reason"
          label="Reason"
          placeholder="Reason"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default EncountersAddPatientPage;
