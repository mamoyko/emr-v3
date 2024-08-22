"use client";
import { format } from "date-fns";

const PatientInfoComponent = ({ patient }) => {
  const handleDateFormat = (dateString: string) => {
    console.log("dateString", dateString);
    if (!dateString) return;
    const date = new Date(dateString);
    return format(date, "MMMM  d  yyyy");
  };
  return (
    <div className="grid grid-flow-col gap-5 md:grid-rows-1">
      <div className="grid grid-rows-subgrid md:mb-0 md:w-[250px]">
        <div className="flex h-[180px] w-full items-center justify-center rounded-lg bg-gray-200">
          image box
        </div>
      </div>

      <div
        className="grid grid-flow-col grid-cols-2 p-1 md:grid-rows-1"
        style={{ border: "1px solid black" }}
      >
        <div className="grid grid-flow-dense">
          <div>
            <span className="font-semibold">Name:</span> {patient.name}
          </div>
          <div>
            <span className="font-semibold">Address:</span> {patient.address}
          </div>
          <div>
            <span className="font-semibold">Contact no.:</span> {patient.phone}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {patient.email}
          </div>
          <div>
            <span className="font-semibold">Gender:</span> {patient.gender}
          </div>
        </div>

        <div className="grid grid-flow-dense">
          <div>
            <span className="font-semibold">Occupation:</span>
            {patient.occupation}
          </div>
          <div>
            <span className="font-semibold">Birth Date:</span>
            {handleDateFormat(patient.birthDate)}
          </div>
          <div>
            <span className="font-semibold">Emergency Contact:</span>
            {patient.emergencyContactName}
          </div>
          <div>
            <span className="font-semibold">Emergency Contact Number:</span>
            {patient.emergencyContactNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoComponent;
