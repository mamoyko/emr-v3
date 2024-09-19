import React, { Fragment } from "react";

import {
  CONFIGURATION_MODE,
  NAVIGATION_LIST,
  NAVIGATION_PROCESS_CONFIGURATION,
} from "@/components/enums/medicalDetailsEnums";
import MedicalDetailsFormGenericHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormGenericHelper";
import MedicalDetailsFormHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import { CustomGenericButton } from "@/components/helperComponent/ButtonComponent";
import { DataTableDimension } from "@/components/table/DataTable";

const EXCLUDED_MEDICAL_DETAILS = [NAVIGATION_LIST.ENCOUNTERS.value];

export const NavCardContentComponent = ({
  tableProcess,
  handleFormProcess,
  handleStateChange,
  userId,
}) => {
  if (tableProcess.isWhatConfigurationMode === CONFIGURATION_MODE.MODE_FORM) {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <MedicalDetailsFormGenericHelper
          currentTab={{
            tab: tableProcess?.navigation,
            tabData: tableProcess?.dataTableData,
          }}
          mode={"view"}
          userId={userId}
          isLoading={false}
          handleState={handleStateChange}
          handleLoading={() => {}}
          handleReturn={() => {}}
        />
      </div>
    );
  }
  if (tableProcess.isWhatConfigurationMode === CONFIGURATION_MODE.MODE_TABLE) {
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {tableProcess?.isWhatConfiguration !==
          NAVIGATION_PROCESS_CONFIGURATION.NAV_TABLE && (
          <MedicalDetailsFormHelper
            handleLoading={() => {}}
            handleReturn={() =>
              handleFormProcess(NAVIGATION_PROCESS_CONFIGURATION.NAV_TABLE)
            }
            isLoading={false}
            currentTab={{
              tab: tableProcess?.navigation,
              tabData: tableProcess?.formData,
            }}
            mode={
              tableProcess?.isWhatConfiguration ===
              NAVIGATION_PROCESS_CONFIGURATION.NAV_CREATE_EDIT
                ? "edit"
                : "view"
            }
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

        {tableProcess?.isWhatConfiguration ===
          NAVIGATION_PROCESS_CONFIGURATION.NAV_TABLE && (
          <DataTableDimension
            heightToSubtrct={500}
            columns={tableProcess?.columnsTableData || []}
            data={tableProcess?.dataTableData || []}
          />
        )}
      </div>
    );
  }
  return <Fragment />;
};

export const NavCardTitleComponent = ({
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
            NAVIGATION_LIST[
              tableProcess?.navigation ?? "".toUpperCase().replace(/-/g, "_")
            ]?.title
          }
        </p>
      </div>

      {EXCLUDED_MEDICAL_DETAILS.includes(
        NAVIGATION_LIST[
          tableProcess?.navigation ?? "".toUpperCase().replace(/-/g, "_")
        ]?.value
      ) ? (
        <Fragment />
      ) : (
        <CustomGenericButton
          onClick={() =>
            handleFormProcess(
              toFormProcess
                ? NAVIGATION_PROCESS_CONFIGURATION.NAV_TABLE
                : NAVIGATION_PROCESS_CONFIGURATION.NAV_CREATE_EDIT
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
