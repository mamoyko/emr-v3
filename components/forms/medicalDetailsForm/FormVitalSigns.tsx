"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

interface VitalSigns {
  blood_pressure: string;
  heart_rate: string;
  respiratory_rate: string;
  temperature: string;
  oxygen_saturation: string;
  weight: string;
  height: string;
  body_mass_index: string;
  patient: string;
}

interface FormData {
  vitalSigns: VitalSigns;
}

const PATIENT_DETAILS_FIELDS: Array<{
  value: keyof VitalSigns;
  label: string;
  type: FormFieldType;
}> = [
  {
    value: "blood_pressure",
    label: "Blood Pressure",
    type: FormFieldType.INPUT,
  },
  { value: "heart_rate", label: "Heart Rate", type: FormFieldType.INPUT },
  {
    value: "respiratory_rate",
    label: "Respiratory Rate",
    type: FormFieldType.INPUT,
  },
  { value: "temperature", label: "Temperature", type: FormFieldType.INPUT },
  {
    value: "oxygen_saturation",
    label: "Oxygen Saturation",
    type: FormFieldType.INPUT,
  },
  { value: "weight", label: "Weight", type: FormFieldType.INPUT },
  { value: "height", label: "Height", type: FormFieldType.INPUT },
  {
    value: "body_mass_index",
    label: "Body Mass Index (BMI)",
    type: FormFieldType.INPUT,
  },
];

interface FormVitalSignsProps {
  mode: string; // "view" or "edit"
  initialValue?: VitalSigns;
}

const FormVitalSigns: React.FC<FormVitalSignsProps> = ({
  mode,
  initialValue = {
    blood_pressure: "",
    heart_rate: "",
    respiratory_rate: "",
    temperature: "",
    oxygen_saturation: "",
    weight: "",
    height: "",
    body_mass_index: "",
    patient: "",
  },
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      vitalSigns: initialValue,
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
            <div className="grid grid-cols-1 gap-4 rounded-md border p-4 shadow-sm md:grid-cols-2">
              <div className="md:col-span-2">
                <h3 className="mb-4 text-lg font-semibold">Vital Signs</h3>
                <CustomFormField
                  control={control}
                  name="vitalSigns.patient"
                  label="Patient"
                  fieldType={FormFieldType.INPUT}
                  disabled={mode === "view"}
                />
              </div>

              {PATIENT_DETAILS_FIELDS.map(({ value, label, type }) => (
                <CustomFormField
                  key={value}
                  control={control}
                  name={`vitalSigns.${value}`}
                  label={label}
                  fieldType={type}
                  disabled={mode === "view"}
                />
              ))}
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

export default FormVitalSigns;
