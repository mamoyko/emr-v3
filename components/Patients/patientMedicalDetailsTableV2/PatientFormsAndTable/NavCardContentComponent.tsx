import React, { Fragment } from "react";

import {
  CONFIGURATION_MODE,
  NAVIGATION_PROCESS_CONFIGURATION,
} from "@/components/enums/medicalDetailsEnums";
import MedicalDetailsFormGenericHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormGenericHelper";
import MedicalDetailsFormHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import { DataTableDimension } from "@/components/table/DataTable";

const NavCardContentComponent = ({
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

export default NavCardContentComponent;
