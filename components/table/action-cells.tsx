import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Appointment,
  Encounters,
  Patient,
  Patients,
} from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import DialogCellComponent from "../helperComponent/DialogCellComponent";

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
  row: Row<Patients>;
};

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
}) => {
  const router = useRouter();
  const patient = row.original;

  return (
    <div className="flex gap-1">
      <DialogCellComponent row={patient} />
    </div>
  );
};
