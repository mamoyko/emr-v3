import { Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Appointment, Encounters, Patients } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { MEDICAL_DETAILS } from "../enums/medicalDetailsEnums";
import MedicalDetailsFormHelper from "../forms/singularMedicalDetailsForm/MedicalDetailsFormHelper";
import TabularFormPage from "../forms/tabularDetailForms/TabularFormPage";
import "react-datepicker/dist/react-datepicker.css";
import { DialogCellComponent } from "../helperComponent/DialogComponent";
import UseRouting from "../helperFunctions/UseRouting";

type ActionsCellProps = {
  row: Row<Appointment>;
};

type EncounterCellProps = {
  row: Row<Encounters>;
};

type PatientCellProps = {
  row: Row<Patients>;
};

type GenericActionCellProps = {
  row: any;
  columnValue: string;
};

type GenericNameHandlerCellProps = {
  row: any;
};

interface GenericDateCellProps {
  row: {
    original: {
      $createdAt?: string;
    };
  };
}

export const ActionsCell: React.FC<ActionsCellProps> = ({ row }) => {
  const router = useRouter();
  const appointment = row.original;
  const handleDetailsClick = () => {
    router.push(`/admin/patients/${appointment.userId}`);
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        className="capitalize text-rose-500"
        onClick={handleDetailsClick}
      >
        Details
      </Button>
      <AppointmentModal
        patientId={appointment.patient.$id}
        userId={appointment.userId}
        appointment={appointment}
        type="schedule"
        title="Schedule Appointment"
        description="Please confirm the following details to schedule."
      />
      <AppointmentModal
        patientId={appointment.patient.$id}
        userId={appointment.userId}
        appointment={appointment}
        type="cancel"
        title="Cancel Appointment"
        description="Are you sure you want to cancel your appointment?"
      />
    </div>
  );
};

export const EncounterActionCell: React.FC<EncounterCellProps> = ({ row }) => {
  const router = useRouter();
  const encounter = row.original;

  return (
    <div className="flex gap-1">
      <DialogCellComponent
        dialogStyle={{
          maxHeight: `calc(100vh - 50px)`,
        }}
        row={encounter}
        ComponentDialogTitle={`${!encounter?.patient ? "n/a" : encounter?.patient?.name} Medical Details`}
        ComponentDialogDescription={
          <TabularFormPage
            mode={"view"}
            setEnounterMedicalDetails={() => {}}
            hideModeButton={true}
          />
        }
      />
    </div>
  );
};

export const PatientActionCell: React.FC<PatientCellProps> = ({ row }) => {
  const router = useRouter();
  const patient = row.original;
  const { routePath } = UseRouting();
  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        className="capitalize text-lime-500"
        onClick={() => routePath(`/admin/patients/${patient.userId}`)}
      >
        Medical Details
      </Button>
    </div>
  );
};

export const GenericActionButtonCell: React.FC<GenericActionCellProps> = ({
  row,
  columnValue = "",
}) => {
  const rawDocument = row.original;
  return (
    <div className="flex gap-1">
      <DialogCellComponent
        dialogStyle={{
          maxHeight: `calc(100vh - 50px)`,
        }}
        row={rawDocument}
        ComponentDialogTitle={`${rawDocument?.patient?.name ?? ""} Medical Details`}
        ComponentDialogDescription={
          <MedicalDetailsFormHelper
            isLoading={false}
            handleLoading={() => {}}
            handleReturn={() => {}}
            currentTab={{
              tab: columnValue,
              tabData: [rawDocument],
            }}
            mode={"view"}
            MEDICAL_DETAILS={MEDICAL_DETAILS}
            userId={""}
            handleState={() => {}}
          />
        }
      />
    </div>
  );
};

export const GenericDateHandlerCell: React.FC<GenericDateCellProps> = ({
  row,
}) => {
  const DOCUMENT = row.original;
  const dateString = DOCUMENT?.$createdAt ?? null;

  const date = new Date(dateString);
  const formattedDate = format(date, "EEEE, MMMM d yyyy hh:mm a");

  return (
    <div className="flex gap-1">
      <span>{formattedDate}</span>
    </div>
  );
};

export const GenericNameHandlerCell: React.FC<GenericNameHandlerCellProps> = ({
  row,
}) => {
  const { patient } = row.original;
  const clientName = patient?.name ?? "Unknown";
  return (
    <div className="flex gap-1">
      <span>{clientName}</span>
    </div>
  );
};
