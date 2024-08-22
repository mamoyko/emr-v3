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
    <div className="flex w-full flex-col items-center justify-center rounded-xl bg-slate-950 md:flex-row">
      <div className="flex h-[180px] w-[320px] items-start overflow-y-auto py-[6px] pl-2">
        <div className="flex size-full items-center justify-center bg-lime-900">
          Image box
        </div>
      </div>

      <figure className=" m-2 size-full  p-3 dark:bg-slate-800 lg:flex lg:p-1">
        <div className="size-full space-y-2 text-center lg:px-8 lg:py-1 lg:text-left">
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
              label: "Emergency Contact Number",
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
    <article
      key={item.label}
      className="prose lg:prose-xl flex w-full items-center"
    >
      <h1 className="mr-4">{item.label}:</h1>
      <p>{item.value}</p>
    </article>
  );
};
