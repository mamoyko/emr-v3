import Image from "next/image";

export const Loading = () => {
  return (
    <div className="flex-center size-full h-screen gap-3 text-white">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={40}
        height={3240}
        className="animate-spin"
      />
      Loading...
    </div>
  );
};

export const CustomLoading = ({
  height,
  toDivide,
}: {
  height: number;
  toDivide: number;
}) => {
  return (
    <div
      className="flex-center size-full h-screen gap-3 text-white"
      style={{ height: height ? `${height / toDivide - 40}px` : "100%" }}
    >
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={40}
        height={3240}
        className="animate-spin"
      />
      Loading...
    </div>
  );
};
