"use client";
import { text } from "stream/consumers";

import { format, parseISO, isValid } from "date-fns";

import { CustomGenericButton } from "@/components/helperComponent/ButtonComponent";

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
    <div className="flex w-full flex-col items-center justify-center md:flex-row">
      <div className="flex h-[180px] w-[320px] items-start overflow-y-auto py-[6px] pl-2">
        <div className="flex size-full items-center justify-center rounded-lg bg-white text-black">
          {!patient.name ? (
            <LoaderGeneric width={20} height={20} text="" />
          ) : (
            "Image box"
          )}
        </div>
      </div>
      <figure className="m-2 flex size-full flex-col rounded-lg bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900">
        <div className="flex size-full flex-row items-center justify-between space-y-1 border-b p-1 pl-9">
          <DetailComponent
            item={{
              label: null,
              value: patient?.name,
            }}
            hasLoading={true}
            loadingControl={{
              height: 10,
              width: 20,
              text: "",
            }}
            articleClass="items-center justify-start font-semibold"
          />
          <CustomGenericButton
            onClick={() => console.log("asakjskahsas")}
            isLoading={!patient.name}
            baseClassStyle="text-xs"
            variant=""
            loadingControl={{
              height: 10,
              width: 20,
              text: "",
            }}
            buttonText="Edit"
          />
        </div>
        {/* </div> */}
        <figure className="flex size-full flex-row rounded-lg bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 p-3 lg:flex lg:p-1">
          <span className="size-full space-y-1 text-center lg:px-8 lg:py-1 lg:text-left">
            {[
              { label: "Address", value: patient?.address || "" },
              { label: "Contact no.", value: patient?.phone || "" },
              { label: "Email", value: patient?.email || "" },
              { label: "Gender", value: patient?.gender || "" },
            ].map((item, index) => (
              <DetailComponent
                key={index}
                item={item}
                articleClass={"w-full flex-col md:flex-row"}
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
                articleClass={"w-full flex-col md:flex-row"}
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
  loadingControl = {
    height: 18,
    width: 20,
    text: "",
  },
}) => {
  return (
    <article
      key={item.label}
      className={`flex w-full flex-col space-y-1 text-ellipsis md:flex-row md:space-x-4 md:space-y-0 ${articleClass}`}
    >
      {item.label && (
        <p className="w-full truncate border-t text-sm sm:text-sm md:shrink-0 md:border-none">
          {item.label}:
        </p>
      )}
      <p
        className={`flex w-full items-center truncate text-sm sm:text-sm md:w-auto lg:text-base ${valueClass}`}
      >
        {!item.value ? (
          hasLoading ? (
            <LoaderGeneric
              width={loadingControl.width}
              height={loadingControl.height}
            />
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
