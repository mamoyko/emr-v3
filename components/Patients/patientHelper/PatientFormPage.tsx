"use client";

import React, { useEffect, useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import MultiMedicalDetailsFormHelper from "@/components/forms/multiMedicalDetailsForm/MultiMedicalDetailsFormHelper";
import {
  patientSymptoms,
  patientPhysicalExaminationFindings,
  patientVitalSigns,
  patientMedicalHistory,
} from "@/components/table/columns";
import { Button } from "@/components/ui/button";
import VerticalTabsComponent from "@/components/vertical-tabs/VerticalTabsComponent";

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
      case MEDICAL_DETAILS.SYMPTOMS.value:
        return patientSymptoms;
      case MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        return patientPhysicalExaminationFindings;
      case MEDICAL_DETAILS.MEDICAL_HISTORY.value:
        return patientMedicalHistory;
      case MEDICAL_DETAILS.VITAL_SIGNS.value:
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

  const handleDetailsClick = () => {
    // routePath(`/admin/patients/create/${tabProcess.navigation}`);
  };

  useEffect(() => {
    fetchMedicalDetails(tabProcess.navigation);
  }, [tabProcess.navigation]);

  return (
    <div className="flex h-screen w-full">
      <VerticalTabsComponent
        verticalTabHeightControl={0}
        isLoading={false}
        handleParentProcess={() => {}}
        handleNavigation={(value: string) => {
          handleStateChange("navigation", value);
        }}
        navigationList={Object.values(MEDICAL_DETAILS)}
        defaultValue={tabProcess.navigation}
        TabHeaderComponent={null}
        TitleComponent={
          <div className="flex w-full items-center justify-between">
            <span>
              {
                MEDICAL_DETAILS[
                  tabProcess.navigation.toUpperCase().replace(/-/g, "_")
                ]?.title
              }
            </span>
            <Button
              variant="ghost"
              className="capitalize text-lime-500"
              onClick={handleDetailsClick}
            >
              Back
            </Button>
          </div>
        }
        DescriptionComponent={null}
        FooterComponent={null}
        ContentComponent={
          <MultiMedicalDetailsFormHelper
            MEDICAL_DETAILS={MEDICAL_DETAILS}
            currentTab={tabProcess}
            mode={tabProcess.mode}
            userId={""}
          />
        }
      />
    </div>
  );
};
