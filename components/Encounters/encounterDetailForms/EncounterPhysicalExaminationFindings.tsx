"use client";

import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

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

interface EncounterField {
  value: keyof FormData;
  label: string;
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
      <div className="flex items-start justify-center">
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2"
          >
            {ENCOUNTER_DETAILS_FIELDS.map(
              ({ value, label }: EncounterField) => (
                <FormItem key={value} className="col-span-1">
                  <FormLabel htmlFor={value}>{label}</FormLabel>
                  <Controller
                    name={value}
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <textarea
                          id={value}
                          {...field}
                          rows={2}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                          required
                        />
                      </FormControl>
                    )}
                  />
                </FormItem>
              )
            )}
            <div className="flex justify-end md:col-span-2">
              <button
                type="submit"
                className="w-1/4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default EncounterPhysicalExaminationFindings;

const ENCOUNTER_DETAILS_FIELDS: EncounterField[] = [
  { value: "general_appearance", label: "General Appearance" },
  { value: "head_and_neck", label: "Head and Neck" },
  { value: "cardiovascular_system", label: "Cardiovascular System" },
  { value: "respiratory_system", label: "Respiratory System" },
  { value: "gastrointestinal_system", label: "Gastrointestinal System" },
  { value: "genitourinary_system", label: "Genitourinary System" },
  { value: "musculoskeletal", label: "Musculoskeletal" },
  { value: "neurological_system", label: "Neurological System" },
  { value: "skin", label: "Skin" },
];
