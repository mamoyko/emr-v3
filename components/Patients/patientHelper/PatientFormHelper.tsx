import { Fragment } from "react";

import PatientMedicalHistory from "../../forms/patients/PatientMedicalHistory";
import PatientPhysicalExaminationFindings from "../../forms/patients/PatientPhysicalExaminationFindings";
import PatientSymptoms from "../../forms/patients/PatientSymptoms";
import PatientVitalSigns from "../../forms/patients/PatientVitalSigns";

interface PatientFormHelperProps {
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

const PatientFormHelper = ({
  currentTab,
  PATIENT_DETAILS,
  mode,
}: PatientFormHelperProps) => {
  const renderComponent = () => {
    switch (currentTab.tab) {
      case PATIENT_DETAILS.MEDICAL_HISTORY.value:
        return (
          <PatientMedicalHistory
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case PATIENT_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        return (
          <PatientPhysicalExaminationFindings
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case PATIENT_DETAILS.SYMPTOMS.value:
        return (
          <PatientSymptoms initialValue={currentTab.tabData} mode={mode} />
        );
      case PATIENT_DETAILS.VITAL_SIGNS.value:
        return (
          <PatientVitalSigns initialValue={currentTab.tabData} mode={mode} />
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

export default PatientFormHelper;
