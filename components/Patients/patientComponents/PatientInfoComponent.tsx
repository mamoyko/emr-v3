"use client";

import { format, parseISO, isValid } from "date-fns";
import { useEffect, useState } from "react";

import EncountersUpsertV1FormPage from "@/components/forms/encounters/EncountersUpsertV1FormPage";
import { CustomGenericButton } from "@/components/helperComponent/ButtonComponent";
import { DialogGenericComponent } from "@/components/helperComponent/DialogComponent";
import { SkeletonGeneric } from "@/components/helperComponent/SkeletonComponent";
import UseRouting from "@/components/helperFunctions/UseRouting";
import { updatePatient } from "@/lib/actions/patient.actions";

import { LoaderGeneric } from "../../helperComponent/componentGeneric/LoadingGenericComponent";

const PatientInfoComponent = ({ patient }) => {
  const { getRoutePathId } = UseRouting();
  const userId = getRoutePathId();
  const [patientInfo, setPatientInfo] = useState<any>({});
  const [dialogAction, setDialogAction] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDateFormat = (dateString: string): string => {
    if (!dateString) return dateString;
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) {
        return dateString;
      }
      return format(date, "MMMM d, yyyy");
    } catch {
      return dateString;
    }
  };
  const updatePatientInfo = async (patientId: string, patientData: any) => {
    setIsLoading(true);
    const response = await updatePatient(patientId, patientData);
    console.log("response", response);
    if (response.ok) {
      setPatientInfo(response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setPatientInfo(patient);
  }, [patient]);

  return (
    <div className="flex w-full flex-col items-center justify-center md:flex-row">
      <div className="flex h-[180px] w-[320px] items-center justify-center overflow-y-auto py-[6px] pl-2">
        <div className="flex size-full items-center justify-center rounded-lg bg-white text-black">
          {!patient.name ? (
            <SkeletonGeneric
              loaderControl={{
                height: 40,
                width: 40,
                brightness: "0%",
              }}
            />
          ) : (
            "Image box"
          )}
        </div>
      </div>
      <figure className="m-2 flex size-full flex-col rounded-lg bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 p-1">
        <div className="flex size-full flex-row items-center justify-between space-y-1 border-b p-1 pl-9">
          <DetailComponent
            item={{
              label: null,
              value: patient?.name,
            }}
            hasLoading={true}
            loadingControl={{
              height: 10,
              width: 20,
              text: "",
            }}
            articleClass="items-center justify-start font-semibold"
          />
          <CustomGenericButton
            onClick={() => {
              setDialogAction(!dialogAction);
            }}
            isLoading={!patient.name}
            variant="default"
            baseClassStyle="text-xs"
            buttonText="Edit"
            loadingControl={{
              height: 10,
              width: 20,
              text: "",
              brightness: "0%",
            }}
          />
        </div>
        <figure className="flex size-full flex-row rounded-lg bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 p-1 ">
          <span className="size-full space-y-2 text-center lg:px-8 lg:py-1 lg:text-left">
            {[
              { label: "Address", value: patient?.address || "" },
              { label: "Contact no.", value: patient?.phone || "" },
              { label: "Email", value: patient?.email || "" },
              { label: "Gender", value: patient?.gender || "" },
            ].map((item, index) => (
              <DetailComponent
                key={index}
                item={item}
                articleClass={"w-full flex-col md:flex-row"}
                valueClass="w-full"
              />
            ))}
          </span>
          <span className="size-full space-y-2 text-center lg:px-8 lg:py-1 lg:text-left">
            {[
              { label: "Occupation", value: patient?.occupation || "" },
              {
                label: "Birth Date",
                value: handleDateFormat(patient?.birthDate) || "",
              },
              {
                label: "Emergency Contact",
                value: patient?.emergencyContactName || "",
              },
              {
                label: "Emergency Contact no.",
                value: patient?.emergencyContactNumber || "",
              },
            ].map((item, index) => (
              <DetailComponent
                key={index}
                item={item}
                articleClass={"w-full flex-col md:flex-row"}
                valueClass="w-full"
              />
            ))}
          </span>
        </figure>
      </figure>
      <DialogGenericComponent
        row={""}
        ComponentDialogAction={<div></div>}
        ComponentDialogDescription={
          <EncountersUpsertV1FormPage
            isLoading={isLoading}
            handleClose={() => {
              setDialogAction(!dialogAction);
            }}
            type={"edit"}
            classControl={"w-full"}
            handleSubmitForm={updatePatientInfo}
            dataCollection={{
              patientId: userId,
              patientInfo: {
                address: patientInfo.address,
                phone: patientInfo.phone,
                email: patientInfo.email,
                gender: patientInfo.gender,
                occupation: patientInfo.occupation,
                birthDate: patientInfo.birthDate,
                emergencyContactName: patientInfo.emergencyContactName,
                emergencyContactNumber: patientInfo.emergencyContactNumber,
                name: patientInfo.name,
              },
            }}
            userId={userId}
          />
        }
        ComponentDialogTitle={`${patient?.name ?? ""} medical details`}
        dialogStyle={null}
        DialogComponentView={null}
        dialogInAction={{
          isInAction: true,
          isOpenDialog: dialogAction,
          handleDialogAction: () => {
            setDialogAction(!dialogAction);
          },
        }}
      />
    </div>
  );
};

export default PatientInfoComponent;

const DetailComponent = ({
  item,
  articleClass = null,
  valueClass = null,
  hasLoading = false,
  loadingControl = {
    height: 18,
    width: 20,
    text: "",
  },
}) => {
  return (
    <article
      key={item.label}
      className={`flex w-full flex-col space-y-1 text-ellipsis md:flex-row md:space-x-4 md:space-y-0 ${articleClass}`}
    >
      {item.label && (
        <p className="truncate border-t text-sm sm:text-sm md:shrink-0 md:border-none">
          {item.label}:
        </p>
      )}
      <p
        className={`flex w-full items-center truncate text-sm sm:text-sm md:w-auto ${valueClass}`}
      >
        {!item.value ? (
          hasLoading ? (
            <LoaderGeneric
              brightness="100%"
              width={loadingControl.width}
              height={loadingControl.height}
            />
          ) : (
            item.value
          )
        ) : (
          item.value
        )}
      </p>
    </article>
  );
};
