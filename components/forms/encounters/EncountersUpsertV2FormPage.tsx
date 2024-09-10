import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { CustomShadButton } from "@/components/helperComponent/ButtonComponent";
import useWindowDimension from "@/components/helperFunctions/useWindowDimension";
import { SelectItem } from "@/components/ui/select";
import { CreatePatientSchema } from "@/lib/validation";

interface FormData {
  address: string;
  phone: string;
  email: string;
  gender: string;
  occupation: string;
  birthDate: Date;
  emergencyContactName: string;
  emergencyContactNumber: string;
  name: string;
}

interface EncountersUpsertV2FormPageProps {
  mode: string;
  dataCollection?: any;
  userId: string;
  classControl: string;
  initialValue: any;
  handleSubmitForm: (patientId: string, dataCollection: any) => Promise<void>;
  handleClose: () => void;
  isLoading: boolean;
}

const EncountersUpsertV2FormPage: React.FC<EncountersUpsertV2FormPageProps> = ({
  mode,
  dataCollection,
  handleSubmitForm,
  userId,
  classControl,
  handleClose = () => {},
  isLoading = false,
}) => {
  const { height, width } = useWindowDimension();
  const form = useForm<z.infer<typeof CreatePatientSchema>>({
    resolver: zodResolver(CreatePatientSchema),
    defaultValues:
      mode === "edit"
        ? {
            address: dataCollection?.address ?? "",
            phone: dataCollection?.phone ?? "",
            email: dataCollection?.email ?? "",
            gender: dataCollection?.gender ?? "",
            occupation: dataCollection?.occupation ?? "",
            birthDate: dataCollection?.birthDate ?? new Date(),
            emergencyContactName: dataCollection?.emergencyContactName ?? "",
            emergencyContactNumber:
              dataCollection?.emergencyContactNumber ?? "",
            name: dataCollection?.name ?? "",
          }
        : {
            address: "",
            phone: "",
            email: "",
            gender: "",
            occupation: "",
            birthDate: new Date(),
            emergencyContactName: "",
            emergencyContactNumber: "",
            name: "",
          },
  });
  const { handleSubmit, control, reset } = form;
  const handleSubmitData = (formData: z.infer<typeof CreatePatientSchema>) => {
    formData.birthDate = new Date(formData.birthDate);
    handleSubmitForm(userId, formData);
  };
  console.log("form", form);
  return (
    <div className="flex size-full w-full items-center justify-center">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(handleSubmitData)}
          className="flex size-full flex-col items-center justify-center"
        >
          <div
            className={`flex w-full grow flex-col gap-4 overflow-y-auto p-4`}
            style={{
              height: height
                ? `calc(${height}px - 340px)`
                : `calc(100vh - 340px)`,
            }}
          >
            {mode === "edit" && (
              <section className="mb-12 space-y-4">
                <h1 className="header">Hi there 👋</h1>
                <p className="text-dark-700">Get started with appointments.</p>
              </section>
            )}
            <span className="flex w-full items-start justify-start text-2xl">
              Patient Contact Information
            </span>
            <CustomFormField
              control={control}
              name="name"
              label="Name"
              fieldType={FormFieldType.INPUT}
            />
            <CustomFormField
              control={form.control}
              name="gender"
              label="Gender"
              fieldType={FormFieldType.SELECT}
              placeholder="Select a gender"
            >
              {[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ].map((genderData, i) => (
                <SelectItem key={genderData.value} value={genderData.value}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{genderData.value}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={control}
              name="phone"
              label="Contact Number."
              fieldType={FormFieldType.PHONE_INPUT}
              style={{ width: 100 }}
            />

            <CustomFormField
              control={control}
              name="address"
              label="Address"
              fieldType={FormFieldType.TEXTAREA}
            />

            <CustomFormField
              control={control}
              name="email"
              label="Email"
              fieldType={FormFieldType.INPUT}
            />
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={control}
              name="birthDate"
              label="Birth Date"
              dateFormat="MM/dd/yyyy"
            />

            <div className="flex grow flex-col gap-4">
              <span className="flex w-full items-start justify-start text-2xl">
                Emergency Contact Information
              </span>
              <CustomFormField
                control={control}
                name="emergencyContactName"
                label="Emergency Contact Name"
                fieldType={FormFieldType.INPUT}
              />
              <CustomFormField
                control={control}
                name="emergencyContactNumber"
                label="Emergency Contact Number"
                fieldType={FormFieldType.PHONE_INPUT}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          <div className={"m-2 flex w-full items-end justify-end border-white"}>
            <div className={"flex w-1/2 flex-row gap-1"}>
              <CustomShadButton
                onClick={() => {}}
                buttonText={"Cancel"}
                isLoading={isLoading}
                className={"shad-danger-btn"}
              />
              <CustomShadButton
                onClick={() => {}}
                buttonText={"Submit"}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EncountersUpsertV2FormPage;
