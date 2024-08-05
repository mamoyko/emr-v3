import exp from "constants";

import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
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
  $collectionId: string;
  $createdAt: string;
  $updatedAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $tenant: string;
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
