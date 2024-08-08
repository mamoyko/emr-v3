import MultiFormMedicalHistory from "./MultiFormMedicalHistory";
import MultiFormPhysicalExaminationFindings from "./MultiFormPhysicalExaminationFindings";
import MultiFormSymptoms from "./MultiFormSymptoms";
import MultiFormVitalSigns from "./MultiFormVitalSigns";

interface MultiMedicalDetailsFormHelperProps {
  currentTab: {
    tab: string;
    tabData: any;
  };
  PATIENT_DETAILS: {
    MEDICAL_HISTORY: { title: string; value: string };
    PHYSICAL_EXAMINATION_FINDINGS: { title: string; value: string };
    SYMPTOMS: { title: string; value: string };
    VITAL_SIGNS: { title: string; value: string };
  };
  mode: string;
}

const MultiMedicalDetailsFormHelper = ({
  currentTab,
  PATIENT_DETAILS,
  mode,
}: MultiMedicalDetailsFormHelperProps) => {
  const renderComponent = () => {
    switch (currentTab.tab) {
      case PATIENT_DETAILS.MEDICAL_HISTORY.value:
        return (
          <MultiFormMedicalHistory
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case PATIENT_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        return (
          <MultiFormPhysicalExaminationFindings
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case PATIENT_DETAILS.SYMPTOMS.value:
        return (
          <MultiFormSymptoms initialValue={currentTab.tabData} mode={mode} />
        );
      case PATIENT_DETAILS.VITAL_SIGNS.value:
        return (
          <MultiFormVitalSigns initialValue={currentTab.tabData} mode={mode} />
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
