"use client";

import { useState, useEffect } from "react";

import { Header } from "@/components/Header";
import { getPatientById } from "@/lib/actions/patient.actions";

import EncountersUpserFormPage from "../forms/encounters/EncountersUpserFormPage";
import EncountersUpsertV1FormPage from "../forms/encounters/EncountersUpsertV1FormPage";
import UseRouting from "../helperFunctions/UseRouting";
import { DataTableTest } from "../table/DataTable";

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
          {/* <EncountersUpserFormPage
            type={type}
            dataCollection={{ isLoading, currentPatient }}
          /> */}
          <EncountersUpsertV1FormPage type />
        </section>
      </main>
    </div>
  );
};

export default PatientUpsertComponent;
