"use client";

import { Header } from "../Header";

import DynamicField from "./DynamicField";
import EncounterFormPage from "./encounterDetailForms/EncounterFormPage";

export const CodeSandboxPage = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Code SandBox</h1>
        </section>
        <section className="admin-stat">
          <EncounterFormPage />
        </section>
      </main>
    </div>
  );
};
