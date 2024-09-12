"use client";

import React, { useEffect, useState } from "react";

import {
  MEDICAL_DETAILS,
  NAVIGATION_LIST,
  NAVIGATION_LIST_VERTICAL,
} from "@/components/enums/medicalDetailsEnums";

import { PatientNavHelper } from "../patientMedicalDetailsTable/PatientsNavigationHelper";
import {
  ContentComponent,
  TitleComponent,
} from "../patientMedicalDetailsTable/PatientsNavigationV1Component";

import NavCardContentComponent from "./PatientFormsAndTable/NavCardContentComponent";
import PatientNavComponent from "./PatientNavComponent";

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

  const [tableProcess, setTableProcess] = useState<StateTableProcess>({
    navigation: "",
    dataTableData: [],
    formData: [],
    columnsTableData: [],
    isWhatConfiguration: "table",
    isWhatConfigurationMode: "table",
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

  useEffect(() => {
    if (tableProcess?.navigation) {
      setTableProcess((prev) => {
        const collection = { ...prev };
        collection.dataTableData = handleGetPatientData(
          tableProcess?.navigation
        );
        collection.columnsTableData = handleGetPatientColumns(
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
    <PatientNavComponent
      dataUserCollections={dataCollection?.currentPatient}
      isLoading={false}
      handleNavigation={hanldeNavigation}
      handleParentProcess={() => setToFormProcess(false)}
      navigationListTabular={Object.values(NAVIGATION_LIST)}
      navigationListVertical={Object.values(NAVIGATION_LIST_VERTICAL)}
      defaultValue={getInitialNav()}
      CardHeaderComponent={null}
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
