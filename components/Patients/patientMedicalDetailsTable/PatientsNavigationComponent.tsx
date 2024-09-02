import { Fragment } from "react";

import { MEDICAL_DETAILS } from "@/components/enums/medicalDetailsEnums";
import MedicalDetailsFormHelper from "@/components/forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import { CustomGenericButton } from "@/components/helperComponent/ButtonComponent";
import { DataTableDimension } from "@/components/table/DataTable";

const EXCLUDED_MEDICAL_DETAILS = [MEDICAL_DETAILS.ENCOUNTERS.value];

export const TitleComponent = ({ tableProcess, handleDetailsClick }) => {
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
          onClick={handleDetailsClick}
          isLoading={false}
          baseClassStyle="text-xs"
          buttonText={tableProcess.isInForm ? "Back" : "Add"}
          variant={tableProcess.isInForm ? "danger" : "primary"}
          loadingControl={{
            height: 10,
            width: 20,
            text: "",
            brightness: "80%",
          }}
        />
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
          heightToSubtrct={400 + VERTICAL_TAB_HEIGHT_CONTROL}
          columns={tableProcess?.columnsTableData || []}
          data={tableProcess?.dataTableData || []}
        />
      )}
    </div>
  );
};
