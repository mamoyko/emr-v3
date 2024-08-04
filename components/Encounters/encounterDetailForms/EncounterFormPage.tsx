"use client";

import React, { useState } from "react";

import UseRouting from "@/components/helperFunctions/UseRouting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import EncounterMedicalHistory from "./EncounterMedicalHistory";
import EncounterPhysicalExaminationFindings from "./EncounterPhysicalExaminationFindings";
import EncounterSymptoms from "./EncounterSymptoms";
import EncounterVitalSigns from "./EncounterVitalSigns";

const ENCOUNTERS_DETAILS = Object.freeze({
  SYMPTOMS: { VALUE: "symptoms", LABEL: "Symptoms" },
  VITAL_SIGNS: { VALUE: "vital-signs", LABEL: "Vital Signs" },
  PHYSICAL_EXAMINATION_FINDINGS: {
    VALUE: "physical-examination-findings",
    LABEL: "Physical Examination Findings",
  },
  MEDICAL_HISTORY: { VALUE: "medical-history", LABEL: "Medical History" },
});

interface EncounterFormPageProps {
  mode: string;
  setMode: Function;
}

const EncounterFormPage: React.FC<EncounterFormPageProps> = ({
  mode,
  setMode,
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

  return (
    <div className="container w-full">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={(event) => {
            setMode((prevMode: any) => (prevMode === "edit" ? "view" : "edit"));
            event.stopPropagation();
          }}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          {mode === "view" ? "Add Medical details" : "View Medical Details"}
        </button>
        <button
          onClick={(event) => {
            routePath(`/admin/encounters`);
            event.stopPropagation();
          }}
          className="rounded-md bg-rose-500 px-4 py-2 text-white hover:bg-rose-400"
        >
          Back
        </button>
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
          <TabsContent value={ENCOUNTERS_DETAILS.MEDICAL_HISTORY.VALUE}>
            <EncounterMedicalHistory
              initialValue={currentTab.tabData}
              mode={mode}
            />
          </TabsContent>
          <TabsContent
            value={ENCOUNTERS_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.VALUE}
          >
            <EncounterPhysicalExaminationFindings
              initialValue={currentTab.tabData}
              mode={mode}
            />
          </TabsContent>
          <TabsContent value={ENCOUNTERS_DETAILS.SYMPTOMS.VALUE}>
            <EncounterSymptoms initialValue={currentTab.tabData} mode={mode} />
          </TabsContent>
          <TabsContent value={ENCOUNTERS_DETAILS.VITAL_SIGNS.VALUE}>
            <EncounterVitalSigns
              initialValue={currentTab.tabData}
              mode={mode}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default EncounterFormPage;
