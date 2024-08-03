"use client";
import EncounterFormPage from "@/components/Encounters/encounterDetailForms/EncounterFormPage";
import { Header } from "@/components/Header";

const CreateEncountersComponent = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">View Encounters</h1>
        </section>
      </main>
    </div>
  );
};

export default CreateEncountersComponent;
