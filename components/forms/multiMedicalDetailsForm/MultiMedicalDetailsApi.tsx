import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import { createEncounter } from "@/lib/actions/encounters.action";
import { createMedicalHistory } from "@/lib/actions/medicalHistory.actions";
import { createPhysicalExamFindings } from "@/lib/actions/physicalExaminationFindings.actions";
import { createSymptoms } from "@/lib/actions/symptoms.actions";
import { createVitalSigns } from "@/lib/actions/vitalSigns.actions";

type FetchFunction = () => Promise<{
  totalCount: number;
  documents: any[];
  [key: string]: any;
}>;

const MultiMedicalDetailsApi = async ({
  actionValue,
  parameters,
  userId,
}: {
  actionValue: string;
  parameters?: any;
  userId: string;
}) => {
  try {
    let fetchFunction: FetchFunction | undefined;

    switch (actionValue) {
      case MEDICAL_DETAILS.ENCOUNTERS.value:
        fetchFunction = () => createEncounter(parameters);
        break;
      case MEDICAL_DETAILS.SYMPTOMS.value:
        fetchFunction = () => createSymptoms(parameters);
        break;
      case MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        fetchFunction = () => createPhysicalExamFindings(parameters);
        break;
      case MEDICAL_DETAILS.VITAL_SIGNS.value:
        fetchFunction = () => createVitalSigns(parameters);
        break;
      case MEDICAL_DETAILS.MEDICAL_HISTORY.value:
        fetchFunction = () => createMedicalHistory(parameters);
        break;
      default:
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

    if (fetchFunction) {
      const result = await fetchFunction();
      return {
        ...result,
        response: {
          ok: true,
          code: 200,
          message: "Success!",
        },
      };
    }
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

export default MultiMedicalDetailsApi;
