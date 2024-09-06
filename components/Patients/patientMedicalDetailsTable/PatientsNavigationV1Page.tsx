"use client";

import React, { Fragment, useEffect, useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import VerticalTabsV1Component from "@/components/vertical-tabs/VerticalTabsV1Component";

import { NAVIGATION_FORM_PROCESS } from "./PatientNavEnums";
import {
  ContentComponent,
  TitleComponent,
} from "./PatientsNavigationComponent";
import { PatientNavHelper } from "./PatientsNavigationHelper";

const VERTICAL_TAB_HEIGHT_CONTROL = 0;

type StateTableProcess = {
  navigation: string;
  dataTableData: any[];
  formData: any[];
  columnsTableData: any[];
  isInForm: string;
};

const getInitialNav = () => {
  if (typeof window !== "undefined") {
    const storedNav = localStorage.getItem("current-nav");
    return storedNav ?? "symptoms";
  }
  return "symptoms";
};

export const PatientsNavigationV1Page = ({
  userId,
  dataCollection,
}: {
  userId: string;
  dataCollection: any;
}) => {
  const { handleGetPatientColumns } = PatientNavHelper();
  const [tableProcess, setTableProcess] = useState<StateTableProcess>({
    navigation: "",
    dataTableData: [],
    formData: [],
    columnsTableData: [],
    isInForm: "table",
  });

  const [toFormProcess, setToFormProcess] = useState<boolean>(false);

  const handleStateChange = <stateFN extends keyof StateTableProcess>(
    key: stateFN,
    value: StateTableProcess[stateFN]
  ) => {
    setTableProcess((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleFormProcess = (process: string) => {
    setToFormProcess((prev) => !prev);
    handleStateChange("isInForm", process);
  };

  const handleGetPatientData = (value: string) => {
    switch (value) {
      case MEDICAL_DETAILS.SYMPTOMS.value:
        return dataCollection.currentPatient?.symptoms || [];
      case MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        return dataCollection.currentPatient?.physicalExaminationFindings || [];
      case MEDICAL_DETAILS.MEDICAL_HISTORY.value:
        return dataCollection.currentPatient?.medicalHistory || [];
      case MEDICAL_DETAILS.VITAL_SIGNS.value:
        return dataCollection.currentPatient?.vitalSigns || [];
      case MEDICAL_DETAILS.ENCOUNTERS.value:
        return dataCollection.currentPatient?.encounter || [];
      default:
        return dataCollection?.currentPatient?.symptoms || [];
    }
  };

  const hanldeNavigation = (value: string) => {
    setToFormProcess(false);
    if (tableProcess.navigation === value) return;
    setTableProcess((prevState) => {
      const collection = { ...prevState };
      collection.navigation = value;
      collection.dataTableData = [];
      collection.columnsTableData = [];
      collection.isInForm = "table";
      return collection;
    });
  };

  const getPatientData = () => {
    const columnsData = handleGetPatientColumns(tableProcess?.navigation);
    const rowData = handleGetPatientData(tableProcess?.navigation);

    const columnCollection = [
      ...columnsData,
      {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row }) => {
          // console.log("row", row?.original);
          return (
            <Fragment>
              <button
                onClick={() => {
                  handleStateChange("formData", row?.original);
                  handleFormProcess(NAVIGATION_FORM_PROCESS.NAV_VIEW);
                }}
                type="button"
              >
                View Medical Details
              </button>
            </Fragment>
          );
        },
      },
    ];

    setTableProcess((prev) => {
      const collection = { ...prev };
      collection.dataTableData = rowData;
      collection.columnsTableData = columnCollection;
      return collection;
    });
  };

  useEffect(() => {
    if (tableProcess?.navigation) {
      if (typeof window !== "undefined") {
        getPatientData();
        localStorage.setItem("current-nav", tableProcess.navigation);
      }
    }
  }, [dataCollection, tableProcess?.navigation]);

  return (
    <VerticalTabsV1Component
      dataUserCollections={dataCollection?.currentPatient}
      verticalTabHeightControl={VERTICAL_TAB_HEIGHT_CONTROL}
      isLoading={false}
      handleNavigation={hanldeNavigation}
      handleParentProcess={() => setToFormProcess(false)}
      navigationList={Object.values(MEDICAL_DETAILS)}
      defaultValue={getInitialNav()}
      DescriptionComponent={null}
      TabHeaderComponent={null}
      TitleComponent={
        <TitleComponent
          toFormProcess={toFormProcess}
          tableProcess={tableProcess}
          handleFormProcess={handleFormProcess}
          dataCollection={dataCollection?.currentPatient}
        />
      }
      ContentComponent={
        <ContentComponent
          handleFormProcess={handleFormProcess}
          tableProcess={tableProcess}
          userId={userId}
          handleStateChange={handleStateChange}
          VERTICAL_TAB_HEIGHT_CONTROL={VERTICAL_TAB_HEIGHT_CONTROL}
        />
      }
      FooterComponent={null}
    />
  );
};
