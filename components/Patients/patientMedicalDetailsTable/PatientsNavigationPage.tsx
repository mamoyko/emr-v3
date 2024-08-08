"use client";

import React, { useEffect, useState } from "react";

import UseRouting from "@/components/helperFunctions/UseRouting";
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

type EncounterDetail = {
  value: string;
  title: string;
};

type StateTableProcess = {
  navigation: string;
  isLoading: boolean;
  dataTableData: any[];
  columnsTableData: any[];
};

export const PatientsNavigationPage = () => {
  const { routePath } = UseRouting();

  const [tableProcess, setTableProcess] = useState<StateTableProcess>({
    navigation: "symptoms",
    isLoading: false,
    dataTableData: [],
    columnsTableData: null,
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

  useEffect(() => {
    fetchMedicalDetails(tableProcess.navigation);
  }, [tableProcess.navigation]);

  const handleDetailsClick = () => {
    // W.I.P
    // router issue
    routePath(`/admin/patients/create/${tableProcess.navigation}`);
  };

  return (
    <div className="flex h-screen w-full">
      <VerticalTabsComponent
        handleNavigation={(value: string) => {
          handleStateChange("navigation", value);
        }}
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
              className="capitalize text-lime-500"
              onClick={handleDetailsClick}
            >
              {`Add ${
                ENCOUNTERS_DETAILS[
                  tableProcess.navigation.toUpperCase().replace(/-/g, "_")
                ].title
              }`}
            </Button>
          </div>
        }
        ContentComponent={
          <DataTable
            columns={tableProcess.columnsTableData || []}
            data={tableProcess.dataTableData}
          />
        }
        FooterComponent={null}
      />
    </div>
  );
};
