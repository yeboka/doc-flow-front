"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@radix-ui/react-dialog";
import { DocumentViewer } from "react-documents";

const requestData = {
  id: 1,
  user: {
    name: "Username",
    avatar: "/path-to-avatar.png",
  },
  date: "21.01.2025",
  documentTitle: "Название файла",
  documentDescription:
    "A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.",
  status: "pending", // Example statuses: "pending", "approved", "rejected"
  documentLink: "/path-to-document.pdf",
};

const RequestPage = () => {
  const [request, setRequest] = useState(requestData);

  const handleApproveRequest = () => {
    // Call your API to approve the request
    console.log("Request approved");
    setRequest((prev) => ({ ...prev, status: "approved" }));
  };

  const handleDeclineRequest = () => {
    // Call your API to decline the request
    console.log("Request declined");
    setRequest((prev) => ({ ...prev, status: "rejected" }));
  };

  return (
    <div className="w-full flex flex-col gap-y-5 p-5">
      {/* USER INFO */}
      <div className="flex flex-col  justify-between gap-4 ">
        <div
          className={"rounded-full border-1 flex items-center justify-center w-fit h-8 p-2 cursor-pointer hover:border-[#76557A] hover:bg-[#76557A]/20 "}
          onClick={() => {
            if (window !== undefined) {
              history.back()
            }
          }
          }>
          <ArrowLeft className={"h-5 w-5"}/> Назад
        </div>
        <div className="flex flex-col gap-2 ">
          <h4 className="text-xl font-bold">{request.documentTitle}</h4>
          <p className="text-sm text-gray-700">{request.documentDescription}</p>
        </div>
      </div>

      {/* DOCUMENT INFO */}
      <div className="border p-6 rounded-xl shadow bg-white space-y-4">
        <div className={"w-full h-[400px] md:h-[500px] lg:h-[600px] bg-center bg-contain bg-no-repeat overflow-hidden"}>
          <DocumentViewer
            queryParams={"hl=N1"}
            url={"https://documents-diploma.s3.eu-north-1.amazonaws.com/d5ebd22b-30d5-4d64-ad08-5c21d22065f2-%C3%90%C2%9D%C3%90%C2%B0%C3%91%C2%81%C3%91%C2%8B%C3%91%C2%80%C3%90%C2%BE%C3%90%C2%B2%20%C3%90%C2%98%C3%90%C2%BB%C3%91%C2%8C%C3%90%C2%B4%C3%90%C2%B0%C3%91%C2%80%20front-end%20%C3%91%C2%80%C3%90%C2%B5%C3%90%C2%B7%C3%91%C2%8E%C3%90%C2%BC%C3%90%C2%B5.pdf"}
            viewer={"url"}
            className={"w-full h-auto -mr-3 "}
          >
          </DocumentViewer>
        </div>
        <a href={request.documentLink} target="_blank" className="text-[#685DFF] underline">
          Скачать документ
        </a>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex w-full justify-between gap-4 mt-6">
        {/* Decline Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-[#FFB8B8] text-[#FF5959]" onClick={handleDeclineRequest}>
              Удалить
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Удаление документа</DialogTitle>
            <DialogDescription>Вы уверены, что хотите удлаить документ?</DialogDescription>
            <div className="flex gap-4">
              <DialogClose asChild>
                <Button className="w-full" onClick={handleDeclineRequest}>Да, удалить</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="ghost" className="w-full">Отменить</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        {/* Accept Button */}
        <Button variant="default" className="bg-[#685DFF] text-white" onClick={handleApproveRequest}>
          Отправить на подпись
        </Button>
      </div>
    </div>
  );
};

export default RequestPage;
