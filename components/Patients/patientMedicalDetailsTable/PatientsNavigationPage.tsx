"use client";

import React, { Fragment, useCallback, useEffect, useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import MedicalDetailsFormHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import { useResponse } from "@/components/helperComponent/helperResponse/ResponseComponentHelper";
import {
  patientSymptoms,
  patientPhysicalExaminationFindings,
  patientVitalSigns,
  patientMedicalHistory,
  columnEncounters,
} from "@/components/table/columns";
import { DataTableDimension } from "@/components/table/DataTable";
import VerticalTabsComponent from "@/components/vertical-tabs/VerticalTabsComponent";

import PatientsNavigationApiHelper from "./PatientsNavigationApiHelper";

const VERTICAL_TAB_HEIGHT_CONTROL = 130;

type StateTableProcess = {
  navigation: string;
  dataTableData: any[];
  formData: any[];
  columnsTableData: any[];
  isInForm: boolean;
};

const getInitialNav = () => {
  if (typeof window !== "undefined") {
    const storedNav = localStorage.getItem("current-nav");
    return storedNav ?? "symptoms";
  }
  return "symptoms";
};

export const PatientsNavigationPage = ({
  userId,
  dataCollection,
}: {
  userId: string;
  dataCollection: any;
}) => {
  const EXCLUDED_MEDICAL_DETAILS = [MEDICAL_DETAILS.ENCOUNTERS.value];
  const { success, error } = useResponse();
  const [tableProcess, setTableProcess] = useState<StateTableProcess>({
    navigation: "",
    dataTableData: [],
    formData: [],
    columnsTableData: [],
    isInForm: false,
  });

  const handleStateChange = <stateFN extends keyof StateTableProcess>(
    key: stateFN,
    value: StateTableProcess[stateFN]
  ) => {
    setTableProcess((prevState) => ({ ...prevState, [key]: value }));
  };
  console.log(dataCollection);
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

  const handleGetData = (value: string) => {
    switch (value) {
      case MEDICAL_DETAILS.SYMPTOMS.value:
        return dataCollection.currentPatient?.symptoms || [];
      case MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        return dataCollection.currentPatient?.physicalExaminationFindings || [];
      case MEDICAL_DETAILS.MEDICAL_HISTORY.value:
        return dataCollection.currentPatient?.medicalHistory || [];
      case MEDICAL_DETAILS.VITAL_SIGNS.value:
        return dataCollection.currentPatient?.dataCollection || [];
      case MEDICAL_DETAILS.ENCOUNTERS.value:
        return dataCollection.currentPatient?.encounter || [];
      default:
        return dataCollection?.currentPatient?.symptoms || [];
    }
  };

  const handleDetailsClick = () => {
    handleStateChange("isInForm", !tableProcess.isInForm);
  };

  const handleParentProcess = () => {
    handleStateChange("isInForm", false);
  };

  useEffect(() => {
    if (tableProcess?.navigation) {
      setTableProcess((prev) => {
        const collection = { ...prev };
        collection.dataTableData = handleGetData(tableProcess?.navigation);
        collection.columnsTableData = handleFetchColumns(
          tableProcess?.navigation
        );
        return collection;
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("current-nav", tableProcess.navigation);
      }
    }
  }, [dataCollection, tableProcess?.navigation]);

  return (
    <VerticalTabsComponent
      verticalTabHeightControl={VERTICAL_TAB_HEIGHT_CONTROL}
      isLoading={false}
      handleNavigation={(value: string) => {
        if (tableProcess.navigation === value) return;
        setTableProcess((prevState) => {
          const collection = { ...prevState };
          collection.navigation = value;
          collection.dataTableData = [];
          collection.columnsTableData = [];
          return collection;
        });
      }}
      handleParentProcess={() => handleParentProcess()}
      navigationList={Object.values(MEDICAL_DETAILS)}
      defaultValue={getInitialNav()}
      DescriptionComponent={null}
      TabHeaderComponent={null}
      TitleComponent={
        <div className=" flex h-[15px] w-full items-start justify-between">
          <div className="flex-1 truncate">
            {
              MEDICAL_DETAILS[
                tableProcess.navigation.toUpperCase().replace(/-/g, "_")
              ]?.title
            }
          </div>

          {EXCLUDED_MEDICAL_DETAILS.includes(
            MEDICAL_DETAILS[
              tableProcess.navigation.toUpperCase().replace(/-/g, "_")
            ]?.value
          ) ? (
            <Fragment />
          ) : (
            <button
              type="button"
              disabled={false}
              className={`text-white focus:outline-none ${
                tableProcess.isInForm
                  ? "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-900"
                  : "bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800"
              } mb-2 me-2 rounded-md px-5 py-2 text-xs font-medium `}
              onClick={() => handleDetailsClick()}
            >
              {tableProcess.isInForm ? "Back" : "Add"}
            </button>
          )}
        </div>
      }
      ContentComponent={
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {tableProcess?.isInForm ? (
            <MedicalDetailsFormHelper
              handleLoading={() => {}}
              handleReturn={() => handleDetailsClick()}
              isLoading={false}
              currentTab={{
                tab: tableProcess?.navigation,
                tabData: tableProcess?.formData,
              }}
              MEDICAL_DETAILS={MEDICAL_DETAILS}
              mode={"edit"}
              userId={userId}
              handleState={(data: any) => {
                const collectedData = Array.isArray(data) ? data : [data];
                handleStateChange("dataTableData", [
                  ...tableProcess?.dataTableData,
                  ...collectedData,
                ]);
              }}
            />
          ) : (
            <DataTableDimension
              heightToSubtrct={500 + VERTICAL_TAB_HEIGHT_CONTROL}
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
