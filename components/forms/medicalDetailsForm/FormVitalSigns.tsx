"use client";

import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import { Button } from "@/components/ui/button";

interface FormData {
  blood_pressure: string;
  heart_rate: string;
  respiratory_rate: string;
  temperature: string;
  oxygen_saturation: string;
  weight: string;
  height: string;
  body_mass_index: string;
  patient: any;
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
  handleSubmitForm: (dataCollection: any, tabValue: string) => Promise<void>;
  isMultiForm: boolean;
  isLoading: boolean;
}

const FormVitalSigns: React.FC<FormVitalSignsProps> = ({
  mode,
  initialValue = [],
  handleSubmitForm,
  isMultiForm = false,
  isLoading = false,
}) => {
  const methods = useForm<{ formSets: FormData[] }>({
    defaultValues: {
      formSets:
        mode === "view" || initialValue.length > 0
          ? initialValue
          : [
              {
                patient: {},
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
  });

  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    name: "formSets",
    control,
  });

  const handleSubmitData = (dataCollection: any) => {
    dataCollection = isMultiForm
      ? dataCollection.formSets
      : dataCollection?.formSets[0];
    handleSubmitForm(dataCollection, MEDICAL_DETAILS.VITAL_SIGNS.value);
  };

  return (
    <div className="size-full">
      <FormProvider {...methods}>
        <div className="flex size-full items-start justify-center">
          <div className="size-full overflow-auto">
            <form
              onSubmit={handleSubmit(handleSubmitData)}
              className="flex h-full flex-col space-y-6"
            >
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grow grid-cols-1 gap-4 rounded-md border p-4 shadow-sm md:grid-cols-2"
                >
                  <div className="md:col-span-2">
                    {isMultiForm && (
                      <h3 className="mb-4 text-lg font-semibold">
                        Form Set {index + 1}
                      </h3>
                    )}
                  </div>

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
                <div className="mt-4 flex justify-end space-x-5">
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
                          patient: {},
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
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default FormVitalSigns;
