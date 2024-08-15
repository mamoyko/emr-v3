import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CreateEncounterSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  date_and_time: z.coerce.date(),
  patient: z.string(),
  encounter_type: z.string(),
  location: z.string(),
  reason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

export function getEncounterSchema(type: string) {
  switch (type) {
    case "create":
      return CreateEncounterSchema;
  }
}

export const SymptomsFormDataSchema = z.object({
  symptom_description: z.string().min(1, "Symptom Description is required"),
  duration: z.string().min(1, "Duration is required"),
  severity: z.string().min(1, "Severity is required"),
  onset: z.string().min(1, "Onset is required"),
  aggravating_factors: z.string().min(1, "Aggravating Factors are required"),
  relieving_factors: z.string().min(1, "Relieving Factors are required"),
  patient: z.string().min(1, "Patient ID is required"),
});

export const VitalSignsFormDataSchema = z.object({
  blood_pressure: z.string().min(1, "Blood Pressure is required"),
  heart_rate: z.string().min(1, "Heart Rate is required"),
  respiratory_rate: z.string().min(1, "Respiratory Rate is required"),
  temperature: z.string().min(1, "Temperature is required"),
  oxygen_saturation: z.string().min(1, "Oxygen Saturation is required"),
  weight: z.string().min(1, "Weight is required"),
  height: z.string().min(1, "Height is required"),
  body_mass_index: z.string().min(1, "Body Mass Index is required"),
});

export const PhysicalExamFindingsFormDataSchema = z.object({
  general_appearance: z.string().min(1, "General Appearance is required"),
  head_and_neck: z.string().min(1, "Head and Neck is required"),
  cardiovascular_system: z.string().min(1, "Cardiovascular System is required"),
  respiratory_system: z.string().min(1, "Respiratory System is required"),
  gastrointestinal_system: z
    .string()
    .min(1, "Gastrointestinal System is required"),
  genitourinary_system: z.string().min(1, "Genitourinary System is required"),
  musculoskeletal_system: z
    .string()
    .min(1, "Musculoskeletal System is required"),
  neurological_system: z.string().min(1, "Neurological System is required"),
  skin: z.string().min(1, "Skin is required"),
});

export const MedicalHistoryFormDataSchema = z.object({
  past_medical_conditions: z
    .string()
    .min(1, "Past Medical Conditions is required"),
  past_surgical_history: z.string().min(1, "Past Surgical History is required"),
  current_medications: z.string().min(1, "Current Medications is required"),
  allergies: z.string().min(1, "Allergies is required"),
  immunization_history: z.string().min(1, "Immunization History is required"),
  family_medical_history: z
    .string()
    .min(1, "Family Medical History is required"),
});
