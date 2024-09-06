import style from "styled-jsx/style";

import { LoaderGeneric } from "@/components/helperComponent/componentGeneric/LoadingGenericComponent";

export const DetailComponent = ({
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
      key={item?.label}
      className={`flex w-full flex-col space-y-1 text-ellipsis md:flex-row md:space-x-4 md:space-y-0 ${articleClass}`}
    >
      {item?.label && (
        <p className="truncate border-t text-sm sm:text-sm md:shrink-0 md:border-none">
          {item?.label}:
        </p>
      )}
      <p
        className={`flex w-full items-center truncate text-sm sm:text-sm md:w-auto ${valueClass}`}
      >
        {!item?.value ? (
          hasLoading ? (
            <LoaderGeneric
              brightness="100%"
              width={loadingControl.width}
              height={loadingControl.height}
            />
          ) : (
            item?.value
          )
        ) : (
          item?.value
        )}
      </p>
    </article>
  );
};

export const DetailComponentControllable = ({
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
      key={item?.label}
      className={`flex w-full flex-col space-y-1 text-ellipsis md:flex-row md:space-x-4 md:space-y-0 ${articleClass}`}
    >
      {item?.label && (
        <p className="truncate border-t text-sm sm:text-sm md:shrink-0 md:border-none">
          {item?.label}:
        </p>
      )}
      <p
        className={`flex w-full items-center truncate text-sm sm:text-sm md:w-auto ${valueClass}`}
      >
        {!item?.value ? (
          hasLoading ? (
            <LoaderGeneric
              brightness="100%"
              width={loadingControl.width}
              height={loadingControl.height}
            />
          ) : (
            item?.value
          )
        ) : (
          item?.value
        )}
      </p>
    </article>
  );
};
