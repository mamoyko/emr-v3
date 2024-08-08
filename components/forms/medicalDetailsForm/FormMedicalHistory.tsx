"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

interface FormData {
  past_medical_conditions: string;
  past_surgical_history: string;
  current_medications: string;
  allergies: string;
  immunization_history: string;
  family_medical_history: string;
}

const PATIENT_DETAILS_FIELDS: Array<{
  value: keyof FormData;
  label: string;
}> = [
  { value: "past_medical_conditions", label: "Past Medical Conditions" },
  { value: "past_surgical_history", label: "Past Surgical History" },
  { value: "current_medications", label: "Current Medications" },
  { value: "allergies", label: "Allergies" },
  { value: "immunization_history", label: "Immunization History" },
  { value: "family_medical_history", label: "Family Medical History" },
];

interface FormMedicalHistoryProps {
  mode: string; // "view" or "edit"
  initialValue?: FormData;
}

const FormMedicalHistory: React.FC<FormMedicalHistoryProps> = ({
  mode,
  initialValue = {
    past_medical_conditions: "",
    past_surgical_history: "",
    current_medications: "",
    allergies: "",
    immunization_history: "",
    family_medical_history: "",
  },
}) => {
  const methods = useForm<{ formData: FormData }>({
    defaultValues: {
      formData: initialValue,
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data: { formData: FormData }) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-start justify-center">
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-md border p-4 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Medical History</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {PATIENT_DETAILS_FIELDS.map(({ value, label }) => (
                  <CustomFormField
                    key={value}
                    control={control}
                    name={`formData.${value}`}
                    label={label}
                    fieldType={FormFieldType.TEXTAREA}
                    disabled={mode === "view"}
                  />
                ))}
              </div>
            </div>
            {mode === "edit" && (
              <div className="mt-4 flex justify-end">
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

export default FormMedicalHistory;
