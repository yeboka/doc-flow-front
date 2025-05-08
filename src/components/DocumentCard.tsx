import React from 'react';
import Image from "next/image";
import { DocumentViewer } from "react-documents";
import Link from "next/link"; // Import pdfjs from react-pdf

interface DocumentCardProps {
  id: number;
  title: string;
  fileUrl?: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ id, title, fileUrl }) => {
  const isPdf = fileUrl?.endsWith('.pdf');

  return (
    <div className={"flex flex-col hover:outline-1 hover:outline-[#79747E]/30 items-center w-[285px] rounded-[12px] overflow-clip shadow"}>
      <div className={"w-full h-[260px] bg-center bg-contain bg-no-repeat overflow-hidden"}>
        {isPdf ? (
          <DocumentViewer
            queryParams={"hl=N1"}
            url={fileUrl ? fileUrl : "null"}
            viewer={"url"}
            className={"w-full h-[300px] -mr-3 "}
          >
          </DocumentViewer>
        ) : (
          <div
            className={"w-full h-full"}
            style={{
              "backgroundImage": `url("${fileUrl ?? "imgs/card_thumbnail.png"}")`,
              backgroundSize: "cover",
            }}
          />
        )}
      </div>
      <Link href={`/docs/${id}`} className={"flex w-full items-center gap-3 p-2 bg-[#FEF7FF]"} >
        <div className={"flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-[#FFCDD4]"}>
          <Image src={"icons/document_icon.svg"} alt={"options"} width={24} height={24} />
        </div>
        <div className={"flex flex-col flex-1 cursor-pointer"}>
          <h3 className={"text-lg font-medium leading-6 tracking-tight"}>{title}</h3>
          {/*<p className={"text-sm font-normal leading-5 tracking-tight"}>{subtitle}</p>*/}
        </div>
        {/*<Image src={"icons/options_icon.svg"} alt={"options"} width={24} height={24} />*/}
      </Link>
    </div>
  );
};

export default DocumentCard;
