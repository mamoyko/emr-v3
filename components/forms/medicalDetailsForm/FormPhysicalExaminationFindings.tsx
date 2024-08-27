"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { PhysicalExamFindingsFormDataSchema } from "@/lib/validation";

interface FormData {
  general_appearance: string;
  head_and_neck: string;
  cardiovascular_system: string;
  respiratory_system: string;
  gastrointestinal_system: string;
  genitourinary_system: string;
  musculoskeletal_system: string;
  neurological_system: string;
  skin: string;
  patient: string;
}

const schema = z.object({
  formSets: z.array(PhysicalExamFindingsFormDataSchema),
});

const FIELD_NAMES: Array<{ value: keyof FormData; label: string }> = [
  { value: "general_appearance", label: "General Appearance" },
  { value: "head_and_neck", label: "Head and Neck" },
  { value: "cardiovascular_system", label: "Cardiovascular System" },
  { value: "respiratory_system", label: "Respiratory System" },
  { value: "gastrointestinal_system", label: "Gastrointestinal System" },
  { value: "genitourinary_system", label: "Genitourinary System" },
  { value: "musculoskeletal_system", label: "Musculoskeletal System" },
  { value: "neurological_system", label: "Neurological System" },
  { value: "skin", label: "Skin" },
];

interface FormPhysicalExaminationFindingsProps {
  mode: string; // "view" or "edit"
  initialValue?: FormData[];
  handleSubmitForm: (dataCollection: any) => Promise<void>;
  isMultiForm: boolean;
  isLoading: boolean;
  userId: string;
}

const FormPhysicalExaminationFindings: React.FC<
  FormPhysicalExaminationFindingsProps
> = ({
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
          ? initialValue
          : [
              {
                general_appearance: "",
                head_and_neck: "",
                cardiovascular_system: "",
                respiratory_system: "",
                gastrointestinal_system: "",
                genitourinary_system: "",
                musculoskeletal_system: "",
                neurological_system: "",
                skin: "",
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
              {FIELD_NAMES.map(({ value, label }) => (
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
                      general_appearance: "",
                      head_and_neck: "",
                      cardiovascular_system: "",
                      respiratory_system: "",
                      gastrointestinal_system: "",
                      genitourinary_system: "",
                      musculoskeletal_system: "",
                      neurological_system: "",
                      skin: "",
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

export default FormPhysicalExaminationFindings;
