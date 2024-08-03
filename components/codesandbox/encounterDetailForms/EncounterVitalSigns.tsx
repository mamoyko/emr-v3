"use client";

import React from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface VitalSigns {
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

interface FormData {
  vitalSigns: VitalSigns[];
}

const ENCOUNTER_DETAILS_FIELDS: Array<{
  value: keyof VitalSigns;
  label: string;
  type: "input" | "textarea";
}> = [
  { value: "blood_pressure", label: "Blood Pressure", type: "input" },
  { value: "heart_rate", label: "Heart Rate", type: "input" },
  { value: "respiratory_rate", label: "Respiratory Rate", type: "input" },
  { value: "temperature", label: "Temperature", type: "input" },
  { value: "oxygen_saturation", label: "Oxygen Saturation", type: "input" },
  { value: "weight", label: "Weight", type: "input" },
  { value: "height", label: "Height", type: "input" },
  { value: "body_mass_index", label: "Body Mass Index (BMI)", type: "input" },
];

const EncounterVitalSigns: React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      vitalSigns: [
        {
          blood_pressure: "",
          heart_rate: "",
          respiratory_rate: "",
          temperature: "",
          oxygen_saturation: "",
          weight: "",
          height: "",
          body_mass_index: "",
          patient: "",
        },
      ],
    },
  });

  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    name: "vitalSigns",
    control,
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-start justify-center">
        <div className="w-full overflow-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 gap-4 rounded-md border p-4 shadow-sm md:grid-cols-2"
              >
                <div className="md:col-span-2">
                  <h3 className="mb-4 text-lg font-semibold">
                    Form Set {index + 1}
                  </h3>
                  <FormItem>
                    <FormLabel htmlFor={`patient-${index}`}>Patient</FormLabel>
                    <Controller
                      name={`vitalSigns.${index}.patient`}
                      control={control}
                      render={({ field }) => (
                        <FormControl>
                          <input
                            {...field}
                            id={`patient-${index}`}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                            required
                          />
                        </FormControl>
                      )}
                    />
                  </FormItem>
                </div>

                {ENCOUNTER_DETAILS_FIELDS.map(({ value, label, type }) => (
                  <FormItem key={value} className="flex flex-col">
                    <FormLabel htmlFor={`${value}-${index}`}>{label}</FormLabel>
                    <Controller
                      name={`vitalSigns.${index}.${value}`}
                      control={control}
                      render={({ field }) => (
                        <FormControl>
                          {type === "input" ? (
                            <input
                              {...field}
                              id={`${value}-${index}`}
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                              required
                            />
                          ) : (
                            <textarea
                              {...field}
                              id={`${value}-${index}`}
                              rows={2}
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                              required
                            />
                          )}
                        </FormControl>
                      )}
                    />
                  </FormItem>
                ))}

                <div className="flex justify-end md:col-span-2">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="w-1/4 max-w-xs rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Remove Form Set
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 flex justify-end">
              <button
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
                    patient: "",
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
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default EncounterVitalSigns;
