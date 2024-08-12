"use client";

import React, { useEffect, useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import MedicalDetailsFormHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import {
  patientSymptoms,
  patientPhysicalExaminationFindings,
  patientVitalSigns,
  patientMedicalHistory,
} from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import VerticalTabsComponent from "@/components/vertical-tabs/VerticalTabsComponent";

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
      isLoading={false}
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
            <MedicalDetailsFormHelper
              currentTab={{
                tab: tableProcess.navigation,
                tabData: [],
                tabDataExtract: "",
              }}
              MEDICAL_DETAILS={MEDICAL_DETAILS}
              mode={"edit"}
              userId={""}
              handleState={() => {}}
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
