import { Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Appointment, Encounters } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { MEDICAL_DETAILS } from "../enums/medicalDetailsEnums";
import MedicalDetailsFormHelper from "../forms/medicalDetailsForm/MedicalDetailsFormHelper";
import DialogCellComponent from "../helperComponent/DialogCellComponent";
import "react-datepicker/dist/react-datepicker.css";

type ActionsCellProps = {
  row: Row<Appointment>;
};

type EncounterCellProps = {
  row: Row<Encounters>;
};

type PatientCellProps = {
  row: Row<Encounters>;
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
    router.push(`/admin/patients/${appointment.patient.$id}`);
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

  const handleDetailsClick = () => {
    router.push(`/admin/encounters/${encounter.$id}`);
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        className="capitalize text-lime-500"
        onClick={handleDetailsClick}
      >
        Medical Details
      </Button>
    </div>
  );
};

export const PatientActionCell: React.FC<PatientCellProps> = ({ row }) => {
  const router = useRouter();
  const patient = row.original;
  const handleDetailsClick = () => {
    router.push(`/admin/patients/${patient.$id}`);
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        className="capitalize text-lime-500"
        onClick={handleDetailsClick}
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
  const router = useRouter();
  const rawDocument = row.original;
  console.log("rawDocument", rawDocument);
  return (
    <div className="flex gap-1">
      <DialogCellComponent row={rawDocument}>
        {/* <MedicalDetailsFormHelper
          currentTab={{ tab: columnValue, tabData: rawDocument }}
          mode={"view"}
          MEDICAL_DETAILS={MEDICAL_DETAILS}
        /> */}
        <div>sasasa</div>
      </DialogCellComponent>
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
