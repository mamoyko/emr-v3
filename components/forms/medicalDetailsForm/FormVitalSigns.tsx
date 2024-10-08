"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { VitalSignsFormDataSchema } from "@/lib/validation";

const schema = z.object({
  formSets: z.array(VitalSignsFormDataSchema),
});

interface FormData {
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

const ENCOUNTER_DETAILS_FIELDS: Array<{
  value: keyof FormData;
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
  initialValue?: FormData[];
  handleSubmitForm: (dataCollection: any) => Promise<void>;
  isMultiForm: boolean;
  isLoading: boolean;
  userId: string;
}

const FormVitalSigns: React.FC<FormVitalSignsProps> = ({
  mode,
  initialValue = [],
  handleSubmitForm,
  isMultiForm = false,
  isLoading = false,
  userId,
}) => {
  const methods = useForm<{ formSets: FormData[] }>({
    defaultValues: {
      formSets:
        mode === "view" || initialValue.length > 0
          ? Array.isArray(initialValue)
            ? initialValue
            : [initialValue]
          : [
              {
                patient: userId,
                blood_pressure: "",
                heart_rate: "",
                respiratory_rate: "",
                temperature: "",
                oxygen_saturation: "",
                weight: "",
                height: "",
                body_mass_index: "",
              },
            ],
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    name: "formSets",
    control,
  });

  const handleSubmitData = (dataCollection: any) => {
    const processedData = isMultiForm
      ? dataCollection.formSets
      : dataCollection.formSets[0];
    handleSubmitForm(processedData);
  };

  return (
    <div className="size-full">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSubmitData)}
          className="flex size-full flex-col items-center justify-center"
        >
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex w-full grow flex-col gap-4 overflow-y-auto p-4"
            >
              {isMultiForm && (
                <h3 className="mb-4 text-lg font-semibold">
                  Form Set {index + 1}
                </h3>
              )}

              {ENCOUNTER_DETAILS_FIELDS.map(({ value, label, type }) => {
                if (value === "patient") return null;
                return (
                  <CustomFormField
                    key={value}
                    control={control}
                    name={`formSets.${index}.${value}`}
                    label={label}
                    fieldType={type}
                    disabled={mode === "view"}
                  />
                );
              })}

              {mode === "edit" ||
                (isMultiForm && (
                  <div className="flex justify-end md:col-span-2">
                    <Button
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
                    </Button>
                  </div>
                ))}
            </div>
          ))}
          {mode === "edit" && (
            <div className="flex w-full items-center justify-end pr-4">
              {isMultiForm && (
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
                      patient: userId,
                    })
                  }
                  className="shad-primary-btn"
                >
                  Add Form Set
                </Button>
              )}
              <Button
                disabled={isLoading}
                type="submit"
                className="shad-submit-btn"
              >
                Submit
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default FormVitalSigns;
