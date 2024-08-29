import classNames from "classnames";

import { LoaderGeneric } from "./componentGeneric/LoadingGenericComponent";

export const CustomGenericButton = ({
  isLoading = false,
  onClick,
  buttonText = "",
  loadingClassColor = "zinc",
  normalClassColor = "blue",
  baseClassStyle = "text-lg font-medium text-white",
  loadingControl = { height: 50, width: 50, text: "" },
  variant = "default",
}) => {
  const variantClasses = {
    default: "bg-blue-500 text-white",
    primary: "bg-green-500 text-white",
    secondary: "bg-gray-500 text-black",
    danger: "bg-red-500 text-white",
  };

  const baseClasses = `rounded-md px-3 py-1.5 ${baseClassStyle} focus:outline-none`;
  const loadingClasses = `cursor-not-allowed bg-${loadingClassColor}-700 hover:bg-${loadingClassColor}-800 focus:ring-${loadingClassColor}-300 dark:focus:ring-${loadingClassColor}-900`;
  const normalClasses = `bg-${normalClassColor}-700 hover:bg-${normalClassColor}-800 focus:ring-${normalClassColor}-300 dark:focus:ring-${normalClassColor}-900`;

  const buttonClasses = classNames(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    isLoading ? loadingClasses : normalClasses
  );
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "100%" }}
    >
      <button
        type="button"
        disabled={isLoading}
        className={buttonClasses}
        onClick={onClick}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {isLoading ? (
          <LoaderGeneric
            height={loadingControl.height}
            width={loadingControl.width}
            text={loadingControl.text}
          />
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};
