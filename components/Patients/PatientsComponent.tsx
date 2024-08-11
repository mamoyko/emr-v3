"use client";

import { Header } from "@/components/Header";
import { Patients } from "@/types/appwrite.types";

import UseRouting from "../helperFunctions/UseRouting";
import { columnsPatient } from "../table/columns";
import { DataTable } from "../table/DataTable";
import { Button } from "../ui/button";

interface PatientsComponentProps {
  documents: Patients[];
  totalCount: number;
}

export const PatientsComponent = ({
  documents,
  totalCount,
}: PatientsComponentProps) => {
  const { routePath } = UseRouting();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Patients</h1>
        </section>
        <section className="admin-stat">
          <Button
            variant="ghost"
            className="capitalize text-sky-500"
            onClick={() => routePath(`/admin/patients/create`)}
          >
            Add Patient
          </Button>
        </section>
        <DataTable columns={columnsPatient} data={documents || []} />
      </main>
    </div>
  );
};
