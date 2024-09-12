import React, { Fragment } from "react";

import { NAVIGATION_PROCESS_CONFIGURATION } from "@/components/enums/medicalDetailsEnums";
import MedicalDetailsFormHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import { DataTableDimension } from "@/components/table/DataTable";

const NavCardContentComponent = ({
  tableProcess,
  handleFormProcess,
  handleStateChange,
  userId,
}) => {
  console.log("tableProcess", tableProcess);
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default NavCardContentComponent;
