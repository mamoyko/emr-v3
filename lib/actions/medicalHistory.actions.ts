"use server";

import { ID, InputFile, Query } from "node-appwrite";

import {
  DATABASE_ID,
  MEDICAL_HISTORY_COLLECTION_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

import { handleResponse } from "./actionsHelper";

// CREATE APPWRITE USER
export const createMedicalHistory = async (
  medicalHistory: createMedicalHistory
): Promise<{ ok: boolean; code: number; message: string; data: any }> => {
  if (!medicalHistory) {
    return handleResponse({
      success: false,
      errorCode: 400,
      errorMessage: "Physical Examination Findings data is required.",
    });
  }
  try {
    const medicalHistorydata = await databases.createDocument(
      DATABASE_ID!,
      MEDICAL_HISTORY_COLLECTION_ID!,
      ID.unique(),
      medicalHistory
    );

    return handleResponse({
      success: true,
      successCode: 201,
      successMessage: "Physical Examination Findings created successfully.",
      data: medicalHistorydata,
    });
  } catch (error: any) {
    console.error("Error creating Physical Examination Findings:", error);
    return handleResponse({
      success: false,
      errorCode: 500,
      errorMessage: `Error creating Physical Examination Findings: ${error.message || "Unknown error"}`,
      errorData: error,
    });
  }
};

export const getMedicalHstoryByUserId = async (userId: string) => {
  try {
    const medicalHistory = await databases.listDocuments(
      DATABASE_ID!,
      MEDICAL_HISTORY_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")][Query.equal("$id", [userId])]
    );
    const data = {
      totalCount: medicalHistory.total,
      documents: medicalHistory.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};
