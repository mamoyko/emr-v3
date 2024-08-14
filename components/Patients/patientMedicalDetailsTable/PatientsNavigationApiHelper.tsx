import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import { getEncountersById } from "@/lib/actions/encounters.action";
import { getMedicalHstoryByUserId } from "@/lib/actions/medicalHistory.actions";
import { getPhysicalExamFindingsByUserId } from "@/lib/actions/physicalExaminationFindings.actions";
import { getSymptomsByUserId } from "@/lib/actions/symptoms.actions";
import { getVitalSignsByUserId } from "@/lib/actions/vitalSigns.actions";

type FetchFunction = (userId: string) => Promise<{
  totalCount: number;
  documents: any[];
  [key: string]: any;
}>;

const PatientsNavigationApiHelper = async ({
  actionValue,
  userId,
}: {
  actionValue: string;
  userId: string;
}) => {
  const fetchFunctions: Record<string, FetchFunction | undefined> = {
    [MEDICAL_DETAILS.ENCOUNTERS.value]: getEncountersById,
    [MEDICAL_DETAILS.SYMPTOMS.value]: getSymptomsByUserId,
    [MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value]:
      getPhysicalExamFindingsByUserId,
    [MEDICAL_DETAILS.VITAL_SIGNS.value]: getVitalSignsByUserId,
    [MEDICAL_DETAILS.MEDICAL_HISTORY.value]: getMedicalHstoryByUserId,
  };

  const fetchFunction = fetchFunctions[actionValue];

  try {
    const result = await fetchFunction(userId);
    return {
      ...result,
      response: {
        ok: true,
        code: 200,
        message: "Success!",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      totalCount: 0,
      documents: [],
      response: {
        ok: false,
        code: 500,
        message: "An unexpected error occurred",
      },
    };
  }
};

export default PatientsNavigationApiHelper;
