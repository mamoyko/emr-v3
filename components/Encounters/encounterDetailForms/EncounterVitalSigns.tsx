"use client";

import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

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
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-start justify-center">
        <div className="w-full overflow-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <FormItem>
                <FormLabel htmlFor="patient">Patient</FormLabel>
                <Controller
                  name="patient"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <input
                        {...field}
                        id="patient"
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
                <FormLabel htmlFor={value}>{label}</FormLabel>
                <Controller
                  name={value}
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      {type === "input" ? (
                        <input
                          {...field}
                          id={value}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                          required
                        />
                      ) : (
                        <textarea
                          {...field}
                          id={value}
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
                type="submit"
                className="w-1/4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
