"use client";
import { format, parseISO, isValid } from "date-fns";

import { LoaderGeneric } from "../../helperComponent/componentGeneric/LoadingGenericComponent";

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
          {!patient.name ? (
            <LoaderGeneric width={20} height={20} text="" />
          ) : (
            "Image box"
          )}
        </div>
      </div>
      <figure className="m-2 flex size-full flex-col rounded-xl bg-gradient-to-r from-green-600 via-teal-900 to-emerald-950 p-3 lg:flex lg:p-1">
        <div className="size-full space-y-1 rounded-3xl border border-b-white p-1 text-center lg:px-8 lg:py-1 lg:text-left">
          <DetailComponent
            item={{
              label: null,
              value: patient?.name,
            }}
            hasLoading={true}
            articleClass="items-center justify-center"
          />
        </div>
        <figure className=" flex size-full flex-row rounded-xl bg-gradient-to-r from-green-600 via-teal-900 to-emerald-950 p-3 lg:flex lg:p-1">
          <span className="size-full space-y-1 text-center lg:px-8 lg:py-1 lg:text-left">
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
          </span>
          <span className="size-full space-y-1 text-center lg:px-8 lg:py-1 lg:text-left">
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
          </span>
        </figure>
      </figure>
    </div>
  );
};

export default PatientInfoComponent;

const DetailComponent = ({
  item,
  articleClass = null,
  valueClass = null,
  hasLoading = false,
}) => {
  return (
    <article
      key={item.label}
      className={`flex w-full flex-col space-y-1 text-center md:flex-row md:space-x-4 md:space-y-0 md:text-left ${articleClass}`}
    >
      {item.label && (
        <p className="w-full truncate border-t text-left text-sm sm:text-sm md:w-auto md:shrink-0 md:border-none lg:text-base">
          {item.label}:
        </p>
      )}
      <p
        className={`flex w-full items-center truncate text-sm sm:text-sm md:w-auto lg:text-base ${valueClass}`}
      >
        {!item.value ? (
          hasLoading ? (
            <LoaderGeneric width={20} height={20} />
          ) : (
            item.value
          )
        ) : (
          item.value
        )}
      </p>
    </article>
  );
};
