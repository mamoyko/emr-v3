"use client";

import React, { useEffect, useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import MedicalDetailsFormHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import {
  patientSymptoms,
  patientPhysicalExaminationFindings,
  patientVitalSigns,
  patientMedicalHistory,
  columnEncounters,
} from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import VerticalTabsComponent from "@/components/vertical-tabs/VerticalTabsComponent";

import PatientsNavigationApiHelper from "./PatientsNavigationApiHelper";

type StateTableProcess = {
  navigation: string;
  dataTableData: any[];
  formData: any[];
  columnsTableData: any[];
  isInForm: boolean;
};

export const PatientsNavigationPage = ({ userId }: { userId: string }) => {
  const EXCLUDED_MEDICAL_DETAILS = [MEDICAL_DETAILS.ENCOUNTERS.value];

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
        return patientPhysicalExaminationFindings;
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
      userId,
    });
    if (result?.response?.ok) {
      handleStateChange("dataTableData", result?.documents);
    } else {
      handleStateChange("dataTableData", []);
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
      isLoading={isLoading}
      handleNavigation={(value: string) => {
        if (tableProcess.navigation === "value" || isLoading) return;
        setTableProcess((prevState) => {
          const collection = { ...prevState };
          collection.navigation = value;
          collection.dataTableData = [];
          collection.columnsTableData = null;
          return collection;
        });
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
          {EXCLUDED_MEDICAL_DETAILS.includes(
            MEDICAL_DETAILS[
              tableProcess.navigation.toUpperCase().replace(/-/g, "_")
            ].value
          ) ? (
            <div />
          ) : (
            <Button
              variant="default"
              className={
                tableProcess.isInForm ? "shad-danger-btn" : "shad-primary-btn"
              }
              disabled={isLoading}
              onClick={() => handleDetailsClick()}
            >
              {tableProcess.isInForm ? "Back" : "Add"}
            </Button>
          )}
        </div>
      }
      ContentComponent={
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {tableProcess?.isInForm ? (
            <MedicalDetailsFormHelper
              currentTab={{
                tab: tableProcess?.navigation,
                tabData: tableProcess?.formData,
                tabDataExtract: tableProcess?.dataTableData[0].patient,
              }}
              MEDICAL_DETAILS={MEDICAL_DETAILS}
              mode={"edit"}
              userId={userId}
              handleState={(data: any) => {
                handleStateChange("dataTableData", [
                  tableProcess?.dataTableData,
                  ...data,
                ]);
              }}
            />
          ) : (
            <DataTable
              columns={tableProcess?.columnsTableData || []}
              data={tableProcess?.dataTableData || []}
            />
          )}
        </div>
      }
      FooterComponent={null}
    />
  );
};
