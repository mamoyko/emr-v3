"use client";

import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface FormData {
  symptom_description: string;
  duration: string;
  severity: string;
  onset: string;
  aggravating_factors: string;
  relieving_factors: string;
  patient: string;
}

const ENCOUNTER_DETAILS_FIELDS: Array<{
  value: keyof FormData;
  label: string;
  type: "input" | "textarea";
}> = [
  {
    value: "symptom_description",
    label: "Symptom Description",
    type: "textarea",
  },
  { value: "duration", label: "Duration", type: "input" },
  { value: "severity", label: "Severity", type: "input" },
  { value: "onset", label: "Onset", type: "input" },
  {
    value: "aggravating_factors",
    label: "Aggravating Factors",
    type: "textarea",
  },
  { value: "relieving_factors", label: "Relieving Factors", type: "textarea" },
  { value: "patient", label: "Patient", type: "input" },
];

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
        <div className="w-full overflow-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <FormItem>
                <FormLabel htmlFor="patient">Patient</FormLabel>
                <Controller
                  name="patient"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <input
                        {...field}
                        id="patient"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                        required
                      />
                    </FormControl>
                  )}
                />
              </FormItem>
            </div>

            {ENCOUNTER_DETAILS_FIELDS.map(({ value, label, type }) => (
              <FormItem key={value} className="flex flex-col">
                <FormLabel htmlFor={value}>{label}</FormLabel>
                <Controller
                  name={value}
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      {type === "textarea" ? (
                        <textarea
                          {...field}
                          id={value}
                          rows={2}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                          required
                        />
                      ) : (
                        <input
                          {...field}
                          id={value}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                          required
                        />
                      )}
                    </FormControl>
                  )}
                />
              </FormItem>
            ))}

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

export default EncounterSymptoms;
