import { text } from "stream/consumers";

import Image from "next/image";

export const LoaderGeneric = ({
  src = "/assets/icons/loader.svg",
  width = 40,
  height = 40,
  text = "Loading...",
  brightness = "0%",
  classNameContainer = "",
  classNameText = "text-sm font-thin",
}) => {
  return (
    <div className={`relative flex ${classNameContainer} gap-2`}>
      <div
        style={{ filter: `brightness(${brightness})` }}
        className="animate-spin"
      >
        <Image
          src={src}
          alt={"loader"}
          width={width}
          height={height}
          className="rounded-full"
        />
      </div>
      {text !== "" && <span className={classNameText}>{text}</span>}
    </div>
  );
};

export const LoaderRelativity = ({
  src = "/assets/icons/loader.svg",
  width = 40,
  height = 40,
  brightness = "50%",
  text = "Loading...",
}) => {
  return (
    <div className="relative flex items-center justify-center gap-1">
      <div
        style={{ filter: `brightness(${brightness})` }}
        className="animate-spin"
      >
        <Image
          src={src}
          alt={"loader"}
          width={width}
          height={height}
          className="rounded-full"
        />
      </div>
      {text !== "" && <span className="text-sm font-thin">{text}</span>}
    </div>
  );
};
