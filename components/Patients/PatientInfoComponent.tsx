"use client";

// import EncountersAddPatientPage from "@/components/forms/encounters/EncountersAddPatientPage";
// import { Header } from "@/components/Header";

const PatientInfoComponent = () => {
  return (
    <div className="mx-auto flex max-w-7xl space-x-14 p-4">
      {/* First Box: Image Box */}
      <div className="shrink-0">
        <div className="flex size-40 items-center justify-center rounded-lg bg-gray-200">
          {/* Replace with patient image */}
          image box
        </div>
      </div>

      {/* Second Box: Details */}
      <div className="grow">
        <div className="space-y-4">
          <div>
            <span className="font-semibold">First Name:</span> John
          </div>
          <div>
            <span className="font-semibold">Last Name:</span> Doe
          </div>
          <div>
            <span className="font-semibold">Date of Birth:</span> 01/01/1990
          </div>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default PatientInfoComponent;
