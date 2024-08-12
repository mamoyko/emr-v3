import FormMedicalHistory from "../medicalDetailsForm/FormMedicalHistory";
import FormPhysicalExaminationFindings from "../medicalDetailsForm/FormPhysicalExaminationFindings";
import FormSymptoms from "../medicalDetailsForm/FormSymptoms";
import FormVitalSigns from "../medicalDetailsForm/FormVitalSigns";

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
}

const MultiMedicalDetailsFormHelper = ({
  currentTab,
  MEDICAL_DETAILS,
  mode,
}: MultiMedicalDetailsFormHelperProps) => {
  const handleSubmitForm = async (data: { formSets: any }) => {
    console.log("data", data);
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
