"use client";
import React from "react";

import { Header } from "@/components/Header";

import UseRouting from "../helperFunctions/UseRouting";
import { Button } from "../ui/button";

import { PatientsNavigationPage } from "./patientMedicalDetailsTable/PatientsNavigationPage";

const PatientsMedicalDetailsComponent = () => {
  const { routePath, getRoutePathId } = UseRouting();
  const userId = getRoutePathId();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="sticky top-0 z-10 flex w-full flex-row items-end justify-between">
          <h1 className="header">View Patient</h1>
          <Button
            variant="ghost"
            className="capitalize text-lime-500"
            size="sm"
            onClick={() => routePath(`/admin/patients`)}
          >
            Table List
          </Button>
        </section>
        <PatientsNavigationPage userId={userId} />
      </main>
    </div>
  );
};

export default PatientsMedicalDetailsComponent;
