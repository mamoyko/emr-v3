import Image from "next/image";

export const LoaderGeneric = ({
  src = "/assets/icons/loader.svg",
  width = 40,
  height = 40,
  className = "",
  text = "Loading...",
}) => {
  return (
    <div
      style={{ height: "100%" }}
      className={`flex-col items-center justify-center text-center ${className}`}
    >
      <div className="flex items-center justify-center space-x-2">
        <Image
          src={src}
          alt={"loader"}
          width={width}
          height={height}
          className="animate-spin"
        />
        {text !== "" && <span>{text}</span>}
      </div>
    </div>
  );
};
