"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";

interface FormData {
  past_medical_conditions: string;
  past_surgical_history: string;
  current_medications: string;
  allergies: string;
  immunization_history: string;
  family_medical_history: string;
}

// Define the Zod schema
const formDataSchema = z.object({
  past_medical_conditions: z
    .string()
    .nonempty("Past Medical Conditions is required"),
  past_surgical_history: z
    .string()
    .nonempty("Past Surgical History is required"),
  current_medications: z.string().nonempty("Current Medications is required"),
  allergies: z.string().nonempty("Allergies is required"),
  immunization_history: z.string().nonempty("Immunization History is required"),
  family_medical_history: z
    .string()
    .nonempty("Family Medical History is required"),
});

const schema = z.object({
  formSets: z.array(formDataSchema),
});

const ENCOUNTER_DETAILS_FIELDS: {
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
}

const FormMedicalHistory: React.FC<FormMedicalHistoryProps> = ({
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
                past_medical_conditions: "",
                past_surgical_history: "",
                current_medications: "",
                allergies: "",
                immunization_history: "",
                family_medical_history: "",
              },
            ],
    },
    resolver: zodResolver(schema), // Use the Zod schema for validation
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
        <div className="flex size-full items-start justify-center">
          <div className="size-full overflow-auto">
            <form
              onSubmit={handleSubmit(handleSubmitData)}
              className="flex size-full flex-col space-y-6"
            >
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grow gap-4 lg:grid-cols-1 xl:grid-cols-2"
                >
                  {isMultiForm && (
                    <h3 className="mb-4 text-lg font-semibold">
                      Form Set {index + 1}
                    </h3>
                  )}
                  {ENCOUNTER_DETAILS_FIELDS.map(({ value, label }) => (
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
                <div className="mt-4 flex justify-end space-x-5">
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

export default FormMedicalHistory;
