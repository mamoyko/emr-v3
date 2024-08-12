import { useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import FormMedicalHistory from "@/components/forms/medicalDetailsForm/FormMedicalHistory";
import FormPhysicalExaminationFindings from "@/components/forms/medicalDetailsForm/FormPhysicalExaminationFindings";
import FormSymptoms from "@/components/forms/medicalDetailsForm/FormSymptoms";
import FormVitalSigns from "@/components/forms/medicalDetailsForm/FormVitalSigns";

import MedicalDetailsApi from "./MedicalDetailsApi";

interface MedicalDetailsFormHelperProps {
  currentTab: {
    tab: string;
    tabData: any;
    tabDataExtract: string;
  };
  MEDICAL_DETAILS: {
    MEDICAL_HISTORY: { title: string; value: string };
    PHYSICAL_EXAMINATION_FINDINGS: { title: string; value: string };
    SYMPTOMS: { title: string; value: string };
    VITAL_SIGNS: { title: string; value: string };
    ENCOUNTERS: { title: string; value: string };
  };
  mode: string;
  userId: string;
  handleState: (data: any) => void;
}

const formComponents = {
  [MEDICAL_DETAILS.MEDICAL_HISTORY.value]: FormMedicalHistory,
  [MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value]:
    FormPhysicalExaminationFindings,
  [MEDICAL_DETAILS.SYMPTOMS.value]: FormSymptoms,
  [MEDICAL_DETAILS.VITAL_SIGNS.value]: FormVitalSigns,
};

const MedicalDetailsFormHelper = ({
  currentTab,
  mode,
  userId,
  handleState,
}: MedicalDetailsFormHelperProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitForm = async (data: any) => {
    setIsLoading(true);
    data.patient = currentTab.tabDataExtract;
    try {
      const result = await MedicalDetailsApi({
        actionValue: currentTab.tab,
        parameters: data,
        userId,
      });
      if (result?.response?.ok) {
        console.log("Success:", result);
        handleState(result);
      } else {
        console.error("Failed:", result.response.message);
        handleState({ error: result.response.message });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      handleState({ error: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const FormComponent = formComponents[currentTab.tab] || null;

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
      {FormComponent && (
        <FormComponent
          handleSubmitForm={handleSubmitForm}
          initialValue={currentTab.tabData}
          mode={mode}
          isMultiForm={false}
        />
      )}
    </div>
  );
};

export default MedicalDetailsFormHelper;
