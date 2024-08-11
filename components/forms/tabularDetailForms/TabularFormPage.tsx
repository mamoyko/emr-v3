"use client";

import React, { Fragment, useState } from "react";

import UseRouting from "@/components/helperFunctions/UseRouting";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FormMedicalHistory from "../medicalDetailsForm/FormMedicalHistory";
import FormPhysicalExaminationFindings from "../medicalDetailsForm/FormPhysicalExaminationFindings";
import FormSymptoms from "../medicalDetailsForm/FormSymptoms";
import FormVitalSigns from "../medicalDetailsForm/FormVitalSigns";

const ENCOUNTERS_DETAILS = Object.freeze({
  SYMPTOMS: { VALUE: "symptoms", LABEL: "Symptoms" },
  VITAL_SIGNS: { VALUE: "vital-signs", LABEL: "Vital Signs" },
  PHYSICAL_EXAMINATION_FINDINGS: {
    VALUE: "physical-examination-findings",
    LABEL: "Physical Examination Findings",
  },
  MEDICAL_HISTORY: { VALUE: "medical-history", LABEL: "Medical History" },
});

interface TabularFormPageProps {
  mode: string;
  setEnounterMedicalDetails: Function;
  hideModeButton: boolean;
}

const TabularFormPage: React.FC<TabularFormPageProps> = ({
  mode,
  setEnounterMedicalDetails,
  hideModeButton = false,
}) => {
  const { routePathId, routePath } = UseRouting();

  const [currentTab, setCurrentTab] = useState({
    tab: ENCOUNTERS_DETAILS.SYMPTOMS.VALUE,
    tabData: [],
  });

  const handleTabChange = async (value: string) => {
    setCurrentTab((prevState) => {
      const collection = { ...prevState };
      collection.tab = value;
      return collection;
    });
    routePathId("active", value);
  };

  const handleComponentRender = (modeValue: string, currentTabState: any) => {
    switch (currentTabState.tab) {
      case ENCOUNTERS_DETAILS.SYMPTOMS.VALUE:
        return (
          <FormSymptoms
            mode={modeValue}
            initialValue={currentTabState.tabData}
          />
        );
      case ENCOUNTERS_DETAILS.VITAL_SIGNS.VALUE:
        return (
          <FormVitalSigns
            mode={modeValue}
            initialValue={currentTabState.tabData}
          />
        );
      case ENCOUNTERS_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.VALUE:
        return (
          <FormPhysicalExaminationFindings
            mode={modeValue}
            initialValue={currentTabState.tabData}
          />
        );
      case ENCOUNTERS_DETAILS.MEDICAL_HISTORY.VALUE:
        return (
          <FormMedicalHistory
            mode={modeValue}
            initialValue={currentTabState.tabData}
          />
        );
      default:
        return (
          <FormSymptoms
            mode={modeValue}
            initialValue={currentTabState.tabData}
          />
        );
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <div className="mb-4 flex items-center justify-between space-x-4">
        {!hideModeButton && (
          <Button
            onClick={(event) => {
              setEnounterMedicalDetails((prevMode: any) => {
                const collection = { ...prevMode };
                collection.mode = prevMode.mode === "edit" ? "view" : "edit";
                return collection;
              });
              event.stopPropagation();
            }}
            className="shad-gray-btn"
          >
            {mode === "view" ? "Add Medical Details" : "View Medical Details"}
          </Button>
        )}
        {!hideModeButton && (
          <Button
            onClick={(event) => {
              routePath(`/admin/encounters`);
              event.stopPropagation();
            }}
            className="shad-danger-btn"
          >
            Back
          </Button>
        )}
      </div>

      <Tabs value={currentTab.tab} onValueChange={handleTabChange}>
        <TabsList className="flex flex-wrap justify-center border-b border-gray-200 bg-gray-50">
          {Object.values(ENCOUNTERS_DETAILS).map((detail) => (
            <TabsTrigger
              key={detail.VALUE}
              className={`px-4 py-2 text-center transition-colors duration-300 ease-in-out ${
                currentTab.tab === detail.VALUE
                  ? "border-b-2 border-blue-700 font-semibold text-blue-700"
                  : "text-gray-600 hover:text-blue-700"
              }`}
              value={detail.VALUE}
            >
              {detail.LABEL}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-4">
          <TabsContent value={currentTab.tab}>
            {handleComponentRender(mode, currentTab)}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TabularFormPage;
