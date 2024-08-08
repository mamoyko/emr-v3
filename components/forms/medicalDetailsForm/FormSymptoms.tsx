"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";

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
  symptoms: Symptom;
}

const PATIENT_DETAILS_FIELDS: Array<{
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
];

interface FormSymptomsProps {
  mode: string; // "view" or "edit"
  initialValue?: Symptom;
}

const FormSymptoms: React.FC<FormSymptomsProps> = ({
  mode,
  initialValue = {
    symptom_description: "",
    duration: "",
    severity: "",
    onset: "",
    aggravating_factors: "",
    relieving_factors: "",
    patient: "",
  },
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      symptoms: initialValue,
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-md border p-4 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Symptom Details</h3>
              <div className="mb-4">
                <CustomFormField
                  control={control}
                  name="symptoms.patient"
                  label="Patient"
                  fieldType={FormFieldType.INPUT}
                  disabled={mode === "view"}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {PATIENT_DETAILS_FIELDS.map(({ value, label, type }) => (
                  <CustomFormField
                    key={value}
                    control={control}
                    name={`symptoms.${value}`}
                    label={label}
                    fieldType={type}
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

export default FormSymptoms;
