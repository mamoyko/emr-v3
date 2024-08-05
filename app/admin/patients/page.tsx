import { PatientsComponent } from "@/components/Patients/PatientsComponent";
import { getUsers } from "@/lib/actions/patient.actions";

const AdminPatientPage = async () => {
  const patients = await getUsers();
  return (
    <PatientsComponent
      documents={patients?.documents}
      totalCount={patients?.totalCount}
    />
  );
};

export default AdminPatientPage;
