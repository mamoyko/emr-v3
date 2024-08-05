"use server";

// import { revalidatePath } from "next/cache";
// import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

// import { Appointment, Encounters } from "@/types/appwrite.types";

import {
  ENCOUNTER_COLLECTION_ID,
  DATABASE_ID,
  databases,
  APPOINTMENT_COLLECTION_ID,
  // messaging,
  // APPOINTMENT_COLLECTION_ID,
} from "../appwrite.config";
// import { formatDateTime, parseStringify } from "../utils";
import { parseStringify } from "../utils";

// import { sendSMSNotification } from "./appointment.actions";

//  CREATE ENCOUNTERS
export const createEncounter = async (encounters: CreateEncounterParams) => {
  try {
    const newEncounter = await databases.createDocument(
      DATABASE_ID!,
      ENCOUNTER_COLLECTION_ID!,
      ID.unique(),
      encounters
    );

    revalidatePath("/admin");
    return parseStringify(newEncounter);
  } catch (error) {
    console.error("An error occurred while creating a new encounter:", error);
  }
};

//  GET APPOINTMENT
// export const createAppointment = async (
//   appointment: CreateAppointmentParams
// ) => {
//   try {
//     const newAppointment = await databases.createDocument(
//       DATABASE_ID!,
//       APPOINTMENT_COLLECTION_ID!,
//       ID.unique(),
//       appointment
//     );

//     revalidatePath("/admin");
//     return parseStringify(newAppointment);
//   } catch (error) {
//     console.error("An error occurred while creating a new appointment:", error);
//   }
// };

//  GET RECENT APPOINTMENTS
export const getEncounterList = async () => {
  try {
    const encounters = await databases.listDocuments(
      DATABASE_ID!,
      ENCOUNTER_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const data = {
      totalCount: encounters.total,
      documents: encounters.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent encounters:",
      error
    );
  }
};

//  SEND SMS NOTIFICATION
// export const sendSMSNotification = async (userId: string, content: string) => {
//   try {
//     // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
//     const message = await messaging.createSms(
//       ID.unique(),
//       content,
//       [],
//       [userId]
//     );
//     return parseStringify(message);
//   } catch (error) {
//     console.error("An error occurred while sending sms:", error);
//   }
// };

//  UPDATE APPOINTMENT
// export const updateAppointment = async ({
//   appointmentId,
//   userId,
//   appointment,
//   type,
// }: UpdateAppointmentParams) => {
//   try {
//     // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
//     const updatedAppointment = await databases.updateDocument(
//       DATABASE_ID!,
//       APPOINTMENT_COLLECTION_ID!,
//       appointmentId,
//       appointment
//     );

//     if (!updatedAppointment) throw Error;

//     const smsMessage = `Greetings from LeonCare 24/7. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
//     await sendSMSNotification(userId, smsMessage);

//     revalidatePath("/admin");
//     return parseStringify(updatedAppointment);
//   } catch (error) {
//     console.error("An error occurred while scheduling an appointment:", error);
//   }
// };

// GET APPOINTMENT
export const getEncounters = async (patientId: string) => {
  try {
    const encounters = await databases.listDocuments(
      DATABASE_ID!,
      ENCOUNTER_COLLECTION_ID!,
      [Query.equal("patient", [patientId])]
    );

    return parseStringify(encounters.documents);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};
