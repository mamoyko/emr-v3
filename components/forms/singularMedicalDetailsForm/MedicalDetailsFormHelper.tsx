import { useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import FormMedicalHistory from "@/components/forms/medicalDetailsForm/FormMedicalHistory";
import FormPhysicalExaminationFindings from "@/components/forms/medicalDetailsForm/FormPhysicalExaminationFindings";
import FormSymptoms from "@/components/forms/medicalDetailsForm/FormSymptoms";
import FormVitalSigns from "@/components/forms/medicalDetailsForm/FormVitalSigns";
import { createEncounter } from "@/lib/actions/encounters.action";
import { createMedicalHistory } from "@/lib/actions/medicalHistory.actions";
import { createPhysicalExamFindings } from "@/lib/actions/physicalExaminationFindings.actions";
import { createSymptoms } from "@/lib/actions/symptoms.actions";
import { createVitalSigns } from "@/lib/actions/vitalSigns.actions";

type FetchFunction = (parameters?: any) => Promise<any>;

const allowedTabsForPatientExtraction = [
  MEDICAL_DETAILS.SYMPTOMS.value,
  MEDICAL_DETAILS.VITAL_SIGNS.value,
];

const fetchFunctions: Record<string, FetchFunction> = {
  [MEDICAL_DETAILS.ENCOUNTERS.value]: createEncounter,
  [MEDICAL_DETAILS.SYMPTOMS.value]: createSymptoms,
  [MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value]:
    createPhysicalExamFindings,
  [MEDICAL_DETAILS.VITAL_SIGNS.value]: createVitalSigns,
  [MEDICAL_DETAILS.MEDICAL_HISTORY.value]: createMedicalHistory,
};

const formComponents = {
  [MEDICAL_DETAILS.MEDICAL_HISTORY.value]: FormMedicalHistory,
  [MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value]:
    FormPhysicalExaminationFindings,
  [MEDICAL_DETAILS.SYMPTOMS.value]: FormSymptoms,
  [MEDICAL_DETAILS.VITAL_SIGNS.value]: FormVitalSigns,
};
interface MedicalDetailsFormHelperProps {
  currentTab: {
    tab: string;
    tabData: any;
    tabDataToExtract: string;
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
  handleLoading: (data: any) => void;
  isLoading: boolean;
}

const MedicalDetailsFormHelper = ({
  currentTab,
  mode,
  userId,
  handleState,
  handleLoading,
  isLoading,
}: MedicalDetailsFormHelperProps) => {
  const handleSubmitForm = async (dataCollection: any, tabValue: string) => {
    handleLoading(true);

    const fetchFunction = fetchFunctions[currentTab.tab];
    if (!fetchFunction) throw new Error("System Error.");

    const result = await fetchFunction(dataCollection);

    if (result?.ok) {
      handleState(result.data);
    } else {
      handleState([]);
    }
    handleLoading(false);
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
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default MedicalDetailsFormHelper;
