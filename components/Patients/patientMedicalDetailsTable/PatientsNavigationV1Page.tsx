"use client";

import React, { Fragment, useEffect, useState } from "react";

import {
  NAVIGATION_PROCESS_CONFIGURATION,
  NAVIGATION_LIST,
} from "@/components/enums/medicalDetailsEnums";
import { handleDateFormat } from "@/components/helperComponent/helperDate/dateHelper";
import VerticalTabsV1Component from "@/components/vertical-tabs/VerticalTabsV1Component";

import { PatientNavHelper } from "./PatientsNavigationHelper";
import {
  ContentComponent,
  TitleComponent,
} from "./PatientsNavigationV1Component";

const VERTICAL_TAB_HEIGHT_CONTROL = 0;

type StateTableProcess = {
  navigation: string;
  dataTableData: any[];
  formData: any[];
  columnsTableData: any[];
  isWhatConfiguration: string;
  isWhatConfigurationMode: string;
};

const getInitialNav = () => {
  if (typeof window !== "undefined") {
    const storedNav = localStorage.getItem("current-nav");
    return storedNav ?? NAVIGATION_LIST.USER_DETAILS.value;
  }
  return NAVIGATION_LIST.USER_DETAILS.value;
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
    isWhatConfiguration: "table",
    isWhatConfigurationMode: "table",
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
    handleStateChange("isWhatConfiguration", process);
  };

  const handleGetPatientData = (value: string) => {
    switch (value) {
      case NAVIGATION_LIST.SYMPTOMS.value:
        return dataCollection.currentPatient?.symptoms || [];
      case NAVIGATION_LIST.PHYSICAL_EXAMINATION_FINDINGS.value:
        return dataCollection.currentPatient?.physicalExaminationFindings || [];
      case NAVIGATION_LIST.MEDICAL_HISTORY.value:
        return dataCollection.currentPatient?.medicalHistory || [];
      case NAVIGATION_LIST.VITAL_SIGNS.value:
        return dataCollection.currentPatient?.vitalSigns || [];
      case NAVIGATION_LIST.ENCOUNTERS.value:
        return dataCollection.currentPatient?.encounter || [];
      case NAVIGATION_LIST.USER_DETAILS?.value:
        return userDetails(dataCollection?.currentPatient) || [];
      default:
        return [];
    }
  };

  const hanldeNavigation = (currentNav: any) => {
    setToFormProcess(false);
    if (tableProcess.navigation === currentNav?.value) return;
    setTableProcess((prevState) => {
      const collection = { ...prevState };
      collection.navigation = currentNav?.value;
      collection.dataTableData = [];
      collection.columnsTableData = [];
      collection.isWhatConfiguration = "table";
      collection.isWhatConfigurationMode = currentNav?.isWhatConfigurationMode;
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
          return (
            <Fragment>
              <button
                onClick={() => {
                  handleStateChange("formData", row?.original);
                  handleFormProcess(NAVIGATION_PROCESS_CONFIGURATION.NAV_VIEW);
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
      navigationList={Object.values(NAVIGATION_LIST)}
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

const userDetails = (dataCollection: any) => {
  return {
    name: dataCollection?.name ?? "",
    address: dataCollection?.address ?? "",
    phone: dataCollection?.phone ?? "",
    email: dataCollection?.email ?? "",
    gender: dataCollection?.gender ?? "",
    occupation: dataCollection?.occupation ?? "",
    birthDate: dataCollection?.birthDate ?? "",
    emergencyContactName: dataCollection?.emergencyContactName ?? "",
    emergencyContactNumber: dataCollection?.emergencyContactNumber ?? "",
  };
};
