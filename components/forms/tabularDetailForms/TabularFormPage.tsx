"use client";

import React, { Fragment, useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import UseRouting from "@/components/helperFunctions/UseRouting";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FormMedicalHistory from "../medicalDetailsForm/FormMedicalHistory";
import FormPhysicalExaminationFindings from "../medicalDetailsForm/FormPhysicalExaminationFindings";
import FormSymptoms from "../medicalDetailsForm/FormSymptoms";
import FormVitalSigns from "../medicalDetailsForm/FormVitalSigns";

interface TabularFormPageProps {
  mode: string;
  setEnounterMedicalDetails: Function;
  hideModeButton: boolean;
}

type FetchFunction = (parameters?: any) => Promise<any>;

const formComponents = {
  [MEDICAL_DETAILS.MEDICAL_HISTORY.value]: FormMedicalHistory,
  [MEDICAL_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.value]:
    FormPhysicalExaminationFindings,
  [MEDICAL_DETAILS.SYMPTOMS.value]: FormSymptoms,
  [MEDICAL_DETAILS.VITAL_SIGNS.value]: FormVitalSigns,
};

const TabularFormPage: React.FC<TabularFormPageProps> = ({
  mode,
  setEnounterMedicalDetails,
  hideModeButton = false,
}) => {
  const { routePathId, routePath } = UseRouting();

  const [currentTab, setCurrentTab] = useState({
    tab: MEDICAL_DETAILS.SYMPTOMS.value,
    tabData: [],
  });

  const handleTabChange = async (value: string) => {
    setCurrentTab((prevState) => {
      const collection = { ...prevState };
      collection.tab = value;
      return collection;
    });
    routePathId("active", value);
  };

  const handleSubmitForm = async (data: any) => {
    console.log("TabularFormPage", data);
  };
  const FormComponent = formComponents[currentTab.tab] || null;

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <div className="mb-4 flex items-center justify-between space-x-4">
        {!hideModeButton && (
          <Button
            onClick={(event) => {
              setEnounterMedicalDetails((prevMode: any) => {
                const collection = { ...prevMode };
                collection.mode = prevMode.mode === "edit" ? "view" : "edit";
                return collection;
              });
              event.stopPropagation();
            }}
            className="shad-gray-btn"
          >
            {mode === "view" ? "Add Medical Details" : "View Medical Details"}
          </Button>
        )}
        {!hideModeButton && (
          <Button
            onClick={(event) => {
              routePath(`/admin/encounters`);
              event.stopPropagation();
            }}
            className="shad-danger-btn"
          >
            Back
          </Button>
        )}
      </div>

      <Tabs value={currentTab.tab} onValueChange={handleTabChange}>
        <TabsList className="flex flex-wrap justify-center border-b border-gray-200 bg-gray-50">
          {Object.values(MEDICAL_DETAILS).map((detail) => (
            <TabsTrigger
              key={detail.value}
              className={`px-4 py-2 text-center transition-colors duration-300 ease-in-out ${
                currentTab.tab === detail.value
                  ? "border-b-2 border-blue-700 font-semibold text-blue-700"
                  : "text-gray-600 hover:text-blue-700"
              }`}
              value={detail.value}
            >
              {detail.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-4">
          <TabsContent value={currentTab.tab}>
            <div className="size-full">
              {FormComponent && (
                <FormComponent
                  userId={""}
                  handleSubmitForm={handleSubmitForm}
                  initialValue={currentTab.tabData}
                  mode={mode}
                  isMultiForm={false}
                  isLoading={false}
                />
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TabularFormPage;
