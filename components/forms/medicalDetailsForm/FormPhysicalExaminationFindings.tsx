"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

interface FormData {
  general_appearance: string;
  head_and_neck: string;
  cardiovascular_system: string;
  respiratory_system: string;
  gastrointestinal_system: string;
  genitourinary_system: string;
  musculoskeletal: string;
  neurological_system: string;
  skin: string;
}

const PATIENT_PHYSICAL_EXAMINATION_FINDINGS: Array<{
  value: keyof FormData;
  label: string;
}> = [
  { value: "general_appearance", label: "General Appearance" },
  { value: "head_and_neck", label: "Head and Neck" },
  { value: "cardiovascular_system", label: "Cardiovascular System" },
  { value: "respiratory_system", label: "Respiratory System" },
  { value: "gastrointestinal_system", label: "Gastrointestinal System" },
  { value: "genitourinary_system", label: "Genitourinary System" },
  { value: "musculoskeletal", label: "Musculoskeletal" },
  { value: "neurological_system", label: "Neurological System" },
  { value: "skin", label: "Skin" },
];

interface FormPhysicalExaminationFindingsProps {
  mode: string; // "view" or "edit"
  initialValue?: FormData;
}

const FormPhysicalExaminationFindings: React.FC<
  FormPhysicalExaminationFindingsProps
> = ({
  mode,
  initialValue = {
    general_appearance: "",
    head_and_neck: "",
    cardiovascular_system: "",
    respiratory_system: "",
    gastrointestinal_system: "",
    genitourinary_system: "",
    musculoskeletal: "",
    neurological_system: "",
    skin: "",
  },
}) => {
  const methods = useForm<FormData>({
    defaultValues: initialValue,
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-start justify-center">
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 rounded-md border p-4 shadow-sm sm:grid-cols-1 md:grid-cols-2">
              <h3 className="col-span-full text-lg font-semibold">
                Physical Examination Findings
              </h3>
              {PATIENT_PHYSICAL_EXAMINATION_FINDINGS.map(({ value, label }) => (
                <CustomFormField
                  key={value}
                  control={control}
                  name={value}
                  label={label}
                  fieldType={FormFieldType.TEXTAREA}
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

export default FormPhysicalExaminationFindings;
