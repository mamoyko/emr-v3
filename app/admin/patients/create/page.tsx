import { PatientsComponent } from "@/components/Patients/PatientsComponent";
import { getUsers } from "@/lib/actions/patient.actions";

import AdminPatientPage from "../page";

const AdminPatientCreatePage = async () => {
  const patients = await getUsers();
  return (
    <PatientsComponent
      documents={patients?.documents}
      totalCount={patients?.totalCount}
    />
  );
};

export default AdminPatientCreatePage;
