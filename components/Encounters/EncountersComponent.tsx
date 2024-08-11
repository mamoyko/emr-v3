"use client";

import { Header } from "@/components/Header";
import { Encounters } from "@/types/appwrite.types";

import UseRouting from "../helperFunctions/UseRouting";
import { columnEncounters } from "../table/columns";
import { DataTable } from "../table/DataTable";
import { Button } from "../ui/button";

interface EncountersComponentProps {
  documents: Encounters[];
  totalCount: number;
}

export const EncountersComponent = ({
  documents,
  totalCount,
}: EncountersComponentProps) => {
  const { routePath } = UseRouting();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Encounter</h1>
        </section>
        <section className="admin-stat">
          <Button
            variant="ghost"
            className="capitalize text-sky-500"
            onClick={() => routePath(`/admin/encounters/create`)}
          >
            Add Encounter
          </Button>
        </section>
        <DataTable columns={columnEncounters} data={documents || []} />
      </main>
    </div>
  );
};
