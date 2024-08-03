"use client";

import React from "react";
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray,
} from "react-hook-form";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface MedicalHistory {
  past_medical_conditions: string;
  past_surgical_history: string;
  current_medications: string;
  allergies: string;
  immunization_history: string;
  family_medical_history: string;
}

interface FormData {
  medicalHistories: MedicalHistory[];
}

const ENCOUNTER_DETAILS_FIELDS: {
  value: keyof MedicalHistory;
  label: string;
}[] = [
  { value: "past_medical_conditions", label: "Past Medical Conditions" },
  { value: "past_surgical_history", label: "Past Surgical History" },
  { value: "current_medications", label: "Current Medications" },
  { value: "allergies", label: "Allergies" },
  { value: "immunization_history", label: "Immunization History" },
  { value: "family_medical_history", label: "Family Medical History" },
];

const EncounterMedicalHistory: React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      medicalHistories: [
        {
          past_medical_conditions: "",
          past_surgical_history: "",
          current_medications: "",
          allergies: "",
          immunization_history: "",
          family_medical_history: "",
        },
      ],
    },
  });

  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    name: "medicalHistories",
    control,
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-start justify-center">
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-md border p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">
                  Form Set {index + 1}
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {ENCOUNTER_DETAILS_FIELDS.map(({ value, label }) => (
                    <FormItem key={value} className="flex flex-col">
                      <FormLabel htmlFor={`${value}-${index}`}>
                        {label}
                      </FormLabel>
                      <Controller
                        name={`medicalHistories.${index}.${value}` as const}
                        control={control}
                        render={({ field }) => (
                          <FormControl>
                            <textarea
                              {...field}
                              id={`${value}-${index}`}
                              rows={2}
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                              required
                            />
                          </FormControl>
                        )}
                      />
                    </FormItem>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 md:w-1/4"
                  >
                    Remove Form Set
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  append({
                    past_medical_conditions: "",
                    past_surgical_history: "",
                    current_medications: "",
                    allergies: "",
                    immunization_history: "",
                    family_medical_history: "",
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
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default EncounterMedicalHistory;
