"use client";
import { format, parseISO, isValid } from "date-fns";

const PatientInfoComponent = ({ patient }) => {
  const handleDateFormat = (dateString: string): string => {
    if (!dateString) return dateString;
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) {
        return dateString;
      }
      return format(date, "MMMM d, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg md:flex-row">
      <div className="flex h-[180px] w-[320px] items-start overflow-y-auto py-[6px] pl-2">
        <div className="flex size-full items-center justify-center rounded-xl bg-white text-black">
          Image box
        </div>
      </div>
      <figure className="m-2 flex size-full flex-row rounded-xl bg-gradient-to-r from-cyan-950 via-slate-900 to-zinc-900 p-3 lg:flex lg:p-1">
        <div className="size-full space-y-1 text-center lg:px-8 lg:py-1 lg:text-left">
          {[
            { label: "Name", value: patient?.name || "" },
            { label: "Address", value: patient?.address || "" },
            { label: "Contact no.", value: patient?.phone || "" },
            { label: "Email", value: patient?.email || "" },
            { label: "Gender", value: patient?.gender || "" },
          ].map((item, index) => (
            <DetailComponent key={index} item={item} />
          ))}
        </div>
        <div className="size-full space-y-2 text-center lg:px-8 lg:py-1 lg:text-left">
          {[
            { label: "Occupation", value: patient?.occupation || "" },
            {
              label: "Birth Date",
              value: handleDateFormat(patient?.birthDate) || "",
            },
            {
              label: "Emergency Contact",
              value: patient?.emergencyContactName || "",
            },
            {
              label: "Emergency Contact no.",
              value: patient?.emergencyContactNumber || "",
            },
          ].map((item, index) => (
            <DetailComponent key={index} item={item} />
          ))}
        </div>
      </figure>
    </div>
  );
};

export default PatientInfoComponent;

const DetailComponent = ({ item }) => {
  return (
    <article key={item.label} className="flex w-full items-center space-x-4">
      <p className="shrink-0 truncate text-sm sm:text-sm lg:text-base ">
        {item.label}:
      </p>
      <p className="flex w-fit items-center truncate text-sm sm:text-sm lg:text-base">
        {item.value}
      </p>
    </article>
  );
};
