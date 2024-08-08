"use client";

import React, { useEffect, useState } from "react";

import MultiMedicalDetailsFormHelper from "@/components/forms/multiMedicalDetailsForm/MultiMedicalDetailsFormHelper";
import {
  patientSymptoms,
  patientPhysicalMedicationFindings,
  patientVitalSigns,
  patientMedicalHistory,
} from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import VerticalTabsComponent from "@/components/vertical-tabs/VerticalTabsComponent";

const ENCOUNTERS_DETAILS = {
  SYMPTOMS: { value: "symptoms", title: "Symptoms" },
  VITAL_SIGNS: { value: "vital-signs", title: "Vital Signs" },
  PHYSICAL_EXAMINATION_FINDINGS: {
    value: "physical-examination-findings",
    title: "Physical Examination Findings",
  },
  MEDICAL_HISTORY: { value: "medical-history", title: "Medical History" },
};

type StateTableProcess = {
  navigation: string;
  isLoading: boolean;
  dataTableData: any[];
  formData: any[];
  columnsTableData: any[];
  isInForm: boolean;
};

export const EncounterNavigationPage = () => {
  const [tableProcess, setTableProcess] = useState<StateTableProcess>({
    navigation: "symptoms",
    isLoading: false,
    dataTableData: [],
    formData: [],
    columnsTableData: null,
    isInForm: false,
  });

  const handleStateChange = <stateFN extends keyof StateTableProcess>(
    key: stateFN,
    value: StateTableProcess[stateFN]
  ) => {
    setTableProcess((prevState) => ({ ...prevState, [key]: value }));
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
    const response = {
      ok: true,
      data: [
        {
          id: "24534",
          name: "name one",
          gender: "G",
          Phone: "+644429131361371",
          address: "secret",
        },
        {
          id: "24761",
          name: "name two",
          gender: "G",
          Phone: "+644429131361371",
          address: "secret",
        },
      ],
    };

    if (response.ok) {
      handleStateChange("dataTableData", response.data);
      handleStateChange("columnsTableData", handleFetchColumns(value));
    }
    handleStateChange("isLoading", false);
  };

  const handleDetailsClick = () => {
    handleStateChange("isInForm", !tableProcess.isInForm);
  };

  const handleParentProcess = () => {
    handleStateChange("isInForm", false);
  };

  useEffect(() => {
    fetchMedicalDetails(tableProcess.navigation);
  }, [tableProcess.navigation]);

  return (
    <VerticalTabsComponent
      handleNavigation={(value: string) => {
        handleStateChange("navigation", value);
      }}
      handleParentProcess={() => handleParentProcess()}
      navigationList={Object.values(ENCOUNTERS_DETAILS)}
      defaultValue={tableProcess.navigation}
      DescriptionComponent={null}
      TitleComponent={
        <div className="flex w-full items-center justify-between">
          <span>
            {
              ENCOUNTERS_DETAILS[
                tableProcess.navigation.toUpperCase().replace(/-/g, "_")
              ].title
            }
          </span>
          <Button
            variant="outline"
            className={
              tableProcess.isInForm ? "shad-danger-btn" : "shad-primary-btn"
            }
            onClick={() => handleDetailsClick()}
          >
            {tableProcess.isInForm ? "Back" : "Add"}
          </Button>
        </div>
      }
      ContentComponent={
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {tableProcess.isInForm ? (
            <MultiMedicalDetailsFormHelper
              currentTab={{ tab: tableProcess.navigation, tabData: [] }}
              MEDICAL_DETAILS={ENCOUNTERS_DETAILS}
              mode={"edit"}
            />
          ) : (
            <DataTable
              columns={tableProcess.columnsTableData || []}
              data={tableProcess.dataTableData}
            />
          )}
        </div>
      }
      FooterComponent={null}
    />
  );
};
