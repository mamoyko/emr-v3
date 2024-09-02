"use client";

import { useState, useEffect } from "react";

import { Header } from "@/components/Header";
import {
  createPatient,
  getPatientById,
  updatePatient,
} from "@/lib/actions/patient.actions";

import EncountersUpsertV1FormPage from "../forms/encounters/EncountersUpsertV1FormPage";
import UseRouting from "../helperFunctions/UseRouting";

const PatientUpsertComponent = ({ type }) => {
  const { getRoutePathId } = UseRouting();
  const userId = getRoutePathId();
  const [currentPatient, setCurrentPatient] = useState<any>({});
  const [isLoading, setIsloading] = useState<boolean>(false);
  const actionMode =
    type === "edit" ? "Update Encounters" : "Create Encounters";

  const fetchSelectedPatient = async (userId: string) => {
    setIsloading(true);
    const response = await getPatientById(userId);
    if (response.ok) {
      setCurrentPatient(response.data[0]);
    }
    setIsloading(false);
  };

  const createOrUpdatePatient = async (patientId: string, patientData: any) => {
    let response: any = "";
    if (!patientId) {
      response = await createPatient(patientData);
    } else {
      response = await updatePatient(patientId, patientData);
    }
    if (response.ok) {
      console.log("yes sir");
    }
  };

  useEffect(() => {
    if (type === "edit") fetchSelectedPatient(userId);
  }, [type, userId]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">{actionMode}</h1>
        </section>
        <section className="admin-stat">
          <EncountersUpsertV1FormPage
            handleClose={() => {}}
            classControl="w-2/3"
            type={type}
            handleSubmitForm={createOrUpdatePatient}
            dataCollection={{}}
            userId={userId}
            isLoading={false}
          />
        </section>
      </main>
    </div>
  );
};

export default PatientUpsertComponent;
