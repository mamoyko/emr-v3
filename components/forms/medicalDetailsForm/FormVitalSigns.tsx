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
  blood_pressure: z.string().nonempty("Blood Pressure is required"),
  heart_rate: z.string().nonempty("Heart Rate is required"),
  respiratory_rate: z.string().nonempty("Respiratory Rate is required"),
  temperature: z.string().nonempty("Temperature is required"),
  oxygen_saturation: z.string().nonempty("Oxygen Saturation is required"),
  weight: z.string().nonempty("Weight is required"),
  height: z.string().nonempty("Height is required"),
  body_mass_index: z.string().nonempty("Body Mass Index is required"),
});

const schema = z.object({
  formSets: z.array(formDataSchema),
});

interface FormData {
  blood_pressure: string;
  heart_rate: string;
  respiratory_rate: string;
  temperature: string;
  oxygen_saturation: string;
  weight: string;
  height: string;
  body_mass_index: string;
  patient: string;
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
  handleSubmitForm: (dataCollection: any) => Promise<void>;
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
  const params = useParams();
  const patientId: string = params.id as string;

  const methods = useForm<{ formSets: FormData[] }>({
    defaultValues: {
      formSets:
        mode === "view" || initialValue.length > 0
          ? initialValue
          : [
              {
                patient: patientId,
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
                          blood_pressure: "",
                          heart_rate: "",
                          respiratory_rate: "",
                          temperature: "",
                          oxygen_saturation: "",
                          weight: "",
                          height: "",
                          body_mass_index: "",
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

export default FormVitalSigns;
