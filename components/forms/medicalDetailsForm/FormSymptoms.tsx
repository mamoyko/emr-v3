"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { SymptomsFormDataSchema } from "@/lib/validation";

const schema = z.object({
  formSets: z.array(SymptomsFormDataSchema),
});

interface FormData {
  patient: string;
  symptom_description: string;
  duration: string;
  severity: string;
  onset: string;
  aggravating_factors: string;
  relieving_factors: string;
}

const ENCOUNTER_DETAILS_FIELDS: Array<{
  value: keyof FormData;
  label: string;
  type: FormFieldType;
}> = [
  {
    value: "symptom_description",
    label: "Symptom Description",
    type: FormFieldType.TEXTAREA,
  },
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
  { value: "severity", label: "Severity", type: FormFieldType.INPUT },
  { value: "duration", label: "Duration", type: FormFieldType.INPUT },
  { value: "onset", label: "Onset", type: FormFieldType.INPUT },
];

interface FormSymptomsProps {
  mode: string; // "view" or "edit"
  initialValue?: FormData[];
  handleSubmitForm: (dataCollection: any) => Promise<void>;
  isMultiForm: boolean;
  isLoading: boolean;
  userId: string;
}

const FormSymptoms: React.FC<FormSymptomsProps> = ({
  mode,
  initialValue = [],
  handleSubmitForm,
  isMultiForm,
  isLoading,
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
                symptom_description: "",
                duration: "",
                severity: "",
                onset: "",
                aggravating_factors: "",
                relieving_factors: "",
                patient: userId,
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
                      symptom_description: "",
                      duration: "",
                      severity: "",
                      onset: "",
                      aggravating_factors: "",
                      relieving_factors: "",
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

export default FormSymptoms;
