"use client";

import EncountersAddPatientPage from "@/components/forms/encounters/EncountersAddPatientPage";
import { Header } from "@/components/Header";

const EncountersAddPatientComponent = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Create Encounters</h1>
        </section>
        <section className="admin-stat">
          <EncountersAddPatientPage />
        </section>
      </main>
    </div>
  );
};

export default EncountersAddPatientComponent;
