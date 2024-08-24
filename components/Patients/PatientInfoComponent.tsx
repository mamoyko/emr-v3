"use client";
import { format, parseISO, isValid } from "date-fns";

import { cn } from "@/lib/utils";

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
      <figure className="m-2 flex size-full flex-col rounded-xl bg-gradient-to-r from-green-600 via-teal-900 to-emerald-950 p-3 lg:flex lg:p-1">
        <div className="size-full space-y-1 rounded-3xl border border-b-white p-1 text-center lg:px-8 lg:py-1 lg:text-left">
          {" "}
          <DetailComponent
            item={{
              label: null,
              value: patient?.name,
            }}
            articleClass="items-center justify-center"
          />
        </div>
        <figure className=" flex size-full flex-row rounded-xl bg-gradient-to-r from-green-600 via-teal-900 to-emerald-950 p-3 lg:flex lg:p-1">
          <div className="size-full space-y-1 text-center lg:px-8 lg:py-1 lg:text-left">
            {[
              // { label: "Name", value: patient?.name || "" },
              { label: "Address", value: patient?.address || "" },
              { label: "Contact no.", value: patient?.phone || "" },
              { label: "Email", value: patient?.email || "" },
              { label: "Gender", value: patient?.gender || "" },
            ].map((item, index) => (
              <DetailComponent
                key={index}
                item={item}
                articleClass={"flex-col w-full md:flex-row "}
                valueClass="w-full"
              />
            ))}
          </div>
          <div className="size-full space-y-1 text-center lg:px-8 lg:py-1 lg:text-left">
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
              <DetailComponent
                key={index}
                item={item}
                articleClass={"flex-col w-full md:flex-row "}
                valueClass="w-full"
              />
            ))}
          </div>
        </figure>
      </figure>
    </div>
  );
};

export default PatientInfoComponent;

const DetailComponent = ({ item, articleClass = null, valueClass = null }) => {
  return (
    <article
      key={item.label}
      className={`flex w-full space-x-4  text-center md:flex-row ${articleClass}`}
    >
      {item.label && (
        <p className="shrink-0 truncate text-sm sm:text-sm lg:text-base ">
          {item.label}:
        </p>
      )}
      <p
        className={`flex items-center truncate text-sm sm:text-sm lg:text-base ${valueClass}`}
      >
        {item.value}
      </p>
    </article>
  );
};
