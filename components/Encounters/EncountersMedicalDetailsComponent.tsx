"use client";
import React, { useState } from "react";

import { Header } from "@/components/Header";

import TabularFormPage from "../forms/tabularDetailForms/TabularFormPage";

interface tabMedicalDetailsState {
  data: any[];
  isErrorMessage: string;
  isLoading: boolean;
  mode: "view" | "edit";
}

const EncountersMedicalDetailsComponent = () => {
  const [encounterMedicalDetails, setEnounterMedicalDetails] =
    useState<tabMedicalDetailsState>({
      data: [],
      isErrorMessage: "",
      isLoading: false,
      mode: "edit",
    });

  const fetchEncountersDetails = async (encounterSlug: string) => {
    try {
      handleEncounterMedicalDetails(true, "isLoading");
      const response = await fetch("https://api.example.com/data");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      handleEncounterMedicalDetails(result, "data");
    } catch (error) {
      handleEncounterMedicalDetails(
        error instanceof Error ? error.message : "Error fetching data",
        "isErrorMessage"
      );
    } finally {
      handleEncounterMedicalDetails(false, "isLoading");
    }
  };

  const handleEncounterMedicalDetails = (
    value: any,
    field: keyof tabMedicalDetailsState
  ) => {
    setEnounterMedicalDetails((prev) => ({
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
            encounterMedicalDetails.mode === "view" ? "View" : "Create"
          } Encounters`}</h1>
        </section>
        <TabularFormPage
          mode={encounterMedicalDetails.mode}
          setEnounterMedicalDetails={setEnounterMedicalDetails}
          hideModeButton={true}
        />
      </main>
    </div>
  );
};

export default EncountersMedicalDetailsComponent;
