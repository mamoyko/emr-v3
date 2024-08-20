"use client";

import React, { useEffect, useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import MedicalDetailsFormHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import { useResponse } from "@/components/helperComponent/helperResponse/ResponseComponentHelper";
import { ImageComponent } from "@/components/helperComponent/ImageComponent";
import { ToolTipTextShow } from "@/components/helperComponent/TextComponent";
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
    const response = await PatientsNavigationApiHelper({
      actionValue: value,
      userId,
    });
    if (response?.ok) {
      success();
      handleStateChange("dataTableData", response?.data);
    } else {
      error();
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
        handleFetchColumns(tableProcess.navigation)
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("current-nav", tableProcess.navigation);
      }
    }
  }, [tableProcess?.navigation]);

  return (
    <VerticalTabsComponent
      isLoading={isLoading}
      handleNavigation={(value: string) => {
        if (tableProcess.navigation === value || isLoading) return;
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
      TabHeaderComponent={
        <div
          style={{
            border: "3px solid black",
            width: "100%",
            display: "grid",
            gap: "10px",
          }}
          className="flex-1 p-1"
        >
          <ImageComponent
            className={"w-11/12"}
            style={{
              height: "190px",
              border: "1px solid black",
              width: "100%",
            }}
            src=""
            alt="Placeholder Image"
          />
          <ToolTipTextShow style={{ width: "100%" }} text={"Monkey D. garp"} />
        </div>
      }
      TitleComponent={
        <div className="flex w-full items-start justify-between">
          <span className="flex-1 truncate">
            {
              MEDICAL_DETAILS[
                tableProcess.navigation.toUpperCase().replace(/-/g, "_")
              ]?.title
            }
          </span>

          {EXCLUDED_MEDICAL_DETAILS.includes(
            MEDICAL_DETAILS[
              tableProcess.navigation.toUpperCase().replace(/-/g, "_")
            ]?.value
          ) ? (
            <div className="shrink-0" />
          ) : (
            <button
              type="button"
              disabled={isLoading}
              className={`text-white focus:outline-none ${
                tableProcess.isInForm
                  ? "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-900"
                  : "bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800"
              } mb-2 me-2 rounded-md px-5 py-2 text-xs font-medium ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
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
              handleLoading={setIsLoading}
              handleReturn={() => handleDetailsClick()}
              isLoading={isLoading}
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
              heightToSubtrct={500}
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
