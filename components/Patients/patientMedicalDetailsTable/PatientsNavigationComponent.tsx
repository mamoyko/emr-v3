import { Fragment, useEffect, useState } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import MedicalDetailsFormHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import { CustomGenericButton } from "@/components/helperComponent/ButtonComponent";
import { DataTableDimension } from "@/components/table/DataTable";

import { NAVIGATION_FORM_PROCESS } from "./PatientNavEnums";

const EXCLUDED_MEDICAL_DETAILS = [MEDICAL_DETAILS.ENCOUNTERS.value];

export const TitleComponent = ({
  dataCollection,
  tableProcess,
  handleFormProcess,
  toFormProcess,
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex-1 truncate">
        <p className="text-xl tracking-wide">
          {
            MEDICAL_DETAILS[
              tableProcess.navigation.toUpperCase().replace(/-/g, "_")
            ]?.title
          }
        </p>
      </div>

      {EXCLUDED_MEDICAL_DETAILS.includes(
        MEDICAL_DETAILS[
          tableProcess.navigation.toUpperCase().replace(/-/g, "_")
        ]?.value
      ) ? (
        <Fragment />
      ) : (
        <CustomGenericButton
          onClick={() =>
            handleFormProcess(
              toFormProcess
                ? NAVIGATION_FORM_PROCESS.NAV_TABLE
                : NAVIGATION_FORM_PROCESS.NAV_CREATE_EDIT
            )
          }
          isLoading={!dataCollection?.userId}
          baseClassStyle="text-xs"
          buttonText={toFormProcess ? "Back" : "Add"}
          variant={toFormProcess ? "danger" : "primary"}
          loadingControl={{
            height: 10,
            width: 20,
            text: "",
            brightness: "0%",
          }}
        />
      )}
    </div>
  );
};

export const ContentComponent = ({
  handleFormProcess,
  tableProcess,
  userId,
  handleStateChange,
  VERTICAL_TAB_HEIGHT_CONTROL,
}) => {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {tableProcess?.isInForm === NAVIGATION_FORM_PROCESS.NAV_VIEW && (
        <MedicalDetailsFormHelper
          handleLoading={() => {}}
          handleReturn={() =>
            handleFormProcess(NAVIGATION_FORM_PROCESS.NAV_TABLE)
          }
          isLoading={false}
          currentTab={{
            tab: tableProcess?.navigation,
            tabData: tableProcess?.formData,
          }}
          MEDICAL_DETAILS={MEDICAL_DETAILS}
          mode={"view"}
          userId={userId}
          handleState={(data: any) => {
            const collectedData = Array.isArray(data) ? data : [data];
            handleStateChange("dataTableData", [
              ...tableProcess?.dataTableData,
              ...collectedData,
            ]);
          }}
        />
      )}

      {tableProcess?.isInForm === NAVIGATION_FORM_PROCESS.NAV_CREATE_EDIT && (
        <MedicalDetailsFormHelper
          handleLoading={() => {}}
          handleReturn={() =>
            handleFormProcess(NAVIGATION_FORM_PROCESS.NAV_TABLE)
          }
          isLoading={false}
          currentTab={{
            tab: tableProcess?.navigation,
            tabData: tableProcess?.formData,
          }}
          MEDICAL_DETAILS={MEDICAL_DETAILS}
          mode={"edit"}
          userId={userId}
          handleState={(data: any) => {
            const collectedData = Array.isArray(data) ? data : [data];
            handleStateChange("dataTableData", [
              ...tableProcess?.dataTableData,
              ...collectedData,
            ]);
          }}
        />
      )}

      {tableProcess?.isInForm === NAVIGATION_FORM_PROCESS.NAV_TABLE && (
        <DataTableDimension
          heightToSubtrct={400 + VERTICAL_TAB_HEIGHT_CONTROL}
          columns={tableProcess?.columnsTableData || []}
          data={tableProcess?.dataTableData || []}
        />
      )}
    </div>
  );
};
