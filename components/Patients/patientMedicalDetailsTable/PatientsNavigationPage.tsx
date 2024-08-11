"use client";

import React, { useEffect, useState } from "react";

import MultiMedicalDetailsFormHelper from "@/components/forms/multiMedicalDetailsForm/MultiMedicalDetailsFormHelper";
import {
  patientSymptoms,
  patientPhysicalMedicationFindings,
  patientVitalSigns,
  patientMedicalHistory,
  columnEncounters,
} from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import VerticalTabsComponent from "@/components/vertical-tabs/VerticalTabsComponent";

import PatientsNavigationApiHelper from "./PatientsNavigationApiHelper";

const MEDICAL_DETAILS = {
  SYMPTOMS: { value: "symptoms", title: "Symptoms" },
  VITAL_SIGNS: { value: "vital-signs", title: "Vital Signs" },
  PHYSICAL_EXAMINATION_FINDINGS: {
    value: "physical-examination-findings",
    title: "Physical Examination Findings",
  },
  MEDICAL_HISTORY: { value: "medical-history", title: "Medical History" },
  ENCOUNTERS: { value: "encounters", title: "Encounters" },
};

type StateTableProcess = {
  navigation: string;
  dataTableData: any[];
  formData: any[];
  columnsTableData: any[];
  isInForm: boolean;
};

export const PatientsNavigationPage = () => {
  const [tableProcess, setTableProcess] = useState<StateTableProcess>({
    navigation: "symptoms",
    dataTableData: [],
    formData: [],
    columnsTableData: null,
    isInForm: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStateChange = <stateFN extends keyof StateTableProcess>(
    key: stateFN,
    value: StateTableProcess[stateFN]
  ) => {
    setTableProcess((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleFetchColumns = (value: string) => {
    switch (value) {
      case MEDICAL_DETAILS.SYMPTOMS.value:
        return patientSymptoms;
      case MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        return patientPhysicalMedicationFindings;
      case MEDICAL_DETAILS.MEDICAL_HISTORY.value:
        return patientMedicalHistory;
      case MEDICAL_DETAILS.VITAL_SIGNS.value:
        return patientVitalSigns;
      case MEDICAL_DETAILS.ENCOUNTERS.value:
        return columnEncounters;
      default:
        return patientSymptoms;
    }
  };

  const fetchMedicalDetails = async (value: string) => {
    setIsLoading(true);
    const result = await PatientsNavigationApiHelper({
      actionValue: value,
    });
    if (result?.response?.ok) {
      handleStateChange("dataTableData", result?.documents);
    }
    setIsLoading(false);
  };

  const handleDetailsClick = () => {
    handleStateChange("isInForm", !tableProcess.isInForm);
  };

  const handleParentProcess = () => {
    handleStateChange("isInForm", false);
  };

  useEffect(() => {
    if (tableProcess?.navigation) {
      fetchMedicalDetails(tableProcess.navigation);
      handleStateChange(
        "columnsTableData",
        handleFetchColumns(tableProcess?.navigation)
      );
    }
  }, [tableProcess?.navigation]);

  return (
    <VerticalTabsComponent
      handleNavigation={(value: string) => {
        handleStateChange("navigation", value);
      }}
      handleParentProcess={() => handleParentProcess()}
      navigationList={Object.values(MEDICAL_DETAILS)}
      defaultValue={tableProcess.navigation}
      DescriptionComponent={null}
      TitleComponent={
        <div className="flex w-full items-center justify-between">
          <span>
            {
              MEDICAL_DETAILS[
                tableProcess.navigation.toUpperCase().replace(/-/g, "_")
              ].title
            }
          </span>
          <Button
            variant="default"
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
          {tableProcess?.isInForm ? (
            <MultiMedicalDetailsFormHelper
              currentTab={{
                tab: tableProcess?.navigation,
                tabData: tableProcess?.formData,
              }}
              MEDICAL_DETAILS={MEDICAL_DETAILS}
              mode={"edit"}
            />
          ) : (
            <DataTable
              columns={tableProcess?.columnsTableData || []}
              data={tableProcess?.dataTableData}
            />
          )}
        </div>
      }
      FooterComponent={null}
    />
  );
};
