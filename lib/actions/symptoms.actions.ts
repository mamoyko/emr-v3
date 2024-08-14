"use server";

import { ID, Query } from "node-appwrite";

import {
  DATABASE_ID,
  SYMPTOMS_COLLECTION_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createSymptoms = async (
  symptoms: CreateSymptomsParams
): Promise<{ ok: boolean; code: number; message: string; data: any }> => {
  if (!symptoms) {
    console.error("No symptoms data provided.");
    return {
      ok: false,
      code: 400,
      message: "Symptoms data is required.",
      data: null,
    };
  }

  try {
    const symptomsData = await databases.createDocument(
      DATABASE_ID!,
      SYMPTOMS_COLLECTION_ID!,
      ID.unique(),
      symptoms
    );

    return {
      ok: true,
      code: 201,
      message: "Symptoms created successfully.",
      data: symptomsData,
    };
  } catch (error: any) {
    console.error("Error creating symptoms:", error);
    return {
      ok: false,
      code: 500,
      message: `Error creating symptoms: ${error.message || "Unknown error"}`,
      data: null,
    };
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
