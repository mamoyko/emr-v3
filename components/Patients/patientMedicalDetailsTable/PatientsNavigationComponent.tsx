import { Fragment } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import MedicalDetailsFormHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import { DataTableDimension } from "@/components/table/DataTable";

const EXCLUDED_MEDICAL_DETAILS = [MEDICAL_DETAILS.ENCOUNTERS.value];

export const TitleComponent = ({ tableProcess, handleDetailsClick }) => {
  return (
    <div className=" flex h-[15px] w-full items-start justify-between">
      <div className="flex-1 truncate">
        {
          MEDICAL_DETAILS[
            tableProcess.navigation.toUpperCase().replace(/-/g, "_")
          ]?.title
        }
      </div>

      {EXCLUDED_MEDICAL_DETAILS.includes(
        MEDICAL_DETAILS[
          tableProcess.navigation.toUpperCase().replace(/-/g, "_")
        ]?.value
      ) ? (
        <Fragment />
      ) : (
        <button
          type="button"
          disabled={false}
          className={`text-white focus:outline-none ${
            tableProcess.isInForm
              ? "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-900"
              : "bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800"
          } mb-2 me-2 rounded-md px-5 py-2 text-xs font-medium `}
          onClick={handleDetailsClick}
        >
          {tableProcess.isInForm ? "Back" : "Add"}
        </button>
      )}
    </div>
  );
};

export const ContentComponent = ({
  handleDetailsClick,
  tableProcess,
  userId,
  handleStateChange,
  VERTICAL_TAB_HEIGHT_CONTROL,
}) => {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {tableProcess?.isInForm ? (
        <MedicalDetailsFormHelper
          handleLoading={() => {}}
          handleReturn={handleDetailsClick}
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
      ) : (
        <DataTableDimension
          heightToSubtrct={500 + VERTICAL_TAB_HEIGHT_CONTROL}
          columns={tableProcess?.columnsTableData || []}
          data={tableProcess?.dataTableData || []}
        />
      )}
    </div>
  );
};
