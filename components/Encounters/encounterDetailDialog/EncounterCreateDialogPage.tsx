import React, { Fragment, useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CommandDialog } from "@/components/ui/command";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

const DATE_NOW = () => new Date().toLocaleString();

interface EncounterDetail {
  value: string;
  label: string;
  type?: "input" | "textarea";
}

const ENCOUNTER_DETAILS_FIELDS: EncounterDetail[] = [
  { value: "patient", label: "Patient" },
  // { value: "date_and_time", label: DATE_NOW() },
  {
    value: "current_medications",
    label: "Current Medications",
    type: "textarea",
  },
  { value: "allergies", label: "Allergies", type: "textarea" },
  {
    value: "immunization_history",
    label: "Immunization History",
    type: "textarea",
  },
  {
    value: "family_medical_history",
    label: "Family Medical History",
    type: "textarea",
  },
];

const EncounterCreateDialogPage = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    const params = { ...data, date_and_time: DATE_NOW() };
    console.log(params);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) reset();
    setIsOpen(open);
  };

  return (
    <Fragment>
      <Button
        variant="ghost"
        className="capitalize text-sky-500"
        onClick={() => setIsOpen(true)}
      >
        Add Encounter
      </Button>
      <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader className="sticky top-0 z-10">
            <DialogTitle>Encounter Patient Details</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex max-h-[calc(100vh-8rem)] flex-col gap-4 overflow-y-auto p-4"
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
              <DialogFooter className="sticky bottom-0 z-10">
                <Button type="submit" variant="secondary" size="sm">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </CommandDialog>
    </Fragment>
  );
};

export default EncounterCreateDialogPage;
