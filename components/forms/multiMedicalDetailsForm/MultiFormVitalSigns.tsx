"use client";

import React from "react";
import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
} from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";

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
  vitalSigns: VitalSigns[];
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

interface MultiFormVitalSignsProps {
  mode: string; // "view" or "edit"
  initialValue?: VitalSigns[];
}

const MultiFormVitalSigns: React.FC<MultiFormVitalSignsProps> = ({
  mode,
  initialValue = [],
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      vitalSigns:
        mode === "view" || initialValue.length > 0
          ? initialValue
          : [
              {
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
            ],
    },
  });

  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    name: "vitalSigns",
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
                  <CustomFormField
                    control={control}
                    name={`vitalSigns.${index}.patient`}
                    label="Patient"
                    fieldType={FormFieldType.INPUT}
                    disabled={mode === "view"}
                  />
                </div>

                {PATIENT_DETAILS_FIELDS.map(({ value, label, type }) => (
                  <CustomFormField
                    key={value}
                    control={control}
                    name={`vitalSigns.${index}.${value}`}
                    label={label}
                    fieldType={type}
                    disabled={mode === "view"}
                  />
                ))}

                {mode === "edit" && (
                  <div className="flex justify-end md:col-span-2">
                    <button
                      type="button"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                      className={`shad-remove-btn w-full px-4 py-2 md:w-1/4 ${
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
              <div className="mt-4 flex justify-end space-x-5">
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      blood_pressure: "",
                      heart_rate: "",
                      respiratory_rate: "",
                      temperature: "",
                      oxygen_saturation: "",
                      weight: "",
                      height: "",
                      body_mass_index: "",
                      patient: "",
                    })
                  }
                  className="shad-primary-btn"
                >
                  Add Form Set
                </Button>
                <Button type="submit" className="shad-submit-btn">
                  Submit
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default MultiFormVitalSigns;
