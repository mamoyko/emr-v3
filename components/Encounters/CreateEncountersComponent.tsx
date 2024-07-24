"use client";

// import { useRouter } from "next/navigation";

import { Header } from "@/components/Header";
import { Encounters } from "@/types/appwrite.types";

// import { columnEncounters } from "../table/columns";
// import { DataTable } from "../table/DataTable";
// import { Button } from "../ui/button";

interface EncountersComponentProps {
  documents: Encounters[];
  totalCount: number;
}

export const CreateEncountersComponent = () => {
  // const router = useRouter();

  // const handleDetailsClick = () => {
  //   router.push(`/admin/encounters/create`);
  // };
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Create Encounters</h1>
        </section>
        {/* <section className="admin-stat">
          <Button
            variant="ghost"
            className={`capitalize text-sky-500`}
            onClick={handleDetailsClick}
          >
            Add Encounters
          </Button>
        </section> */}
        {/* <DataTable columns={columnEncounters} data={documents} /> */}
      </main>
    </div>
  );
};
