"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import {
  Appointment,
  Encounters,
  MedicalHistory,
  Patient,
  Patients,
  PhysicalExamFindings,
  Symptoms,
  VitalSign,
} from "@/types/appwrite.types";

import { MEDICAL_DETAILS } from "../enums/medicalDetailsEnums";
import { StatusBadge } from "../StatusBadge";

import {
  ActionsCell,
  EncounterActionCell,
  GenericActionButtonCell,
  GenericDateHandlerCell,
  GenericNameHandlerCell,
  PatientActionCell,
} from "./action-cells";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium ">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ActionsCell,
  },
];

export const columnEncounters: ColumnDef<Encounters>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const encounters = row.original;
      return <p className="text-14-medium ">{encounters?.patient?.name}</p>;
    },
  },
  {
    accessorKey: "date_and_time",
    header: "Date and Time",
    cell: ({ row }) => {
      const encounters = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(encounters.date_and_time).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const encounters = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === encounters.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const encounters = row.original;
      return <p className="text-14-medium ">{encounters.location}</p>;
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const encounters = row.original;
      return <p className="text-14-medium ">{encounters.reason}</p>;
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => <EncounterActionCell row={row} />,
  },
];

export const columnsPatient: ColumnDef<Patients, any>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => <PatientActionCell row={row} />,
  },
];

export const patientSymptoms: ColumnDef<Symptoms, any>[] = [
  // { accessorKey: "$id", header: "ID" },
  {
    accessorKey: "$createdAt",
    header: "Created At",
    cell: ({ row }) => <GenericDateHandlerCell row={row} />,
  },
  // { accessorKey: "symptom_description", header: "Symptom Description" },
  // { accessorKey: "duration", header: "Duration" },
  // { accessorKey: "severity", header: "Severity" },
  // { accessorKey: "onset", header: "Onset" },
  // { accessorKey: "aggravating_factors", header: "Aggravating Factors" },
  // { accessorKey: "relieving_factors", header: "Relieving Factors" },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => <GenericNameHandlerCell row={row} />,
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => (
      <GenericActionButtonCell
        columnValue={MEDICAL_DETAILS.SYMPTOMS.value}
        row={row}
      />
    ),
  },
];

export const patientMedicalHistory: ColumnDef<MedicalHistory, any>[] = [
  // { accessorKey: "$id", header: "ID" },
  {
    accessorKey: "$createdAt",
    header: "Created At",
    cell: ({ row }) => <GenericDateHandlerCell row={row} />,
  },
  // { accessorKey: "past_medical_conditions", header: "Past Medical Conditions" },
  // { accessorKey: "past_surgical_history", header: "Past Surgical History" },
  // { accessorKey: "current_medications", header: "Current Medications" },
  // { accessorKey: "allergies", header: "Allergies" },
  // { accessorKey: "immunization_history", header: "Immunization History" },
  // { accessorKey: "family_medical_history", header: "Family Medical History" },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => <GenericNameHandlerCell row={row} />,
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => (
      <GenericActionButtonCell
        columnValue={MEDICAL_DETAILS.MEDICAL_HISTORY.value}
        row={row}
      />
    ),
  },
];

export const patientPhysicalExaminationFindings: ColumnDef<
  PhysicalExamFindings,
  any
>[] = [
  // { accessorKey: "$id", header: "ID" },
  {
    accessorKey: "$createdAt",
    header: "Created At",
    cell: ({ row }) => <GenericDateHandlerCell row={row} />,
  },
  // { accessorKey: "general_appearance", header: "General Appearance" },
  // { accessorKey: "head_and_neck", header: "Head and Neck" },
  // { accessorKey: "cardiovascular_system", header: "Cardiovascular System" },
  // { accessorKey: "respiratory_system", header: "Respiratory System" },
  // { accessorKey: "gastrointestinal_system", header: "Gastrointestinal System" },
  // { accessorKey: "genitourinary_system", header: "Genitourinary System" },
  // { accessorKey: "musculoskeletal", header: "Musculoskeletal" },
  // { accessorKey: "neurological_system", header: "Neurological System" },
  // { accessorKey: "skin", header: "Skin" },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => <GenericNameHandlerCell row={row} />,
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => (
      <GenericActionButtonCell
        columnValue={MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value}
        row={row}
      />
    ),
  },
];

export const patientVitalSigns: ColumnDef<VitalSign, any>[] = [
  // { accessorKey: "$id", header: "ID" },
  {
    accessorKey: "$createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="flex w-full items-center justify-start pl-4 text-left">
        <GenericDateHandlerCell row={row} />,
      </div>
    ),
  },
  // { accessorKey: "blood_pressure", header: "Blood Pressure" },
  // { accessorKey: "heart_rate", header: "Heart Rate" },
  // { accessorKey: "respiratory_rate", header: "Respiratory Rate" },
  // { accessorKey: "temperature", header: "Temperature" },
  // { accessorKey: "oxygen_saturation", header: "Oxygen Saturation" },
  // { accessorKey: "weight", header: "Weight" },
  // { accessorKey: "height", header: "Height" },
  // { accessorKey: "body_mass_index", header: "Body Mass Index" },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => <GenericNameHandlerCell row={row} />,
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => (
      <GenericActionButtonCell
        columnValue={MEDICAL_DETAILS.VITAL_SIGNS.value}
        row={row}
      />
    ),
  },
];
