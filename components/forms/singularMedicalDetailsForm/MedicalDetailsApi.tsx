import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import { createEncounter } from "@/lib/actions/encounters.action";
import { createMedicalHistory } from "@/lib/actions/medicalHistory.actions";
import { createPhysicalExamFindings } from "@/lib/actions/physicalExaminationFindings.actions";
import { createSymptoms } from "@/lib/actions/symptoms.actions";
import { createVitalSigns } from "@/lib/actions/vitalSigns.actions";

type FetchFunction = (parameters?: any) => Promise<any>;

interface ApiResponse {
  totalCount: number;
  documents: any[];
  response: {
    ok: boolean;
    code: number;
    message: string;
  };
}

const fetchFunctions: Record<string, FetchFunction> = {
  [MEDICAL_DETAILS.ENCOUNTERS.value]: createEncounter,
  [MEDICAL_DETAILS.SYMPTOMS.value]: createSymptoms,
  [MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value]:
    createPhysicalExamFindings,
  [MEDICAL_DETAILS.VITAL_SIGNS.value]: createVitalSigns,
  [MEDICAL_DETAILS.MEDICAL_HISTORY.value]: createMedicalHistory,
};

const MedicalDetailsApi = async ({
  actionValue,
  parameters,
  userId,
}: {
  actionValue: string;
  parameters?: any;
  userId: string;
}): Promise<ApiResponse> => {
  const fetchFunction = fetchFunctions[actionValue];
  console.log(
    "MedicalDetailsApiMedicalDetailsApiMedicalDetailsApi",
    actionValue,
    parameters,
    userId
  );
  if (!fetchFunction) {
    return {
      totalCount: 0,
      documents: [],
      response: {
        ok: false,
        code: 400,
        message: "Invalid action value provided",
      },
    };
  }

  try {
    const result = await fetchFunction(parameters);
    return result;
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

export default MedicalDetailsApi;
