"use client";
import React, { useEffect, useState } from "react";

import { Header } from "@/components/Header";
import { getPatientById } from "@/lib/actions/patient.actions";

import UseRouting from "../helperFunctions/UseRouting";

import { PatientsNavigationPage } from "./patientMedicalDetailsTable/PatientsNavigationPage";

const PatientsMedicalDetailsComponent = () => {
  const { routePath, getRoutePathId } = UseRouting();
  const userId = getRoutePathId();

  const [currentPatient, setCurrentPatient] = useState<any>({});
  const [isLoading, setIsloading] = useState<boolean>(false);

  const fetchSelectedPatient = async (userId: string) => {
    setIsloading(true);
    const response = await getPatientById(userId);
    if (response.ok) {
      setCurrentPatient(response.data[0]);
    }
    setIsloading(false);
  };

  useEffect(() => {
    fetchSelectedPatient(userId);
  }, [userId]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="sticky top-0 z-10 flex w-full flex-row items-end justify-between">
          <h1 className="header">View Patient</h1>
        </section>
        <PatientsNavigationPage
          dataCollection={{ isLoading, currentPatient }}
          userId={userId}
        />
      </main>
    </div>
  );
};

export default PatientsMedicalDetailsComponent;
