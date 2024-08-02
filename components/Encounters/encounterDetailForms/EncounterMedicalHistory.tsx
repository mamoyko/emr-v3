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
interface EncounterField {
  value: keyof FormData;
  label: string;
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
        <div className="h-[400px] w-[1150px] overflow-auto p-5">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
          >
            {ENCOUNTER_DETAILS_FIELDS.map(
              ({ value, label }: EncounterField) => (
                <FormItem key={value} className="flex flex-col">
                  <FormLabel htmlFor={value}>{label}</FormLabel>
                  <Controller
                    name={value}
                    control={methods.control}
                    render={({ field }) => (
                      <FormControl>
                        <textarea
                          {...field}
                          id={value}
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

export default EncounterMedicalHistory;

const ENCOUNTER_DETAILS_FIELDS: EncounterField[] = [
  { value: "past_medical_conditions", label: "Past Medical Conditions" },
  { value: "past_surgical_history", label: "Past Surgical History" },
  { value: "current_medications", label: "Current Medications" },
  { value: "allergies", label: "Allergies" },
  { value: "immunization_history", label: "Immunization History" },
  { value: "family_medical_history", label: "Family Medical History" },
];
