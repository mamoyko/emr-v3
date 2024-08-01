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
        <div className="h-[400px] w-[1150px] overflow-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {ENCOUNTER_DETAILS_FIELDS.map(({ name, label, type }: any) => (
              <FormItem key={name} className="col-span-1">
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      {type === "input" ? (
                        <input
                          {...field}
                          id={name}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                          required
                        />
                      ) : (
                        <textarea
                          {...field}
                          id={name}
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                          required
                        />
                      )}
                    </FormControl>
                  )}
                />
              </FormItem>
            ))}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 md:col-span-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default EncounterVitalSigns;

const ENCOUNTER_DETAILS_FIELDS = [
  { name: "blood_pressure", label: "Blood Pressure", type: "input" },
  { name: "heart_rate", label: "Heart Rate", type: "input" },
  { name: "respiratory_rate", label: "Respiratory Rate", type: "input" },
  { name: "temperature", label: "Temperature", type: "input" },
  { name: "oxygen_saturation", label: "Oxygen Saturation", type: "input" },
  { name: "weight", label: "Weight", type: "input" },
  { name: "height", label: "Height", type: "input" },
  { name: "body_mass_index", label: "Body Mass Index (BMI)", type: "input" },
  { name: "patient", label: "Patient", type: "input" },
];
