import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
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

interface EncountersUpsertV1FormPageProps {
  type: string;
  dataCollection?: any;
  userId: string;
  classControl: string;
  handleSubmitForm: (
    patientId: string,
    dataCollection: FormData
  ) => Promise<void>;
  handleClose: () => void;
  isLoading: boolean;
}

const EncountersUpsertV1FormPage: React.FC<EncountersUpsertV1FormPageProps> = ({
  type,
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
      type === "edit"
        ? {
            address: dataCollection.patientInfo.address,
            phone: dataCollection.patientInfo.phone,
            email: dataCollection.patientInfo.email,
            gender: dataCollection.patientInfo.gender,
            occupation: dataCollection.patientInfo.occupation,
            birthDate: new Date(dataCollection.patientInfo.birthDate),
            emergencyContactName:
              dataCollection.patientInfo.emergencyContactName,
            emergencyContactNumber:
              dataCollection.patientInfo.emergencyContactNumber,
            name: dataCollection.patientInfo.name,
          }
        : {
            address: "",
            phone: "",
            email: "",
            gender: "",
            occupation: "",
            birthDate: new Date(Date.now()),
            emergencyContactName: "",
            emergencyContactNumber: "",
            name: "",
          },
  });
  const { handleSubmit, control, reset } = form;
  const handleSubmitData = (formData: any) => {
    formData.birthDate = new Date(formData.birthDate);
    handleSubmitForm(userId, formData);
  };

  return (
    <div className="flex size-full w-full items-center justify-center">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(handleSubmitData)}
          className="flex size-full flex-col items-center justify-center"
        >
          <div
            className={`flex ${classControl} grow flex-col gap-4 overflow-y-auto p-4`}
            style={{
              height: height
                ? `calc(${height}px - 340px)`
                : `calc(100vh - 340px)`,
            }}
          >
            {type === "create" && (
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
          <div
            className={`${classControl} m-2 flex items-end justify-end border-white`}
          >
            <div className={"space-x-1"}>
              {type !== "create" && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded bg-red-500 px-4 py-2 text-white"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"}flex-1 rounded bg-blue-500 px-4 py-2 text-white`}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EncountersUpsertV1FormPage;
