import Image from "next/image";
import React from "react";
import cake from "../../../app/(brc)/assets/image/cake.webp";
import "./SectionTitle.css";
interface SectionTitleProps {
  section?: string;
  title: string;
  description: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  section,
  title,
  description,
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center gap-2 overflow-hidden ${section}`}
    >
      <div className="flex items-center justify-center flex-col gap-2">
        <div className=" flex hidden items-center justify-center">
          <span className="text-[#B98F62]">(</span>
          <Image src={cake} alt="cake" width={30} height={30} />
          <span className="text-[#B98F62]">)</span>
        </div>
        <h2 className="text-2xl lg:text-4xl   text-title titleLine">{title}</h2>
      </div>
      <p className="xl:px-40 text-[13px] lg:text-sm  text-subtitle">
        {description}
      </p>
    </div>
  );
};

export default SectionTitle;
