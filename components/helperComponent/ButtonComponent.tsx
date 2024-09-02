import classNames from "classnames";

import { Button } from "../ui/button";

import {
  LoaderGeneric,
  LoaderRelativity,
} from "./componentGeneric/LoadingGenericComponent";

export const CustomGenericButton = ({
  isLoading = false,
  onClick,
  buttonText = "",
  normalClassColor = "blue",
  baseClassStyle = "text-lg font-medium text-white",
  loadingControl = { height: 50, width: 50, text: "", brightness: "50%" },
  variant = "default",
}) => {
  const variantClasses = {
    default: "bg-blue-500 text-white",
    primary: "bg-green-500 text-white",
    secondary: "bg-gray-500 text-black",
    danger: "bg-red-500 text-white",
  };

  const baseClasses = `rounded-md px-3 py-1.5 ${baseClassStyle} focus:outline-none`;
  const loadingClasses = `cursor-not-allowed bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:focus:ring-gray-900`;
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
          <LoaderRelativity
            height={loadingControl.height}
            width={loadingControl.width}
            text={loadingControl.text}
            brightness={loadingControl.brightness}
          />
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};

export const CustomShadButton = ({
  onClick,
  buttonText,
  isLoading,
  className = "shad-primary-btn",
  loadingControl = { height: 50, width: 50, text: "", brightness: "50%" },
}) => {
  const colorClasses = isLoading && "cursor-not-allowed bg-gray-500";
  return (
    <Button
      type="button"
      disabled={isLoading}
      onClick={onClick}
      className={`w-full px-4 py-2 ${colorClasses} ${className}`}
    >
      {Object.entries(loadingControl || {}).length !== 0 && isLoading ? (
        <LoaderGeneric
          height={loadingControl.height}
          width={loadingControl.width}
          text={loadingControl.text}
          brightness={loadingControl.brightness}
          classNameContainer="items-center justify-center"
          classNameText="text-sm font-thin"
        />
      ) : (
        buttonText
      )}
    </Button>
  );
};
