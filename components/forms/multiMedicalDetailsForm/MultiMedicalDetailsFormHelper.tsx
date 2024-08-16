import { useParams } from "next/navigation";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";

import FormMedicalHistory from "../medicalDetailsForm/FormMedicalHistory";
import FormPhysicalExaminationFindings from "../medicalDetailsForm/FormPhysicalExaminationFindings";
import FormSymptoms from "../medicalDetailsForm/FormSymptoms";
import FormVitalSigns from "../medicalDetailsForm/FormVitalSigns";

type FetchFunction = (parameters?: any) => Promise<any>;

const formComponents = {
  [MEDICAL_DETAILS.MEDICAL_HISTORY.value]: FormMedicalHistory,
  [MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value]:
    FormPhysicalExaminationFindings,
  [MEDICAL_DETAILS.SYMPTOMS.value]: FormSymptoms,
  [MEDICAL_DETAILS.VITAL_SIGNS.value]: FormVitalSigns,
};
interface MultiMedicalDetailsFormHelperProps {
  currentTab: {
    tab: string;
    tabData: any;
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
}

const MultiMedicalDetailsFormHelper = ({
  currentTab,
  MEDICAL_DETAILS,
  mode,
  userId,
}: MultiMedicalDetailsFormHelperProps) => {
  const params = useParams();
  const patientId: string = params.id as string;

  const handleSubmitForm = async (data: any) => {
    console.log("submit form", data);
  };

  const FormComponent = formComponents[currentTab.tab] || null;

  return (
    <div className="size-full">
      {FormComponent && (
        <FormComponent
          userId={patientId}
          handleSubmitForm={handleSubmitForm}
          initialValue={currentTab.tabData}
          mode={mode}
          isMultiForm={false}
          isLoading={false}
        />
      )}
    </div>
  );
};

export default MultiMedicalDetailsFormHelper;
