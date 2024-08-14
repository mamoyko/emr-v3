"use server";

import { ID, Query } from "node-appwrite";

import {
  DATABASE_ID,
  VITAL_SIGNS_COLLECTION_ID,
  databases,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

import { handleResponse } from "./actionsHelper";

export const createVitalSigns = async (
  vitalSign: createVitalSigns
): Promise<{ ok: boolean; code: number; message: string; data: any }> => {
  if (!vitalSign) {
    return handleResponse({
      success: false,
      errorCode: 400,
      errorMessage: "Vital Sign data is required.",
    });
  }

  try {
    const vitalSignData = await databases.createDocument(
      DATABASE_ID!,
      VITAL_SIGNS_COLLECTION_ID!,
      ID.unique(),
      vitalSign
    );

    return handleResponse({
      success: true,
      successCode: 201,
      successMessage: "Vital Signs created successfully.",
      data: vitalSignData,
    });
  } catch (error: any) {
    console.error("Error creating Vital Signs:", error);
    return handleResponse({
      success: false,
      errorCode: 500,
      errorMessage: `Error creating Vital Signs: ${error.message || "Unknown error"}`,
      errorData: error,
    });
  }
};

export const getVitalSignsByUserId = async (userId: string) => {
  try {
    const vitalSign = await databases.listDocuments(
      DATABASE_ID!,
      VITAL_SIGNS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")][Query.equal("$id", [userId])]
    );
    const data = {
      totalCount: vitalSign.total,
      documents: vitalSign.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};
