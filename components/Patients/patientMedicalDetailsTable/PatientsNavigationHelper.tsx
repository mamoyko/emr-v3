import React from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import {
  patientSymptoms,
  patientPhysicalExaminationFindings,
  patientMedicalHistory,
  patientVitalSigns,
  columnEncounters,
} from "@/components/table/columns";
import { getEncountersById } from "@/lib/actions/encounters.action";
import { getMedicalHstoryByUserId } from "@/lib/actions/medicalHistory.actions";
import { getPhysicalExamFindingsByUserId } from "@/lib/actions/physicalExaminationFindings.actions";
import { getSymptomsByUserId } from "@/lib/actions/symptoms.actions";
import { getVitalSignsByUserId } from "@/lib/actions/vitalSigns.actions";

const columnsMap = {
  [MEDICAL_DETAILS.SYMPTOMS.value]: patientSymptoms,
  [MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value]:
    patientPhysicalExaminationFindings,
  [MEDICAL_DETAILS.MEDICAL_HISTORY.value]: patientMedicalHistory,
  [MEDICAL_DETAILS.VITAL_SIGNS.value]: patientVitalSigns,
  [MEDICAL_DETAILS.ENCOUNTERS.value]: columnEncounters,
};

const fetchFunctions: Record<string, any | undefined> = {
  [MEDICAL_DETAILS.ENCOUNTERS.value]: getEncountersById,
  [MEDICAL_DETAILS.SYMPTOMS.value]: getSymptomsByUserId,
  [MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value]:
    getPhysicalExamFindingsByUserId,
  [MEDICAL_DETAILS.VITAL_SIGNS.value]: getVitalSignsByUserId,
  [MEDICAL_DETAILS.MEDICAL_HISTORY.value]: getMedicalHstoryByUserId,
};

export const PatientNavHelper = () => {
  const handleGetPatientColumns = (value: string) => {
    return columnsMap[value] || patientSymptoms;
  };
  return { handleGetPatientColumns };
};

export const PatientsNavApiHelper = async ({
  actionValue,
  userId,
}: {
  actionValue: string;
  userId: string;
}) => {
  const fetchFunction = fetchFunctions[actionValue];

  return await fetchFunction(userId);
};
