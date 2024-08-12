"use client";

import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";

interface Symptom {
  patient: {
    name: string;
  };
  symptom_description: string;
  duration: string;
  severity: string;
  onset: string;
  aggravating_factors: string;
  relieving_factors: string;
}

interface FormData {
  symptoms: Symptom[];
}

const ENCOUNTER_DETAILS_FIELDS: Array<{
  value: keyof Symptom;
  label: string;
  type: FormFieldType;
}> = [
  { value: "patient", label: "Patient", type: FormFieldType.INPUT },
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
  initialValue?: Symptom[];
}

const FormSymptoms: React.FC<FormSymptomsProps> = ({
  mode,
  initialValue = [],
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      symptoms:
        mode === "view" || initialValue.length > 0
          ? initialValue
          : [
              {
                symptom_description: "",
                duration: "",
                severity: "",
                onset: "",
                aggravating_factors: "",
                relieving_factors: "",
                patient: { name: "" },
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
    <div className="size-full">
      <FormProvider {...methods}>
        <div className="flex size-full items-start justify-center">
          <div className="size-full overflow-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-full flex-col space-y-6"
            >
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-1 flex-col gap-4 rounded-md border p-4 shadow-sm"
                >
                  <h3 className="mb-4 text-lg font-semibold">
                    Form Set {index + 1}
                  </h3>
                  <div className="mb-4">
                    <CustomFormField
                      control={control}
                      name={`symptoms.${index}.patient?.name`}
                      label="Patient"
                      fieldType={FormFieldType.INPUT}
                      disabled={mode === "view"}
                    />
                  </div>
                  <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
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
                  )}
                </div>
              ))}
              {mode === "edit" && (
                <div className="mt-4 flex justify-end space-x-5">
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        symptom_description: "",
                        duration: "",
                        severity: "",
                        onset: "",
                        aggravating_factors: "",
                        relieving_factors: "",
                        patient: { name: "" },
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
    </div>
  );
};

export default FormSymptoms;
