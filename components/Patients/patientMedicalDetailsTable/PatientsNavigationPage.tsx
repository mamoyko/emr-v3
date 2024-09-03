"use client";

import React, { useEffect, useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import VerticalTabsComponent from "@/components/vertical-tabs/VerticalTabsComponent";

import {
  ContentComponent,
  TitleComponent,
} from "./PatientsNavigationComponent";
import { PatientNavHelper } from "./PatientsNavigationHelper";

const VERTICAL_TAB_HEIGHT_CONTROL = 100;

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
  const { handleGetPatientColumns } = PatientNavHelper();
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

  const handleDetailsClick = () => {
    handleStateChange("isInForm", !tableProcess.isInForm);
  };

  const handleParentProcess = () => {
    handleStateChange("isInForm", false);
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
    <VerticalTabsComponent
      verticalTabHeightControl={VERTICAL_TAB_HEIGHT_CONTROL}
      isLoading={false}
      handleNavigation={hanldeNavigation}
      handleParentProcess={() => handleParentProcess()}
      navigationList={Object.values(MEDICAL_DETAILS)}
      defaultValue={getInitialNav()}
      DescriptionComponent={null}
      TabHeaderComponent={null}
      TitleComponent={
        <TitleComponent
          tableProcess={tableProcess}
          handleDetailsClick={handleDetailsClick}
          dataCollection={dataCollection?.currentPatient}
        />
      }
      ContentComponent={
        <ContentComponent
          handleDetailsClick={handleDetailsClick}
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
