"use client";

import React from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface FormData {
  formSets: {
    general_appearance: string;
    head_and_neck: string;
    cardiovascular_system: string;
    respiratory_system: string;
    gastrointestinal_system: string;
    genitourinary_system: string;
    musculoskeletal: string;
    neurological_system: string;
    skin: string;
  }[];
}

const FIELD_NAMES = [
  "general_appearance",
  "head_and_neck",
  "cardiovascular_system",
  "respiratory_system",
  "gastrointestinal_system",
  "genitourinary_system",
  "musculoskeletal",
  "neurological_system",
  "skin",
] as const;

type FieldName = (typeof FIELD_NAMES)[number];

interface EncounterPhysicalExaminationFindingsProps {
  mode: string; // "view" or "edit"
  initialValue?: FormData;
}

const EncounterPhysicalExaminationFindings: React.FC<
  EncounterPhysicalExaminationFindingsProps
> = ({ mode, initialValue }) => {
  const methods = useForm<FormData>({
    defaultValues: initialValue || {
      formSets: [
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

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-start justify-center">
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 gap-4 rounded-md border p-4 shadow-sm sm:grid-cols-1 md:grid-cols-2"
              >
                <h3 className="col-span-full text-lg font-semibold">
                  Form Set {index + 1}
                </h3>
                {FIELD_NAMES.map((fieldName) => (
                  <FormItem key={fieldName} className="col-span-1">
                    <FormLabel htmlFor={`${fieldName}-${index}`}>
                      {fieldName.replace(/_/g, " ").toUpperCase()}
                    </FormLabel>
                    <Controller
                      name={`formSets.${index}.${fieldName}` as const}
                      control={control}
                      render={({ field }) => (
                        <FormControl>
                          <textarea
                            id={`${fieldName}-${index}`}
                            {...field}
                            rows={2}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                            required
                            disabled={mode === "view"}
                          />
                        </FormControl>
                      )}
                    />
                  </FormItem>
                ))}
                {mode === "edit" && (
                  <div className="col-span-full flex justify-end">
                    <button
                      type="button"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                      className={`w-full rounded-md px-4 py-2 text-white md:w-1/4 ${fields.length === 1 ? "cursor-not-allowed bg-gray-500" : "bg-red-500 hover:bg-red-600"}`}
                    >
                      Remove Form Set
                    </button>
                  </div>
                )}
              </div>
            ))}
            {mode === "edit" && (
              <div className="mt-4 flex justify-end">
                <button
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
                  className="mr-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Add Form Set
                </button>
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

export default EncounterPhysicalExaminationFindings;
