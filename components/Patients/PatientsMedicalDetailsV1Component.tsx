"use client";
import React, { useEffect, useState } from "react";

import { Header } from "@/components/Header";
import { getPatientById } from "@/lib/actions/patient.actions";

import UseRouting from "../helperFunctions/UseRouting";

import { PatientsNavigationV1Page } from "./patientMedicalDetailsTable/PatientsNavigationV1Page";
import PatientNavigationHelperComponent from "./patientMedicalDetailsTableV2/PatientNavigationHelperComponent";

const PatientsMedicalDetailsV1Component = () => {
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
    <PatientNavigationHelperComponent
      dataCollection={{ isLoading, currentPatient }}
      userId={currentPatient?.userId || null}
    />
  );
};

export default PatientsMedicalDetailsV1Component;
