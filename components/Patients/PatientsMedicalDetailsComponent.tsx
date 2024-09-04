"use client";
import React, { useEffect, useState } from "react";

import { Header } from "@/components/Header";
import { getPatientById } from "@/lib/actions/patient.actions";

import UseRouting from "../helperFunctions/UseRouting";

import PatientInfoComponent from "./patientComponents/PatientInfoComponent";
import { PatientsNavigationPage } from "./patientMedicalDetailsTable/PatientsNavigationPage";

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
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="flex-1 items-start justify-between px-[5%] xl:space-y-6 xl:px-12">
        <PatientInfoComponent patient={currentPatient} />
        <PatientsNavigationPage
          dataCollection={{ isLoading, currentPatient }}
          userId={currentPatient?.userId || null}
        />
      </main>
    </div>
  );
};

export default PatientsMedicalDetailsComponent;
