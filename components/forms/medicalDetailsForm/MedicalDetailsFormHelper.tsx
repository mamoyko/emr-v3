import FormMedicalHistory from "@/components/forms/medicalDetailsForm/FormMedicalHistory";
import FormPhysicalExaminationFindings from "@/components/forms/medicalDetailsForm/FormPhysicalExaminationFindings";
import FormSymptoms from "@/components/forms/medicalDetailsForm/FormSymptoms";
import FormVitalSigns from "@/components/forms/medicalDetailsForm/FormVitalSigns";

interface MedicalDetailsFormHelperProps {
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

const MedicalDetailsFormHelper = ({
  currentTab,
  PATIENT_DETAILS,
  mode,
}: MedicalDetailsFormHelperProps) => {
  const renderComponent = () => {
    switch (currentTab.tab) {
      case PATIENT_DETAILS.MEDICAL_HISTORY.value:
        return (
          <FormMedicalHistory initialValue={currentTab.tabData} mode={mode} />
        );
      case PATIENT_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        return (
          <FormPhysicalExaminationFindings
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case PATIENT_DETAILS.SYMPTOMS.value:
        return <FormSymptoms initialValue={currentTab.tabData} mode={mode} />;
      case PATIENT_DETAILS.VITAL_SIGNS.value:
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

export default MedicalDetailsFormHelper;
