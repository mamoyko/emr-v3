import FormMedicalHistory from "../medicalDetailsForm/FormMedicalHistory";
import FormPhysicalExaminationFindings from "../medicalDetailsForm/FormPhysicalExaminationFindings";
import FormSymptoms from "../medicalDetailsForm/FormSymptoms";
import FormVitalSigns from "../medicalDetailsForm/FormVitalSigns";

import MultiMedicalDetailsApi from "./MultiMedicalDetailsApi";

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
  const handleSubmitForm = async (data: { formSets: any }) => {
    // setIsLoading(true);
    const result = await MultiMedicalDetailsApi({
      actionValue: currentTab.tab,
      parameters: data.formSets,
      userId,
    });
    if (result?.response?.ok) {
      console.log("========", result);
      // handleStateChange("dataTableData", result?.documents);
    } else {
      console.log("nopt ok", result);
      // handleStateChange("dataTableData", []);
    }
    // setIsLoading(false);
  };

  const renderComponent = () => {
    switch (currentTab.tab) {
      case MEDICAL_DETAILS.MEDICAL_HISTORY.value:
        return (
          <FormMedicalHistory
            handleSubmitForm={handleSubmitForm}
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        return (
          <FormPhysicalExaminationFindings
            handleSubmitForm={handleSubmitForm}
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case MEDICAL_DETAILS.SYMPTOMS.value:
        return (
          <FormSymptoms
            handleSubmitForm={handleSubmitForm}
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case MEDICAL_DETAILS.VITAL_SIGNS.value:
        return (
          <FormVitalSigns
            handleSubmitForm={handleSubmitForm}
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case MEDICAL_DETAILS.ENCOUNTERS.value:
        return (
          <FormVitalSigns
            handleSubmitForm={handleSubmitForm}
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
      {renderComponent()}
    </div>
  );
};

export default MultiMedicalDetailsFormHelper;
