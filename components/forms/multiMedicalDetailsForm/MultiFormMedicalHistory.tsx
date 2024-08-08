"use client";

import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

interface FormData {
  past_medical_conditions: string;
  past_surgical_history: string;
  current_medications: string;
  allergies: string;
  immunization_history: string;
  family_medical_history: string;
}

const PATIENT_DETAILS_FIELDS: {
  value: keyof FormData;
  label: string;
}[] = [
  { value: "past_medical_conditions", label: "Past Medical Conditions" },
  { value: "past_surgical_history", label: "Past Surgical History" },
  { value: "current_medications", label: "Current Medications" },
  { value: "allergies", label: "Allergies" },
  { value: "immunization_history", label: "Immunization History" },
  { value: "family_medical_history", label: "Family Medical History" },
];

interface MultiFormMedicalHistoryProps {
  mode: string; // "view" or "edit"
  initialValue?: FormData[];
}

const MultiFormMedicalHistory: React.FC<MultiFormMedicalHistoryProps> = ({
  mode,
  initialValue,
}) => {
  const methods = useForm<{ formSets: FormData[] }>({
    defaultValues: {
      formSets: initialValue || [
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
    name: "formSets",
    control,
  });

  const onSubmit = (data: { formSets: FormData[] }) => {
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
                  {PATIENT_DETAILS_FIELDS.map(({ value, label }) => (
                    <CustomFormField
                      key={value}
                      control={control}
                      name={`formSets.${index}.${value}`}
                      label={label}
                      fieldType={FormFieldType.TEXTAREA}
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
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default MultiFormMedicalHistory;
