import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import { getEncountersById } from "@/lib/actions/encounters.action";
import { getMedicalHstoryByUserId } from "@/lib/actions/medicalHistory.actions";
import { getPhysicalExamFindingsByUserId } from "@/lib/actions/physicalExaminationFindings.actions";
import { getSymptomsByUserId } from "@/lib/actions/symptoms.actions";
import { getVitalSignsByUserId } from "@/lib/actions/vitalSigns.actions";

const PatientsNavigationApiHelper = async ({
  actionValue,
  userId,
}: {
  actionValue: string;
  userId: string;
}) => {
  const fetchFunctions: Record<string, any | undefined> = {
    [MEDICAL_DETAILS.ENCOUNTERS.value]: getEncountersById,
    [MEDICAL_DETAILS.SYMPTOMS.value]: getSymptomsByUserId,
    [MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value]:
      getPhysicalExamFindingsByUserId,
    [MEDICAL_DETAILS.VITAL_SIGNS.value]: getVitalSignsByUserId,
    [MEDICAL_DETAILS.MEDICAL_HISTORY.value]: getMedicalHstoryByUserId,
  };

  const fetchFunction = fetchFunctions[actionValue];

  return await fetchFunction(userId);
};

export default PatientsNavigationApiHelper;
