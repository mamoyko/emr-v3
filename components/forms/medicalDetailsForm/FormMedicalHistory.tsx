"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { MedicalHistoryFormDataSchema } from "@/lib/validation";

interface FormData {
  past_medical_conditions: string;
  past_surgical_history: string;
  current_medications: string;
  allergies: string;
  immunization_history: string;
  family_medical_history: string;
  patient: string;
}

const schema = z.object({
  formSets: z.array(MedicalHistoryFormDataSchema),
});

const MEDICAL_HISTORY_FIELDS: {
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

interface FormMedicalHistoryProps {
  mode: string; // "view" or "edit"
  initialValue?: FormData[];
  handleSubmitForm: (dataCollection: any) => Promise<void>;
  isMultiForm: boolean;
  isLoading: boolean;
  userId: string;
}

const FormMedicalHistory: React.FC<FormMedicalHistoryProps> = ({
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
                past_medical_conditions: "",
                past_surgical_history: "",
                current_medications: "",
                allergies: "",
                immunization_history: "",
                family_medical_history: "",
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
      : dataCollection?.formSets[0];
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
              {MEDICAL_HISTORY_FIELDS.map(({ value, label }) => (
                <CustomFormField
                  key={value}
                  control={control}
                  name={`formSets.${index}.${value}`}
                  label={label}
                  fieldType={FormFieldType.TEXTAREA}
                  disabled={mode === "view"}
                />
              ))}
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
                      past_medical_conditions: "",
                      past_surgical_history: "",
                      current_medications: "",
                      allergies: "",
                      immunization_history: "",
                      family_medical_history: "",
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

export default FormMedicalHistory;
