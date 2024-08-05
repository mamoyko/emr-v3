"use client";

import { Header } from "@/components/Header";
import { Patients } from "@/types/appwrite.types";

import { columnsPatient } from "../table/columns";
import { DataTable } from "../table/DataTable";

interface PatientsComponentProps {
  documents: Patients[];
  totalCount: number;
}

export const PatientsComponent = ({
  documents,
  totalCount,
}: PatientsComponentProps) => {
  console.log("documents", documents);
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Patients</h1>
        </section>
        <section className="admin-stat"></section>
        <DataTable columns={columnsPatient} data={documents} />
      </main>
    </div>
  );
};
