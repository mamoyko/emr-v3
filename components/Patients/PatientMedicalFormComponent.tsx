"use client";
import React, { useState } from "react";

import { Header } from "@/components/Header";

import { PatientFormPage } from "./patientHelper/PatientFormPage";

interface PatientDataState {
  data: any[];
  isErrorMessage: string;
  isLoading: boolean;
  mode: "view" | "edit";
}

const PatientMedicalFormComponent = () => {
  const [patientDetails, setPatientDetails] = useState<PatientDataState>({
    data: [],
    isErrorMessage: "",
    isLoading: false,
    mode: "view",
  });

  const fetchEncountersDetails = async (encounterSlug: string) => {
    try {
      handlePatientDetails(true, "isLoading");
      const response = await fetch("https://api.example.com/data");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      handlePatientDetails(result, "data");
    } catch (error) {
      handlePatientDetails(
        error instanceof Error ? error.message : "Error fetching data",
        "isErrorMessage"
      );
    } finally {
      handlePatientDetails(false, "isLoading");
    }
  };

  const handlePatientDetails = (value: any, field: keyof PatientDataState) => {
    setPatientDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="sticky top-0 z-10 w-full">
          <h1 className="header">{`${
            patientDetails.mode === "view" ? "View" : "Create"
          } Patient`}</h1>
        </section>
        <PatientFormPage />
      </main>
    </div>
  );
};

export default PatientMedicalFormComponent;
