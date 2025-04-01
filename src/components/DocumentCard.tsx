import React from 'react';
import Image from "next/image";

interface DocumentCardProps {
  preview?: string,
  title: string,
  subtitle: string
}

const DocumentCard: React.FC<DocumentCardProps> = ({preview, subtitle, title}) => {
  return (
    <div className={"flex flex-col items-center w-[285px] rounded-[12px] overflow-clip shadow"}>
      <div
        className={"w-full h-[260px] bg-center bg-contain bg-no-repeat"}
        style={{
          "backgroundImage": `url("${preview ?? "imgs/card_thumbnail.png"}")`
        }}
      >
      </div>
      <div className={"flex w-full items-center gap-3 p-2 bg-[#FEF7FF]"}>
        <div className={"flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-[#FFCDD4]"}>
          <Image src={"icons/document_icon.svg"} alt={"options"} width={24} height={24}/>
        </div>
        <div className={"flex flex-col flex-1 cursor-pointer"}>
          <h3 className={"text-lg font-medium leading-6 tracking-tight"}>{title}</h3>
          <p className={"text-sm font-normal leading-5 tracking-tight"}>{subtitle}</p>
        </div>
        <Image src={"icons/options_icon.svg"} alt={"options"} width={24} height={24}/>
      </div>
    </div>
  );
};

export default DocumentCard;