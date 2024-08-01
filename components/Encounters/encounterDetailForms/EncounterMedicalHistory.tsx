"use client";

import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface FormData {
  past_medical_conditions: string;
  past_surgical_history: string;
  current_medications: string;
  allergies: string;
  immunization_history: string;
  family_medical_history: string;
}

const EncounterMedicalHistory: React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      past_medical_conditions: "",
      past_surgical_history: "",
      current_medications: "",
      allergies: "",
      immunization_history: "",
      family_medical_history: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-start justify-center">
        <div className="h-[400px] w-[1150px] overflow-auto">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
          >
            {ENCOUNTER_DETAILS_FIELDS.map(({ name, label }: any) => (
              <FormItem key={name} className="flex flex-col">
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Controller
                  name={name}
                  control={methods.control}
                  render={({ field }) => (
                    <FormControl>
                      <textarea
                        {...field}
                        id={name}
                        rows={2}
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
              className="col-span-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default EncounterMedicalHistory;

const ENCOUNTER_DETAILS_FIELDS = [
  {
    name: "past_medical_conditions",
    label: "Past Medical Conditions",
  },
  { name: "past_surgical_history", label: "Past Surgical History" },
  { name: "current_medications", label: "Current Medications" },
  { name: "allergies", label: "Allergies" },
  { name: "immunization_history", label: "Immunization History" },
  { name: "family_medical_history", label: "Family Medical History" },
];
