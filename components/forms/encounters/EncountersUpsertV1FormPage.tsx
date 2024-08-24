import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "@radix-ui/react-select";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import stringHelpers from "@/components/helperFunctions/stringHelpers";
import { CreatePatientSchema } from "@/lib/validation";

const EncountersUpsertV1FormPage = ({
  type = "create",
  dataCollection = {},
}) => {
  const form = useForm<z.infer<typeof CreatePatientSchema>>({
    resolver: zodResolver(CreatePatientSchema),
    defaultValues:
      type === "edit"
        ? dataCollection
        : {
            address: "",
            phone: "",
            email: "",
            gender: "",
            occupation: "",
            birthDate: "",
            emergencyContactName: "",
            emergencyContactNumber: "",
            name: "",
          },
  });

  return (
    <div
      className="size-full border-white"
      style={{ border: "1px solid white" }}
    >
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            console.log("Form submitted:", data);
          })}
          className="flex size-full flex-col space-y-6"
        >
          <div
            className="grid grow gap-4 lg:grid-cols-1 xl:grid-cols-2"
            style={{ border: "1px solid black" }}
          >
            {/* Render each CustomFormField component directly */}
            <CustomFormField
              control={form.control}
              name="name"
              label="Name"
              fieldType={FormFieldType.INPUT}
            />

            <CustomFormField
              control={form.control}
              name="gender"
              label="Gender"
              fieldType={FormFieldType.SELECT}
            >
              {/* Render SELECT options for Gender */}
              {["male", "female"].map((genderData, i) => (
                <SelectItem
                  key={i}
                  value={stringHelpers.capitalFirst({ value: genderData })}
                >
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{stringHelpers.capitalFirst({ value: genderData })}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              name="address"
              label="Address"
              fieldType={FormFieldType.INPUT}
            />

            <CustomFormField
              control={form.control}
              name="phone"
              label="Contact no."
              fieldType={FormFieldType.PHONE_INPUT}
            />

            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              fieldType={FormFieldType.INPUT}
            />

            <CustomFormField
              control={form.control}
              name="birthDate"
              label="Birth Date"
              fieldType={FormFieldType.DATE_PICKER}
            />

            <CustomFormField
              control={form.control}
              name="occupation"
              label="Occupation"
              fieldType={FormFieldType.INPUT}
            />

            <CustomFormField
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contact"
              fieldType={FormFieldType.PHONE_INPUT}
            />

            <CustomFormField
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency Contact no."
              fieldType={FormFieldType.INPUT}
            />

            {/* Submit button or any other elements as needed */}
            <button
              type="submit"
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EncountersUpsertV1FormPage;
