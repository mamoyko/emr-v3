"use client";

import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";

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

const FIELD_NAMES: Array<{ value: keyof FormData; label: string }> = [
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
  initialValue?: FormData[];
}

const FormPhysicalExaminationFindings: React.FC<
  FormPhysicalExaminationFindingsProps
> = ({ mode, initialValue }) => {
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
                musculoskeletal: "",
                neurological_system: "",
                skin: "",
              },
            ],
    },
  });

  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    name: "formSets",
    control,
  });

  const onSubmit = (data: { formSets: FormData[] }) => {
    console.log(data);
  };

  return (
    <div className="size-full">
      <FormProvider {...methods}>
        <div className="flex size-full items-start justify-center">
          <div className="size-full overflow-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-4 rounded-md border p-4 shadow-sm sm:grid-cols-1 md:grid-cols-2"
                >
                  <h3 className="col-span-full text-lg font-semibold">
                    Form Set {index + 1}
                  </h3>
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
                  {mode === "edit" && (
                    <div className="col-span-full flex justify-end">
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
                        general_appearance: "",
                        head_and_neck: "",
                        cardiovascular_system: "",
                        respiratory_system: "",
                        gastrointestinal_system: "",
                        genitourinary_system: "",
                        musculoskeletal: "",
                        neurological_system: "",
                        skin: "",
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

export default FormPhysicalExaminationFindings;
