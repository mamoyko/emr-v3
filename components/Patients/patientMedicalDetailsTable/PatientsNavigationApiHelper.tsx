import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import { getEncounterList } from "@/lib/actions/encounters.action";
import { getMedicalHstoryByUserId } from "@/lib/actions/medicalHistory.actions";
import { getPhysicalExamFindingsByUserId } from "@/lib/actions/physicalExaminationFindings.actions";
import { getSymptomsByUserId } from "@/lib/actions/symptoms.actions";
import { getVitalSignsByUserId } from "@/lib/actions/vitalSigns.actions";

type FetchFunction = () => Promise<{
  totalCount: number;
  documents: any[];
  [key: string]: any;
}>;

const PatientsNavigationApiHelper = async ({
  actionValue,
}: {
  actionValue: string;
}) => {
  try {
    let fetchFunction: FetchFunction | undefined;

    switch (actionValue) {
      case MEDICAL_DETAILS.ENCOUNTERS.value:
        fetchFunction = getEncounterList;
        break;
      case MEDICAL_DETAILS.SYMPTOMS.value:
        fetchFunction = getSymptomsByUserId;
        break;
      case MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value:
        fetchFunction = getPhysicalExamFindingsByUserId;
        break;
      case MEDICAL_DETAILS.VITAL_SIGNS.value:
        fetchFunction = getVitalSignsByUserId;
        break;
      case MEDICAL_DETAILS.MEDICAL_HISTORY.value:
        fetchFunction = getMedicalHstoryByUserId;
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

export default PatientsNavigationApiHelper;
