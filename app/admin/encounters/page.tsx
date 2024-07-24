import { EncountersComponent } from "@/components/Encounters/EncountersComponent";
import { getEncounterList } from "@/lib/actions/encounters.action";

const AdminPatientPage = async () => {
  const encounters = await getEncounterList();
  return (
    <EncountersComponent
      documents={encounters.documents}
      totalCount={encounters.totalCount}
    />
  );
};

export default AdminPatientPage;
