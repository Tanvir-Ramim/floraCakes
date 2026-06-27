"use client";

import { IImage } from "@/services/product.service";
import { buildCloudinaryUrl } from "@/utils/cloudinary";

interface MagnifierProps {
  image: IImage;
  position: { x: number; y: number };
  zoomLevel?: number;
}

const Magnifier: React.FC<MagnifierProps> = ({
  image,
  position,
  zoomLevel = 2,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${buildCloudinaryUrl(
          image.public_id,
          "q_auto,f_auto,w_600,h_600,c_fill"
        )})`,
        backgroundPosition: `${position.x * 100}% ${position.y * 100}%`,
        backgroundSize: `${zoomLevel * 100}%`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default Magnifier;
