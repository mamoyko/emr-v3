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
  { accessorKey: "name", header: "Name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: PatientActionCell,
  },
];

export const patientSymptoms: ColumnDef<Patients, any>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: PatientActionCell,
  },
];

export const patientMedicalHistory: ColumnDef<Patients, any>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: PatientActionCell,
  },
];

export const patientPhysicalMedicationFindings: ColumnDef<Patients, any>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: PatientActionCell,
  },
];

export const patientVitalSigns: ColumnDef<Patients, any>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: PatientActionCell,
  },
];
