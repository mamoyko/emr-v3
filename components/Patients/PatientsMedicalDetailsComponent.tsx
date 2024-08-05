"use client";
import React, { useEffect, useState } from "react";

import { Header } from "@/components/Header";

import PatientFormPage from "../forms/patients/PatientFormPage";

interface PatientDataState {
  data: any[];
  isErrorMessage: String;
  isLoading: boolean;
}

const PatientsMedicalDetailsComponent = () => {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [encounterData, setEncounterData] = useState<PatientDataState>({
    data: [],
    isErrorMessage: "",
    isLoading: false,
  });

  const fetchEncountersDetails = async (encounterSlug: string) => {
    try {
      handleEncounterData(true, "isLoading");
      const response = await fetch("https://api.example.com/data");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      handleEncounterData(result, "data");
    } catch (error) {
      handleEncounterData(
        error instanceof Error ? error.message : "Error fetching data",
        "isErrorMessage"
      );
    } finally {
      handleEncounterData(false, "isLoading");
    }
  };

  const handleEncounterData = (value: any, field: keyof PatientDataState) => {
    setEncounterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    fetchEncountersDetails("symptoms");
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">{`${mode === "view" ? "View" : "Create"} Patient`}</h1>
        </section>
        <PatientFormPage setMode={setMode} mode={mode} />
      </main>
    </div>
  );
};

export default PatientsMedicalDetailsComponent;
