import exp from "constants";

import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  patient_id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}

export interface Encounters extends Models.Document {
  patient: Patient;
  date_and_time: Date;
  primaryPhysician: string;
  location: string;
  encounter_type: string;
  reason: string;
}

export interface Patients extends Models.Document {
  id: string;
  address: string;
  allergies: string;
  birthDate: string;
  currentMedication: string;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  encounter: any[];
  familyMedicalHistory: string;
  gender: string;
  identificationDocumentId: string;
  identificationDocumentUrl: string;
  identificationNumber: string;
  identificationType: string;
  insurancePolicyNumber: string;
  insuranceProvider: string;
  name: string;
  occupation: string;
  pastMedicalHistory: string;
  phone: string;
  primaryPhysician: string;
  privacyConsent: boolean;
  symptoms: any[];
  treatmentConsent: boolean | null;
  userId: string;
  vitalSigns: any;
}

export interface Symptoms extends Models.Document {
  $createdAt: string;
  $id: string;
  symptom_description: string;
  duration: string;
  severity: string;
  onset: string;
  aggravating_factors: string;
  relieving_factors: string;
  patient: string;
}
export interface PhysicalExamFindings extends Models.Document {
  $id: string;
  general_appearance: string;
  head_and_neck: string;
  cardiovascular_system: string;
  respiratory_system: string;
  gastrointestinal_system: string;
  genitourinary_system: string;
  musculoskeletal: string;
  neurological_system: string;
  skin: string;
}
export interface VitalSign extends Models.Document {
  $id: string;
  blood_pressure: string;
  heart_rate: string;
  respiratory_rate: string;
  temperature: string;
  oxygen_saturation: string;
  weight: string;
  height: string;
  body_mass_index: string;
  patient: string;
}
export interface MedicalHistory extends Models.Document {
  $id: string;
  past_medical_conditions: string;
  past_surgical_history: string;
  current_medications: string;
  allergies: string;
  immunization_history: string;
  family_medical_history: string;
}
