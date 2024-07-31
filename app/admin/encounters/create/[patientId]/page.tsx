// import Image from "next/image";
// import Link from "next/link";
// import router from "next/router";

// import { columnEncounters } from "@/components/table/columns";
// import { DataTable } from "@/components/table/DataTable";
// import { Button } from "@/components/ui/button";
// import { getEncounterList } from "@/lib/actions/encounters.action";

import { CreateEncountersComponent } from "@/components/Encounters/CreateEncountersComponent";

const AdminCreateEncounters = async () => {
  // const encounters = await getEncounterList();
  // const handleDetailsClick = () => {
  //   console.log("redirection?");
  //   router.push(`/admin/encounters/create`);
  // };

  return <CreateEncountersComponent />;
};

export default AdminCreateEncounters;
