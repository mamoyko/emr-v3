"use client";

import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

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
  type: FormFieldType;
}> = [
  {
    value: "symptom_description",
    label: "Symptom Description",
    type: FormFieldType.TEXTAREA,
  },
  { value: "duration", label: "Duration", type: FormFieldType.INPUT },
  { value: "severity", label: "Severity", type: FormFieldType.INPUT },
  { value: "onset", label: "Onset", type: FormFieldType.INPUT },
  {
    value: "aggravating_factors",
    label: "Aggravating Factors",
    type: FormFieldType.TEXTAREA,
  },
  {
    value: "relieving_factors",
    label: "Relieving Factors",
    type: FormFieldType.TEXTAREA,
  },
  { value: "patient", label: "Patient", type: FormFieldType.INPUT },
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
      symptoms: initialValue || [
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
              <div key={field.id} className="rounded-md border p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">
                  Form Set {index + 1}
                </h3>
                <div className="mb-4">
                  <CustomFormField
                    control={control}
                    name={`symptoms.${index}.patient`}
                    label="Patient"
                    fieldType={FormFieldType.INPUT}
                    disabled={mode === "view"}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {ENCOUNTER_DETAILS_FIELDS.filter(
                    (field) => field.value !== "patient"
                  ).map(({ value, label, type }) => (
                    <CustomFormField
                      key={value}
                      control={control}
                      name={`symptoms.${index}.${value}`}
                      label={label}
                      fieldType={type}
                      disabled={mode === "view"}
                    />
                  ))}
                </div>
                {mode === "edit" && (
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                      className={`w-full rounded-md px-4 py-2 text-white md:w-1/4 ${
                        fields.length === 1
                          ? "cursor-not-allowed bg-gray-500"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
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
