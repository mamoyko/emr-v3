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
  const renderComponent = () => {
    switch (currentTab.tab) {
      case MEDICAL_DETAILS.MEDICAL_HISTORY.value:
        return (
          <FormMedicalHistory initialValue={currentTab.tabData} mode={mode} />
        );
      case MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        return (
          <FormPhysicalExaminationFindings
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case MEDICAL_DETAILS.SYMPTOMS.value:
        return <FormSymptoms initialValue={currentTab.tabData} mode={mode} />;
      case MEDICAL_DETAILS.VITAL_SIGNS.value:
        return <FormVitalSigns initialValue={currentTab.tabData} mode={mode} />;
      case MEDICAL_DETAILS.ENCOUNTERS.value:
        return <FormVitalSigns initialValue={currentTab.tabData} mode={mode} />;
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
