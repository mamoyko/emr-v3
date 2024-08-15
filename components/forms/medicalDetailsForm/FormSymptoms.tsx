"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";

// Define the Zod schema
const formDataSchema = z.object({
  symptom_description: z.string().nonempty("Symptom Description is required"),
  duration: z.string().nonempty("Duration is required"),
  severity: z.string().nonempty("Severity is required"),
  onset: z.string().nonempty("Onset is required"),
  aggravating_factors: z.string().nonempty("Aggravating Factors are required"),
  relieving_factors: z.string().nonempty("Relieving Factors are required"),
  patient: z.string().nonempty("Patient ID is required"), // If patient ID is required
});

const schema = z.object({
  formSets: z.array(formDataSchema),
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
}

const FormSymptoms: React.FC<FormSymptomsProps> = ({
  mode,
  initialValue = [],
  handleSubmitForm,
  isMultiForm,
  isLoading,
}) => {
  const params = useParams();
  const patientId: string = params.id as string;

  const methods = useForm<{ formSets: FormData[] }>({
    defaultValues: {
      formSets:
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
                patient: patientId,
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
      : dataCollection.formSets[0];
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
                          symptom_description: "",
                          duration: "",
                          severity: "",
                          onset: "",
                          aggravating_factors: "",
                          relieving_factors: "",
                          patient: patientId,
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

export default FormSymptoms;
