"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Для получения параметров маршрута
import { useAppSelector } from "@/lib/hooks"; // Используем Redux
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DocumentViewer } from "react-documents";
import API from "@/lib/axios";
import DeleteDocumentDialog from "@/components/dialogs/DeleteDocumentDialog";

const RequestPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: userProfile } = useAppSelector((state) => state.profile); // Получаем `userId` из Redux
  const [request, setRequest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        if (userProfile) {
          const response = await API.get(`/documents/user/${userProfile.id}/${id}`);
          console.log(response.data)
          setRequest(response.data);
        }
      } catch (err: any) {
        setError("Failed to load request data");
        console.error("Error fetching request data", err);
      }
    };

    console.log(userProfile,"[======]", id)
    if (userProfile && userProfile.id && id) {
      console.log("lala")
      fetchRequestData().finally(() => {
        setLoading(false);
      });
    }
  }, [userProfile, id]);

  const handleApproveRequest = () => {
    // Call your API to approve the request
    console.log("Request approved");
    setRequest((prev: any) => ({ ...prev, status: "approved" }));
  };

  // const handleDeclineRequest = () => {
  //   // Call your API to decline the request
  //   console.log("Request declined");
  //   setRequest((prev) => ({ ...prev, status: "rejected" }));
  // };

  if (loading) {
    return <div>Loading request...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!request) {
    return <div>Request not found</div>;
  }

  return (
    <div className="w-full flex flex-col gap-y-5 p-5">
      {/* USER INFO */}
      <div className="flex flex-col justify-between gap-4">
        <div
          className={
            "rounded-full border-1 flex items-center justify-center w-fit h-8 p-2 cursor-pointer hover:border-[#76557A] hover:bg-[#76557A]/20 "
          }
          onClick={() => {
            if (window !== undefined) {
              history.back();
            }
          }}
        >
          <ArrowLeft className={"h-5 w-5"} /> Назад
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-bold">{request.title}</h4>
          <p className="text-sm text-gray-700">{request.description}</p>
        </div>
      </div>

      {/* DOCUMENT INFO */}
      <div className="border p-6 rounded-xl shadow bg-white space-y-4">
        <div
          className={
            "w-full h-[400px] md:h-[500px] lg:h-[600px] bg-center bg-contain bg-no-repeat overflow-hidden"
          }
        >
          <DocumentViewer
            queryParams={"hl=N1"}
            url={request.file_url}
            viewer={"url"}
            className={"w-full h-auto -mr-3 "}
          ></DocumentViewer>
        </div>
        <a href={request.file_url} target="_blank" className="text-[#685DFF] underline">
          Скачать документ
        </a>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex w-full justify-between gap-4 mt-6">
        {/* Decline Button */}
        <DeleteDocumentDialog
          documentId={id as any} // Пример ID документа
          onSuccess={() => {
            router.back()
            // Функция, которая обновляет список документов, например:
            // Или обновить локальное состояние
          }}
        />

        {/* Accept Button */}
        <Button variant="default" className="bg-[#685DFF] text-white" onClick={handleApproveRequest}>
          Отправить на подпись
        </Button>
      </div>
    </div>
  );
};

export default RequestPage;
