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
  VITAL_SIGNS_COLLECTION_ID,
  databases,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createVitalSigns = async (vitalSign: createVitalSigns) => {
  if (!vitalSign) return responseFail({ failData: "Data" });

  try {
    const vitalSignData = await databases.createDocument(
      DATABASE_ID!,
      VITAL_SIGNS_COLLECTION_ID!,
      ID.unique(),
      vitalSign
    );

    return responseCreate({ successData: vitalSignData });
  } catch (error: any) {
    console.error("Error creating Vital Signs:", error);
    return responseError({ errorData: error });
  }
};

export const getVitalSignsByUserId = async (userId: string) => {
  try {
    if (!userId) return responseFail({ failData: "ID" });

    const vitalSign = await databases.listDocuments(
      DATABASE_ID!,
      VITAL_SIGNS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")][Query.equal("$id", [userId])]
    );
    return responseSuccess({ successData: vitalSign?.documents });
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};
