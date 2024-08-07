"use client";

import React, { useEffect, useState } from "react";

import {
  patientSymptoms,
  patientPhysicalMedicationFindings,
  patientVitalSigns,
  patientMedicalHistory,
} from "@/components/table/columns";
import VerticalTabsComponent from "@/components/vertical-tabs/VerticalTabsComponent";

import PatientFormHelper from "./PatientFormHelper";

const ENCOUNTERS_DETAILS = {
  SYMPTOMS: { value: "symptoms", title: "Symptoms" },
  VITAL_SIGNS: { value: "vital-signs", title: "Vital Signs" },
  PHYSICAL_EXAMINATION_FINDINGS: {
    value: "physical-examination-findings",
    title: "Physical Examination Findings",
  },
  MEDICAL_HISTORY: { value: "medical-history", title: "Medical History" },
};

type TabStateProcess = {
  tab: string;
  tabData: any;
  isLoading: boolean;
  navigation: string;
  mode: string;
};

export const PatientFormPage = () => {
  const [tabProcess, setTabProcess] = useState<TabStateProcess>({
    navigation: "",
    tab: "",
    tabData: [],
    isLoading: false,
    mode: "view",
  });

  const handleStateChange = <stateFN extends keyof TabStateProcess>(
    key: stateFN,
    value: TabStateProcess[stateFN]
  ) => {
    setTabProcess((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleFetchColumns = (value: string) => {
    switch (value) {
      case ENCOUNTERS_DETAILS.SYMPTOMS.value:
        return patientSymptoms;
      case ENCOUNTERS_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        return patientPhysicalMedicationFindings;
      case ENCOUNTERS_DETAILS.MEDICAL_HISTORY.value:
        return patientMedicalHistory;
      case ENCOUNTERS_DETAILS.VITAL_SIGNS.value:
        return patientVitalSigns;
      default:
        return patientSymptoms;
    }
  };

  const fetchMedicalDetails = async (value: string) => {
    handleStateChange("isLoading", true);
    handleStateChange("tab", value);
    const response = {
      ok: true,
      data: [
        {
          symptom_description: "symptoms1 1 1 1",
          duration: "symptoms1 1 1 1",
          severity: "symptoms1 1 1 1",
          onset: "symptoms1 1 1 1",
          aggravating_factors: "symptoms1 1 1 1",
          relieving_factors: "symptoms1 1 1 1",
          patient: "symptoms1 1 1 1",
        },
        {
          symptom_description: "symptoms 2 2 2",
          duration: "symptoms 2 2 2",
          severity: "symptoms 2 2 2",
          onset: "symptoms 2 2 2",
          aggravating_factors: "symptoms 2 2 2",
          relieving_factors: "symptoms 2 2 2",
          patient: "symptoms 2 2 2",
        },
      ],
    };

    if (response.ok) {
      handleStateChange("tabData", response.data);
    }
    handleStateChange("isLoading", false);
  };

  useEffect(() => {
    fetchMedicalDetails(tabProcess.navigation);
  }, [tabProcess.navigation]);

  return (
    <div className="flex h-screen w-full">
      <VerticalTabsComponent
        handleNavigation={(value: string) => {
          handleStateChange("navigation", value);
        }}
        navigationList={Object.values(ENCOUNTERS_DETAILS)}
        dataTableProps={
          ENCOUNTERS_DETAILS[
            tabProcess.navigation.toUpperCase().replace(/-/g, "_")
          ] || {}
        }
        defaultValue={tabProcess.navigation}
        Footer={null}
        DataTable={
          <PatientFormHelper
            PATIENT_DETAILS={ENCOUNTERS_DETAILS}
            currentTab={tabProcess}
            mode={tabProcess.mode}
          />
        }
      />
    </div>
  );
};
