import { EncountersComponent } from "@/components/Encounters/EncountersComponent";
import { getUsers } from "@/lib/actions/patient.actions";

const AdminEncounterPage = async () => {
  const patients = await getUsers();
  return (
    <EncountersComponent
      documents={patients?.documents}
      totalCount={patients?.totalCount}
    />
  );
};

export default AdminEncounterPage;
