"use client";
import React, { useEffect, useState } from "react";

import { Header } from "@/components/Header";
import { getPatientById } from "@/lib/actions/patient.actions";

import UseRouting from "../helperFunctions/UseRouting";

import { PatientsNavigationV1Page } from "./patientMedicalDetailsTable/PatientsNavigationV1Page";

const PatientsMedicalDetailsComponent = () => {
  const { getRoutePathId } = UseRouting();
  const userId = getRoutePathId();

  const [currentPatient, setCurrentPatient] = useState<any>([]);
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
    <div className="flex flex-col space-y-14">
      <Header />

      <main className="flex flex-col items-start justify-between xl:space-y-6 xl:px-12">
        <PatientsNavigationV1Page
          dataCollection={{ isLoading, currentPatient }}
          userId={currentPatient?.userId || null}
        />
        <div className="size-full" style={{ border: "1px solid white" }}></div>
      </main>
    </div>
  );
};

export default PatientsMedicalDetailsComponent;
