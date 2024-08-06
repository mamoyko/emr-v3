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
    MEDICAL_HISTORY: { VALUE: string };
    PHYSICAL_EXAMINATION_FINDINGS: { VALUE: string };
    SYMPTOMS: { VALUE: string };
    VITAL_SIGNS: { VALUE: string };
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
      case PATIENT_DETAILS.MEDICAL_HISTORY.VALUE:
        return (
          <PatientMedicalHistory
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case PATIENT_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.VALUE:
        return (
          <PatientPhysicalExaminationFindings
            initialValue={currentTab.tabData}
            mode={mode}
          />
        );
      case PATIENT_DETAILS.SYMPTOMS.VALUE:
        return (
          <PatientSymptoms initialValue={currentTab.tabData} mode={mode} />
        );
      case PATIENT_DETAILS.VITAL_SIGNS.VALUE:
        return (
          <PatientVitalSigns initialValue={currentTab.tabData} mode={mode} />
        );
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <main className="flex-1 overflow-auto p-4">{renderComponent()}</main>
    </Fragment>
  );
};

export default PatientFormHelper;
