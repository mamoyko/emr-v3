"use client";

import React, { Fragment, useCallback, useEffect, useState } from "react";

import {
  NAVIGATION_LIST,
  NAVIGATION_LIST_VERTICAL,
  NAVIGATION_PROCESS_CONFIGURATION,
  LIST_OF_VIEW_ONLY_NAVIGATION,
} from "@/components/enums/medicalDetailsEnums";
import { debounce } from "@/lib/utils";

import { PatientNavHelper } from "../patientMedicalDetailsTable/PatientsNavigationHelper";

import {
  NavCardContentComponent,
  NavCardTitleComponent,
} from "./PatientFormsAndTable/NavCardContentComponent";
import PatientNavComponent from "./PatientNavComponent";

type StateFormProcess = {
  isHide: boolean;
  isAction: boolean;
};

type StateTableProcess = {
  navigation: string;
  dataTableData: any[];
  formData: any[];
  columnsTableData: any[];
  isWhatConfiguration: string;
  isWhatConfigurationMode: string;
  hideTitleComponent: boolean;
  hideFooterComponent: boolean;
};

const getInitialNav = () => {
  if (typeof window !== "undefined") {
    const storedNav = localStorage.getItem("current-nav");
    return storedNav ?? "symptoms";
  }
  return "symptoms";
};

const PatientNavigationHelperComponent = ({
  userId,
  dataCollection,
}: {
  userId: string;
  dataCollection: any;
}) => {
  const { handleGetPatientColumns } = PatientNavHelper();
  const [toFormProcess, setToFormProcess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [tableProcess, setTableProcess] = useState<StateTableProcess>({
    navigation: "",
    dataTableData: [],
    formData: [],
    columnsTableData: [],
    isWhatConfiguration: "",
    isWhatConfigurationMode: "",
    hideTitleComponent: true,
    hideFooterComponent: true,
  });

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

  const hanldeNavigation = (currentNav: any) => {
    if (tableProcess.navigation === currentNav?.value) return;
    const collection = { ...tableProcess };
    collection.navigation = currentNav?.value;
    collection.dataTableData = [];
    collection.columnsTableData = [];
    collection.isWhatConfiguration = "table";
    collection.isWhatConfigurationMode = currentNav?.isWhatConfigurationMode;
    collection.hideTitleComponent = LIST_OF_VIEW_ONLY_NAVIGATION.includes(
      currentNav?.value
    );
    collection.hideFooterComponent = true;
    setTableProcess(collection);
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

  const getPatientData = () => {
    setIsLoading(true);
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
    debouncedSearch(false);
  };

  useEffect(() => {
    if (tableProcess?.navigation) {
      if (typeof window !== "undefined") {
        getPatientData();
        localStorage.setItem("current-nav", tableProcess.navigation);
      }
    }
  }, [dataCollection, tableProcess?.navigation]);

  const debouncedSearch = useCallback(
    debounce((loading: boolean) => {
      setIsLoading(loading);
    }, 500),
    []
  );

  return (
    <PatientNavComponent
      dataUserCollections={dataCollection?.currentPatient}
      isLoading={isLoading}
      handleNavigation={hanldeNavigation}
      navigationListTabular={Object.values(NAVIGATION_LIST)}
      navigationListVertical={Object.values(NAVIGATION_LIST_VERTICAL)}
      defaultValue={getInitialNav()}
      CardHeaderComponent={
        <NavCardTitleComponent
          toFormProcess={toFormProcess}
          tableProcess={tableProcess}
          handleFormProcess={handleFormProcess}
          isLoading={!dataCollection?.currentPatient?.userId}
        />
      }
      CardFooterComponent={null}
      CardContentComponent={
        <NavCardContentComponent
          tableProcess={tableProcess}
          handleFormProcess={() => {}}
          handleStateChange={handleStateChange}
          userId={null}
        />
      }
    />
  );
};

export default PatientNavigationHelperComponent;

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
