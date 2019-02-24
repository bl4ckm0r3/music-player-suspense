import React from "react";
import { unstable_createResource as createResource } from "react-cache";

const ImageResource = createResource(
  src =>
    new Promise(resolve => {
      const loader = new window.Image();
      loader.onload = resolve;
      loader.src = src;
    })
);

export const Image = ({ src, alt = "cover", ...rest }) => {
  if (src) {
    ImageResource.read(src);
  }
  return <img src={src} alt={alt} {...rest} />;
};
