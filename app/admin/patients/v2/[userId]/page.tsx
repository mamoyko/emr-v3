import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import PatientView from "@/components/v2/patients/PatientView";
import { getPatientById, getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatientById(userId);

  return <PatientView />;
};

export default Register;
