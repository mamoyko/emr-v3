"use client";

// import { useRouter } from "next/navigation";

import EncounterFormPage from "@/components/Encounters/EncounterFormPage";
import { Header } from "@/components/Header";
import EncounterMedicalHistory from "./encounterDetailForms/EncounterMedicalHistory";
// import { Encounters } from "@/types/appwrite.types";

// import { columnEncounters } from "../table/columns";
// import { DataTable } from "../table/DataTable";
// import { Button } from "../ui/button";

// interface EncountersComponentProps {
//   documents: Encounters[];
//   totalCount: number;
// }

const ViewEncountersComponent = () => {
  // const router = useRouter();

  // const handleDetailsClick = () => {
  //   router.push(`/admin/encounters/create`);
  // };
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">View Encounters</h1>
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
        <EncounterFormPage initialTab="medical-history">
          <EncounterMedicalHistory />
        </EncounterFormPage>
      </main>
    </div>
  );
};

export default ViewEncountersComponent;
