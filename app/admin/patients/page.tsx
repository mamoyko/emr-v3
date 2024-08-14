import { PatientsComponent } from "@/components/Patients/PatientsComponent";
import { getPatientList } from "@/lib/actions/patient.actions";

const AdminPatientPage = async () => {
  const patients = await getPatientList();
  return (
    <PatientsComponent
      documents={patients?.documents}
      totalCount={patients?.totalCount}
    />
  );
};

export default AdminPatientPage;
