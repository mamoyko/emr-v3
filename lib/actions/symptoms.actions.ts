"use server";

import { ID, Query } from "node-appwrite";

import {
  DATABASE_ID,
  SYMPTOMS_COLLECTION_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

import { handleResponse } from "./actionsHelper";

export const createSymptoms = async (
  symptoms: CreateSymptomsParams
): Promise<{ ok: boolean; code: number; message: string; data: any }> => {
  if (!symptoms) {
    return handleResponse({
      success: false,
      errorCode: 400,
      errorMessage: "Symptoms data is required.",
    });
  }

  try {
    const symptomsData = await databases.createDocument(
      DATABASE_ID!,
      SYMPTOMS_COLLECTION_ID!,
      ID.unique(),
      symptoms
    );

    return handleResponse({
      success: true,
      successCode: 201,
      successMessage: "Symptoms created successfully.",
      data: symptomsData,
    });
  } catch (error: any) {
    console.error("Error creating Symptoms:", error);
    return handleResponse({
      success: false,
      errorCode: 500,
      errorMessage: `Error creating Symptoms: ${error.message || "Unknown error"}`,
      errorData: error,
    });
  }
};

export const getSymptomsByUserId = async (userId: string) => {
  try {
    const symptoms = await databases.listDocuments(
      DATABASE_ID!,
      SYMPTOMS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")][Query.equal("$id", [userId])]
    );
    const data = {
      totalCount: symptoms.total,
      documents: symptoms.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};
