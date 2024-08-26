import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "@radix-ui/react-select";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import stringHelpers from "@/components/helperFunctions/stringHelpers";
import useWindowDimension from "@/components/helperFunctions/useWindowDimension";
import { CreatePatientSchema } from "@/lib/validation";

interface FormData {
  address: string;
  phone: string;
  email: string;
  gender: string;
  occupation: string;
  birthDate: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  name: string;
}

interface EncountersUpsertV1FormPageProps {
  type: string;
  dataCollection?: any;
  userId: string;
  handleSubmitForm: (
    patientId: string,
    dataCollection: FormData
  ) => Promise<void>;
}

const EncountersUpsertV1FormPage: React.FC<EncountersUpsertV1FormPageProps> = ({
  type,
  dataCollection,
  handleSubmitForm,
  userId,
}) => {
  const { height, width } = useWindowDimension();
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
  const { handleSubmit, control } = form;

  const handleSubmitData = (formData: any) => {
    handleSubmitForm(dataCollection?.patientId, formData);
  };

  return (
    <div className="size-full">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(handleSubmitData)}
          className="flex size-full flex-col "
        >
          <div
            className="flex grow flex-col gap-4 overflow-y-auto p-4 md:flex-row md:flex-wrap"
            style={{
              height: height
                ? `calc(${height}px - 335px)`
                : `calc(100vh - 340px)`,
            }}
          >
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <CustomFormField
                control={control}
                name="name"
                label="Name"
                fieldType={FormFieldType.INPUT}
              />
              <div className="flex w-full md:w-1/4">
                <CustomFormField
                  control={control}
                  name="gender"
                  label="Gender"
                  fieldType={FormFieldType.SELECT}
                >
                  {["male", "female"].map((genderData, i) => (
                    <SelectItem
                      key={i}
                      value={stringHelpers.capitalFirst({ value: genderData })}
                    >
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>
                          {stringHelpers.capitalFirst({ value: genderData })}
                        </p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <CustomFormField
                control={control}
                name="phone"
                label="Contact no."
                fieldType={FormFieldType.PHONE_INPUT_CUSTOM_STYLE}
                style={{ width: 100 }}
              />

              <div className="flex w-full items-start justify-start gap-4">
                <CustomFormField
                  control={control}
                  name="address"
                  label="Address"
                  fieldType={FormFieldType.TEXTAREA}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 md:flex-row">
              <CustomFormField
                control={control}
                name="email"
                label="Email"
                fieldType={FormFieldType.INPUT}
              />
              <CustomFormField
                control={control}
                name="birthDate"
                label="Birth Date"
                fieldType={FormFieldType.DATE_PICKER}
              />
              <CustomFormField
                control={control}
                name="occupation"
                label="Occupation"
                fieldType={FormFieldType.INPUT}
              />
            </div>

            <div className="flex grow flex-col gap-4 md:flex-row md:flex-wrap">
              <span className="flex w-full items-center justify-center text-2xl">
                Emergency Contact Information
              </span>
              <CustomFormField
                control={control}
                name="emergencyContactName"
                label="Emergency Contact"
                fieldType={FormFieldType.INPUT}
              />
              <div className="flex w-full items-center justify-center gap-4 md:w-1/4">
                <CustomFormField
                  control={control}
                  name="emergencyContactNumber"
                  label="Emergency Contact no."
                  fieldType={FormFieldType.PHONE_INPUT_CUSTOM_STYLE}
                  style={{ width: 100 }}
                />
              </div>
            </div>
          </div>

          <div className="grid w-full items-center justify-end p-2">
            <button
              type="submit"
              className="rounded bg-blue-500 px-10 py-2 text-white"
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
