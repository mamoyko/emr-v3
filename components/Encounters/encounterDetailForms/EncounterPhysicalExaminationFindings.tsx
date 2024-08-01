"use client";

import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import {
  // FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form"; // Adjust import path as needed

interface FormData {
  general_appearance: string;
  head_and_neck: string;
  cardiovascular_system: string;
  respiratory_system: string;
  gastrointestinal_system: string;
  genitourinary_system: string;
  musculoskeletal: string;
  neurological_system: string;
  skin: string;
}

const EncounterPhysicalExaminationFindings: React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      general_appearance: "",
      head_and_neck: "",
      cardiovascular_system: "",
      respiratory_system: "",
      gastrointestinal_system: "",
      genitourinary_system: "",
      musculoskeletal: "",
      neurological_system: "",
      skin: "",
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-md rounded-lg border border-gray-300 p-4 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">
          Physical Examination Findings
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {ENCOUNTER_DETAILS_FIELDS.map(({ name, label }: any) => (
            <FormItem key={name}>
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <textarea
                      id={name}
                      {...field}
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                      required
                    />
                  </FormControl>
                )}
              />
            </FormItem>
          ))}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default EncounterPhysicalExaminationFindings;

const ENCOUNTER_DETAILS_FIELDS = [
  { name: "general_appearance", label: "General Appearance" },
  { name: "head_and_neck", label: "Head and Neck" },
  { name: "cardiovascular_system", label: "Cardiovascular System" },
  { name: "respiratory_system", label: "Respiratory System" },
  {
    name: "gastrointestinal_system",
    label: "Gastrointestinal System",
  },
  { name: "genitourinary_system", label: "Genitourinary System" },
  { name: "musculoskeletal", label: "Musculoskeletal" },
  { name: "neurological_system", label: "Neurological System" },
  { name: "skin", label: "Skin" },
];
