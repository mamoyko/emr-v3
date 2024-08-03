"use client";

import React from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface Symptom {
  symptom_description: string;
  duration: string;
  severity: string;
  onset: string;
  aggravating_factors: string;
  relieving_factors: string;
  patient: string;
}

interface FormData {
  symptoms: Symptom[];
}

const ENCOUNTER_DETAILS_FIELDS: Array<{
  value: keyof Symptom;
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

interface EncounterSymptomsProps {
  mode: string; // "view" or "edit"
  initialValue?: Symptom[];
}

const EncounterSymptoms: React.FC<EncounterSymptomsProps> = ({
  mode,
  initialValue = [],
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      symptoms: initialValue.length
        ? initialValue
        : [
            {
              symptom_description: "",
              duration: "",
              severity: "",
              onset: "",
              aggravating_factors: "",
              relieving_factors: "",
              patient: "",
            },
          ],
    },
  });

  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    name: "symptoms",
    control,
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-start justify-center">
        <div className="w-full overflow-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 gap-4 rounded-md border p-4 shadow-sm md:grid-cols-2"
              >
                <div className="md:col-span-2">
                  <h3 className="mb-4 text-lg font-semibold">
                    Form Set {index + 1}
                  </h3>
                  <FormItem>
                    <FormLabel htmlFor={`patient-${index}`}>Patient</FormLabel>
                    <Controller
                      name={`symptoms.${index}.patient`}
                      control={control}
                      render={({ field }) => (
                        <FormControl>
                          <input
                            {...field}
                            id={`patient-${index}`}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                            required
                            disabled={mode === "view"}
                          />
                        </FormControl>
                      )}
                    />
                  </FormItem>
                </div>

                {ENCOUNTER_DETAILS_FIELDS.map(({ value, label, type }) => (
                  <FormItem key={value} className="flex flex-col">
                    <FormLabel htmlFor={`${value}-${index}`}>{label}</FormLabel>
                    <Controller
                      name={
                        `symptoms.${index}.${value}` as `symptoms.${number}.${keyof Symptom}`
                      }
                      control={control}
                      render={({ field }) => (
                        <FormControl>
                          {type === "textarea" ? (
                            <textarea
                              {...field}
                              id={`${value}-${index}`}
                              rows={2}
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                              required
                              disabled={mode === "view"}
                            />
                          ) : (
                            <input
                              {...field}
                              id={`${value}-${index}`}
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                              required
                              disabled={mode === "view"}
                            />
                          )}
                        </FormControl>
                      )}
                    />
                  </FormItem>
                ))}

                {mode === "edit" && (
                  <div className="flex justify-end md:col-span-2">
                    <button
                      type="button"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                      className={`w-full rounded-md px-4 py-2 text-white md:w-1/4 ${fields.length === 1 ? "cursor-not-allowed bg-gray-500" : "bg-red-500 hover:bg-red-600"}`}
                    >
                      Remove Form Set
                    </button>
                  </div>
                )}
              </div>
            ))}
            {mode === "edit" && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    append({
                      symptom_description: "",
                      duration: "",
                      severity: "",
                      onset: "",
                      aggravating_factors: "",
                      relieving_factors: "",
                      patient: "",
                    })
                  }
                  className="mr-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Add Form Set
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default EncounterSymptoms;
