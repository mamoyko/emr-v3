"use server";

import { ID, Query } from "node-appwrite";

import {
  responseCreate,
  responseError,
  responseFail,
  responseSuccess,
} from "../../components/helperComponent/helperResponse/FnResponseHelper";
import {
  DATABASE_ID,
  MEDICAL_HISTORY_COLLECTION_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createMedicalHistory = async (
  medicalHistory: createMedicalHistory
) => {
  if (!medicalHistory) return responseFail({ failData: "Data" });

  try {
    const medicalHistorydata = await databases.createDocument(
      DATABASE_ID!,
      MEDICAL_HISTORY_COLLECTION_ID!,
      ID.unique(),
      medicalHistory
    );

    return responseCreate({ successData: medicalHistorydata });
  } catch (error: any) {
    console.error("Error creating Medical History:", error);
    return responseError({ errorData: error });
  }
};

export const getMedicalHstoryByUserId = async (userId: string) => {
  try {
    if (!userId) return responseFail({ failData: "ID" });

    const medicalHistory = await databases.listDocuments(
      DATABASE_ID!,
      MEDICAL_HISTORY_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")][Query.equal("$id", [userId])]
    );
    return responseSuccess({ successData: medicalHistory.documents });
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user medical details:",
      error
    );
  }
};
