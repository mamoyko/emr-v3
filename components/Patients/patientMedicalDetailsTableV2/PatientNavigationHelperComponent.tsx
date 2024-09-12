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
  isWhatConfiguration: boolean;
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
    isWhatConfiguration: false,
  });

  const handleStateChange = <stateFN extends keyof StateTableProcess>(
    key: stateFN,
    value: StateTableProcess[stateFN]
  ) => {
    setTableProcess((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleDetailsClick = () => {
    handleStateChange("isWhatConfiguration", !tableProcess.isWhatConfiguration);
  };

  const handleParentProcess = () => {
    handleStateChange("isWhatConfiguration", false);
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
    if (tableProcess.navigation === value) return;
    setTableProcess((prevState) => {
      const collection = { ...prevState };
      collection.navigation = value;
      collection.dataTableData = [];
      collection.columnsTableData = [];
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
      handleParentProcess={() => handleParentProcess()}
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
