"use client";

import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form"; // Adjust import path as needed

interface FormData {
  symptom_description: string;
  duration: string;
  severity: string;
  onset: string;
  aggravating_factors: string;
  relieving_factors: string;
  patient: string;
}

const EncounterSymptoms: React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      symptom_description: "",
      duration: "",
      severity: "",
      onset: "",
      aggravating_factors: "",
      relieving_factors: "",
      patient: "",
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-start justify-center">
        <div className="h-[400px] w-[1150px] overflow-auto rounded-lg border border-gray-300 p-4 shadow-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {ENCOUNTER_DETAILS_FIELDS.map(({ name, label, type }: any) => (
              <FormItem key={name} className="col-span-1">
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      {type === "textarea" ? (
                        <textarea
                          {...field}
                          id={name}
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                          required
                        />
                      ) : (
                        <input
                          {...field}
                          id={name}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                          required
                        />
                      )}
                    </FormControl>
                  )}
                />
              </FormItem>
            ))}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 md:col-span-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default EncounterSymptoms;

const ENCOUNTER_DETAILS_FIELDS = [
  {
    name: "symptom_description",
    label: "Symptom Description",
    type: "textarea",
  },
  { name: "duration", label: "Duration", type: "input" },
  { name: "severity", label: "Severity", type: "input" },
  { name: "onset", label: "Onset", type: "input" },
  {
    name: "aggravating_factors",
    label: "Aggravating Factors",
    type: "textarea",
  },
  {
    name: "relieving_factors",
    label: "Relieving Factors",
    type: "textarea",
  },
  { name: "patient", label: "Patient", type: "input" },
];
