import { useParams } from "next/navigation";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import FormMedicalHistory from "@/components/forms/medicalDetailsForm/FormMedicalHistory";
import FormPhysicalExaminationFindings from "@/components/forms/medicalDetailsForm/FormPhysicalExaminationFindings";
import FormSymptoms from "@/components/forms/medicalDetailsForm/FormSymptoms";
import FormVitalSigns from "@/components/forms/medicalDetailsForm/FormVitalSigns";
import { useResponse } from "@/components/helperComponent/helperResponse/ResponseComponentHelper";
import { createEncounter } from "@/lib/actions/encounters.action";
import { createMedicalHistory } from "@/lib/actions/medicalHistory.actions";
import { createPhysicalExamFindings } from "@/lib/actions/physicalExaminationFindings.actions";
import { createSymptoms } from "@/lib/actions/symptoms.actions";
import { createVitalSigns } from "@/lib/actions/vitalSigns.actions";

type FetchFunction = (parameters?: any) => Promise<any>;

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
  [MEDICAL_DETAILS.VITAL_SIGNS.value]: FormVitalSigns,
};
interface MedicalDetailsFormHelperProps {
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

const MedicalDetailsFormHelper = ({
  currentTab,
  mode,
  userId,
  isLoading,
  handleState,
  handleLoading,
  handleReturn,
}: MedicalDetailsFormHelperProps) => {
  const { error, success } = useResponse();
  const params = useParams();
  const patientId: string = params.id as string;

  const handleSubmitForm = async (dataCollection: any) => {
    handleLoading(true);
    const fetchFunction = fetchFunctions[currentTab.tab];
    if (!fetchFunction) throw new Error("System Error.");

    const result = await fetchFunction(dataCollection);

    if (result?.ok) {
      success(result?.messaging || "");
      handleLoading(false);
      handleState(result.data);
      handleReturn();
    } else {
      error(result?.messaging || "");
      handleLoading(false);
      handleState([]);
    }
  };
  const FormComponent = formComponents[currentTab.tab] || null;
  return (
    <div className="size-full">
      {formComponents[currentTab.tab] && (
        <FormComponent
          userId={patientId}
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
