import React from "react";

import { USER_FORM_DETAILS } from "@/components/enums/medicalDetailsEnums";
import { useResponse } from "@/components/helperComponent/helperResponse/ResponseComponentHelper";
import PatientInfoV1Component from "@/components/Patients/patientComponents/PatientInfoV1Component";

interface MedicalDetailsFormGenericHelperProps {
  currentTab: {
    tab: string;
    tabData: any;
  };
  mode: string;
  userId: string;
  handleState: (data: any) => void;
  handleLoading: (data: any) => void;
  handleReturn: () => void;
  isLoading: boolean;
}
const formComponents = {
  [USER_FORM_DETAILS.USER_DETAILS.value]: PatientInfoV1Component,
};

const MedicalDetailsFormGenericHelper = ({
  currentTab,
  mode,
  userId,
  isLoading,
  handleState,
  handleLoading,
  handleReturn,
}: MedicalDetailsFormGenericHelperProps) => {
  const { success, error } = useResponse();

  const handleSubmitForm = async (dataCollection: any) => {
    // handleLoading(true);
    // const fetchFunction = fetchFunctions[currentTab.tab];
    // if (!fetchFunction) throw new Error("System Error.");
    // const result = await fetchFunction(dataCollection);
    // if (result?.ok) {
    //   success(result?.messaging || "");
    //   handleLoading(false);
    //   handleState(result.data);
    //   handleReturn();
    // } else {
    //   error(result?.messaging || "");
    //   handleLoading(false);
    //   handleState([]);
    // }
  };

  const FormComponent = formComponents[currentTab.tab] || null;

  return (
    <div className="size-full">
      {formComponents[currentTab.tab] && (
        <FormComponent
          // mode={mode}
          dataCollection={currentTab.tabData}
          // handleSubmitForm={handleSubmitForm}
          // userId={userId}
          // classControl={""}
          // handleClose={() => {}}
          // isLoading={false}
          // initialValue={null}
        />
      )}
    </div>
  );
};

export default MedicalDetailsFormGenericHelper;
