import { LoaderGeneric } from "./componentGeneric/LoadingGenericComponent";

export const SkeletonGeneric = ({ componentCount = 3 }) => {
  return (
    <div
      role="status"
      style={{ border: "1px solid black" }}
      className="flex size-full grow animate-pulse items-center justify-center"
    >
      <div className="bg-gray-200 p-2 dark:bg-gray-700">
        <LoaderGeneric />
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
