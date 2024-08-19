"use server";

import { ID, InputFile, Query } from "node-appwrite";

import {
  responseCreate,
  responseError,
  responseFail,
  responseSuccess,
} from "../../components/helperComponent/helperResponse/FnResponseHelper";
import {
  DATABASE_ID,
  PHYSICAL_EXAM_COLLECTION_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createPhysicalExamFindings = async (
  physicalExamFindings: createPhysicalExaminationFindings
) => {
  if (!physicalExamFindings) {
    return responseFail({ failData: "Data" });
  }
  try {
    const physicalExamFindingsData = await databases.createDocument(
      DATABASE_ID!,
      PHYSICAL_EXAM_COLLECTION_ID!,
      ID.unique(),
      physicalExamFindings
    );

    return responseCreate({ successData: physicalExamFindingsData });
  } catch (error: any) {
    console.error("Error creating Physical Exam Findings:", error);
    return responseError({ errorData: error });
  }
};

export const getPhysicalExamFindingsByUserId = async (userId: string) => {
  try {
    if (!userId) return responseFail({ failData: "ID" });

    const physicalExamFindings = await databases.listDocuments(
      DATABASE_ID!,
      PHYSICAL_EXAM_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")][Query.equal("$id", [userId])]
    );
    return responseSuccess({ successData: physicalExamFindings?.documents });
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user physical exma findings:",
      error
    );
  }
};
