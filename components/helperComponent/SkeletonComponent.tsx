import { LoaderRelativity } from "./componentGeneric/LoadingGenericComponent";

export const SkeletonGeneric = ({
  loaderControl = {
    height: 20,
    width: 20,
    brightness: "50%",
  },
  componentCount = 3,
  loderText = "",
  genericClassName = "",
}) => {
  return (
    <div
      role="status"
      className={`flex size-full grow animate-pulse items-center justify-center ${genericClassName}`}
    >
      <div
        className={`flex size-full items-center justify-center bg-gray-200 p-2 dark:bg-gray-700 ${genericClassName}`}
      >
        <LoaderRelativity
          height={loaderControl.height}
          width={loaderControl.width}
          text={loderText}
          brightness={loaderControl.brightness}
        />
      </div>
    </div>
  );
};

export const Sample = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
};
