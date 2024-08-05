"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment, Encounters, Patients } from "@/types/appwrite.types";

import { StatusBadge } from "../StatusBadge";

import {
  ActionsCell,
  EncounterActionCell,
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
    cell: EncounterActionCell,
  },
];

export const columnsPatient: ColumnDef<Patients, any>[] = [
  // { accessorKey: "$id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "occupation", header: "Occupation" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "allergies", header: "Allergies" },
  { accessorKey: "birthDate", header: "Birth Date" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "emergencyContactName", header: "Emergency Contact Name" },
  { accessorKey: "emergencyContactNumber", header: "Emergency Contact Number" },
  {
    accessorKey: "encounter",
    header: "Encounter",
    cell: ({ row }) => {
      const encounters = row.original.encounter;
      return <div>{JSON.stringify(encounters)}</div>;
    },
  },
  // {
  //   accessorKey: "identificationDocumentId",
  //   header: "Identification Document ID",
  // },
  // {
  //   accessorKey: "identificationDocumentUrl",
  //   header: "Identification Document URL",
  // },
  { accessorKey: "currentMedication", header: "Current Medication" },
  { accessorKey: "familyMedicalHistory", header: "Family Medical History" },
  { accessorKey: "identificationNumber", header: "Identification Number" },
  { accessorKey: "identificationType", header: "Identification Type" },
  { accessorKey: "insurancePolicyNumber", header: "Insurance Policy Number" },
  { accessorKey: "insuranceProvider", header: "Insurance Provider" },
  { accessorKey: "pastMedicalHistory", header: "Past Medical History" },
  { accessorKey: "primaryPhysician", header: "Primary Physician" },
  { accessorKey: "privacyConsent", header: "Privacy Consent" },
  {
    accessorKey: "symptoms",
    header: "Symptoms",
    cell: ({ row }) => {
      const symptoms = row.original.symptoms;
      return <div>{JSON.stringify(symptoms)}</div>;
    },
  },
  {
    accessorKey: "treatmentConsent",
    header: "Treatment Consent",
    cell: ({ row }) => {
      const treatmentConsent = row.original.treatmentConsent;
      return <div>{JSON.stringify(treatmentConsent)}</div>;
    },
  },
  // { accessorKey: "$collectionId", header: "Collection ID" },
  // { accessorKey: "$createdAt", header: "Created At" },
  // { accessorKey: "$updatedAt", header: "Updated At" },
  // { accessorKey: "$databaseId", header: "Database ID" },
  // { accessorKey: "$permissions", header: "Permissions" }, // array
  // { accessorKey: "$tenant", header: "Tenant" },
  { accessorKey: "vitalSigns", header: "Vital Signs" },
  { accessorKey: "userId", header: "User ID" },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: PatientActionCell,
  },
];
