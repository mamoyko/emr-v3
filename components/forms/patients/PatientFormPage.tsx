"use client";

import React, { useState } from "react";

import UseRouting from "@/components/helperFunctions/UseRouting";

import PatientMedicalHistory from "./PatientMedicalHistory";
import PatientPhysicalExaminationFindings from "./PatientPhysicalExaminationFindings";
import PatientSymptoms from "./PatientSymptoms";
import PatientVitalSigns from "./PatientVitalSigns";

const PATIENT_DETAILS = Object.freeze({
  SYMPTOMS: { VALUE: "symptoms", LABEL: "Symptoms" },
  VITAL_SIGNS: { VALUE: "vital-signs", LABEL: "Vital Signs" },
  PHYSICAL_EXAMINATION_FINDINGS: {
    VALUE: "physical-examination-findings",
    LABEL: "Physical Examination Findings",
  },
  MEDICAL_HISTORY: { VALUE: "medical-history", LABEL: "Medical History" },
});

interface PatientFormPageProps {
  mode: string;
  setMode: Function;
}

const PatientFormPage: React.FC<PatientFormPageProps> = ({ mode, setMode }) => {
  const { routePathId, routePath } = UseRouting();

  const [currentTab, setCurrentTab] = useState({
    tab: PATIENT_DETAILS.SYMPTOMS.VALUE,
    tabData: [],
  });

  const handleTabChange = (value: string) => {
    setCurrentTab((prevState) => {
      const collection = { ...prevState };
      collection.tab = value;
      return collection;
    });
    routePathId("active", value);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar Navigation */}
      <nav className="w-[15%] shrink-0 border-r border-gray-200 bg-gray-50">
        <div className="p-4">
          <button
            onClick={(event) => {
              setMode((prevMode: any) =>
                prevMode === "edit" ? "view" : "edit"
              );
              event.stopPropagation();
            }}
            className="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            {mode === "view" ? "Add Medical Details" : "View Medical Details"}
          </button>
        </div>
        <ul className="p-4">
          {Object.values(PATIENT_DETAILS).map((detail) => (
            <li key={detail.VALUE} className="mb-2">
              <button
                onClick={() => handleTabChange(detail.VALUE)}
                className={`w-full px-4 py-2 text-left transition-colors duration-300 ease-in-out ${
                  currentTab.tab === detail.VALUE
                    ? "bg-blue-700 text-white"
                    : "text-gray-600 hover:bg-blue-100"
                }`}
              >
                {detail.LABEL}
              </button>
            </li>
          ))}
        </ul>
        <div className="p-4">
          <button
            onClick={(event) => {
              routePath(`/admin/patients`);
              event.stopPropagation();
            }}
            className="w-full rounded-md bg-rose-500 px-4 py-2 text-white hover:bg-rose-400"
          >
            Back
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 overflow-auto p-4">
        {currentTab.tab === PATIENT_DETAILS.MEDICAL_HISTORY.VALUE && (
          <PatientMedicalHistory
            initialValue={currentTab.tabData}
            mode={mode}
          />
        )}
        {currentTab.tab ===
          PATIENT_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.VALUE && (
          <PatientPhysicalExaminationFindings
            initialValue={currentTab.tabData}
            mode={mode}
          />
        )}
        {currentTab.tab === PATIENT_DETAILS.SYMPTOMS.VALUE && (
          <PatientSymptoms initialValue={currentTab.tabData} mode={mode} />
        )}
        {currentTab.tab === PATIENT_DETAILS.VITAL_SIGNS.VALUE && (
          <PatientVitalSigns initialValue={currentTab.tabData} mode={mode} />
        )}
      </main>
    </div>
  );
};

export default PatientFormPage;
