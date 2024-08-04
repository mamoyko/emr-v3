"use client";

import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import UseRouting from "@/components/helperFunctions/UseRouting";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface EncounterDetail {
  value: string;
  label: string;
  type?: "input" | "textarea" | "datetime-local";
}

const ENCOUNTER_DETAILS_FIELDS: EncounterDetail[] = [
  { value: "primaryPhysician", label: "Physician" },
  { value: "date_and_time", label: "Date and Time", type: "datetime-local" },
  { value: "patient", label: "Patient" },
  { value: "encounter_type", label: "Encounter Type" },
  { value: "location", label: "Location", type: "textarea" },
  { value: "reason", label: "Reason", type: "textarea" },
];

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date).replace(",", "");
};

const EncountersAddPatientPage: React.FC = () => {
  const { routePath } = UseRouting();

  const methods = useForm({
    defaultValues: ENCOUNTER_DETAILS_FIELDS.reduce(
      (acc, field) => {
        acc[field.value] = "";
        return acc;
      },
      {} as Record<string, string>
    ),
  });

  const { handleSubmit, control, reset } = methods;

  const onSubmit = (data: Record<string, any>) => {
    const formattedData = {
      ...data,
      date_and_time: formatDateTime(data.date_and_time),
    };
    console.log(formattedData);
  };

  return (
    <div className="w-full p-4">
      <div className="mb-4 flex w-full justify-end">
        <button
          onClick={(event) => {
            routePath(`/admin/encounters`);
            event.stopPropagation();
          }}
          className="rounded-md bg-rose-500 px-4 py-2 text-white hover:bg-rose-400"
        >
          Back
        </button>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {ENCOUNTER_DETAILS_FIELDS.map(({ value, label, type }) => (
            <FormItem key={value} className="flex flex-col">
              <FormLabel htmlFor={value}>{label}</FormLabel>
              <Controller
                name={value}
                control={control}
                render={({ field }) => (
                  <FormControl>
                    {type === "textarea" ? (
                      <textarea
                        {...field}
                        id={value}
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                      />
                    ) : type === "datetime-local" ? (
                      <input
                        {...field}
                        id={value}
                        type="datetime-local"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                      />
                    ) : (
                      <input
                        {...field}
                        id={value}
                        type="text"
                        required={value === "patient"}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                      />
                    )}
                  </FormControl>
                )}
              />
            </FormItem>
          ))}
          <div className="col-span-2 flex justify-end">
            {/* <Button
              type="submit"
              variant="secondary"
              size="sm"
              style={{ width: "15%" }}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Submit
            </Button> */}
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EncountersAddPatientPage;
