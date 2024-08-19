"use server";

import { ID, Query } from "node-appwrite";

import {
  responseCreate,
  responseError,
  responseFail,
  responseSuccess,
} from "../../components/helperComponent/helperResponse/ResponseCollection";
import {
  DATABASE_ID,
  SYMPTOMS_COLLECTION_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createSymptoms = async (symptoms: CreateSymptomsParams) => {
  if (!symptoms) return responseFail({ failData: "Data" });

  try {
    const symptomsData = await databases.createDocument(
      DATABASE_ID!,
      SYMPTOMS_COLLECTION_ID!,
      ID.unique(),
      symptoms
    );

    return responseCreate({ successData: symptomsData });
  } catch (error: any) {
    console.error("Error creating Symptoms:", error);
    return responseError({ errorData: error });
  }
};

export const getSymptomsByUserId = async (userId: string) => {
  try {
    if (!userId) return responseFail({ failData: "ID" });

    const symptoms = await databases.listDocuments(
      DATABASE_ID!,
      SYMPTOMS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")][Query.equal("$id", [userId])]
    );
    return responseSuccess({ successData: symptoms?.documents });
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user symptoms:",
      error
    );
  }
};
