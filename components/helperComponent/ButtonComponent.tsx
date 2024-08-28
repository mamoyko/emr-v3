import classNames from "classnames";

import { LoaderGeneric } from "./componentGeneric/LoadingGenericComponent";

export const CustomGenericButton = ({
  isLoading,
  onClick,
  buttonText = "",
  loadingClassColor = "zinc",
  normalClassColor = "blue",
  baseClassStyle = "text-lg font-medium text-white",
  loadingControl = { height: 50, width: 50, text: "" },
}) => {
  const baseClasses = `rounded-md px-3 py-1.5 ${baseClassStyle} focus:outline-none`;
  const loadingClasses = `cursor-not-allowed bg-${loadingClassColor}-700 hover:bg-${loadingClassColor}-800 focus:ring-${loadingClassColor}-300 dark:focus:ring-${loadingClassColor}-900`;
  const normalClasses = `bg-${normalClassColor}-700 hover:bg-${normalClassColor}-800 focus:ring-${normalClassColor}-300 dark:focus:ring-${normalClassColor}-900`;

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        disabled={isLoading}
        className={classNames(
          baseClasses,
          isLoading ? loadingClasses : normalClasses
        )}
        onClick={onClick}
      >
        {isLoading ? (
          <LoaderGeneric
            height={loadingControl?.height}
            width={loadingControl?.width}
            text={loadingControl?.text}
          />
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};
