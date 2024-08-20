import Image from "next/image";
import React from "react";

export const ImageComponent = ({ src, alt, style, className }) => {
  return (
    <div style={style} className={className}>
      <Image src={src} alt={alt} className="size-full object-cover" />
    </div>
  );
};
